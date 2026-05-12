import { supabase } from './supabase';

/**
 * Generate AI response using a cloud-compatible API.
 * Supports OpenAI-compatible endpoints (DeepInfra, Together, OpenRouter, Groq, etc.)
 * Falls back to local Ollama if no cloud URL is configured.
 * Logs all generations to the Supabase `generation_logs` table.
 */
export const generateAIResponse = async (prompt, documentContext = '') => {
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY;
  const apiUrl = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434/api/generate';

  // Detect if the endpoint is OpenAI-compatible (chat/completions) vs Ollama-native (/api/generate)
  const isOpenAICompatible = apiUrl.includes('/chat/completions') || apiUrl.includes('openai') || apiUrl.includes('deepinfra') || apiUrl.includes('together') || apiUrl.includes('openrouter') || apiUrl.includes('groq');

  // Build the context-aware system message
  const systemMessage = documentContext.trim()
    ? `You are GhostwriterOS, an elite AI writing assistant. The user is currently working on the following document:\n\n---\n${documentContext}\n---\n\nProvide helpful, well-written responses. If asked to write or expand content, produce polished prose ready to be inserted directly into their document.`
    : `You are GhostwriterOS, an elite AI writing assistant. Provide helpful, well-written responses. If asked to write or expand content, produce polished, ready-to-use prose.`;

  const startTime = Date.now();
  let responseText = '';

  try {
    let body, parseResponse;

    if (isOpenAICompatible) {
      // ─── OpenAI-compatible format (DeepInfra, Together, OpenRouter, Groq, etc.) ───
      body = JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt },
        ],
        max_tokens: 2048,
        temperature: 0.7,
        stream: false,
      });
      parseResponse = (data) => {
        if (data.choices && data.choices[0]) {
          return data.choices[0].message?.content || data.choices[0].text || '';
        }
        throw new Error('Unexpected response format from AI API');
      };
    } else {
      // ─── Ollama native format ───
      const fullPrompt = `${systemMessage}\n\nUser: ${prompt}`;
      body = JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL || 'llama3',
        prompt: fullPrompt,
        stream: false,
      });
      parseResponse = (data) => {
        return data.response || '';
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body,
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`API Error ${response.status}: ${response.statusText}${errBody ? ` — ${errBody.substring(0, 200)}` : ''}`);
    }

    const data = await response.json();
    responseText = parseResponse(data);

    if (!responseText || responseText.trim() === '') {
      throw new Error('AI returned an empty response. The model may be overloaded.');
    }

    return responseText;
  } catch (error) {
    console.error('Error generating AI response:', error);

    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('ERR_CONNECTION_REFUSED')) {
      throw new Error('Cannot reach the AI server. If you\'re using Ollama locally, make sure it\'s running. For cloud APIs, check your VITE_OLLAMA_API_URL.');
    }

    throw error;
  } finally {
    // ─── Log generation to Supabase (fire-and-forget) ───
    const processingTime = Date.now() - startTime;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        supabase
          .from('generation_logs')
          .insert({
            user_id: session.user.id,
            prompt: prompt.substring(0, 2000),  // Cap at 2000 chars
            output: responseText.substring(0, 5000),  // Cap at 5000 chars
            processing_time_ms: processingTime,
          })
          .then(({ error }) => {
            if (error) console.warn('Failed to log generation:', error.message);
          });
      }
    } catch (logError) {
      // Silently fail — logging shouldn't break the user experience
      console.warn('Generation logging failed:', logError);
    }
  }
};
