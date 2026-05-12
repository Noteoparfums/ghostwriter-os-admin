export const generateAIResponse = async (prompt, documentContext = '') => {
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY;
  const apiUrl = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434/api/generate';

  // Build a context-aware prompt when document text is present
  const fullPrompt = documentContext.trim()
    ? `You are GhostwriterOS, an elite AI writing assistant. The user is currently working on the following document:\n\n---\n${documentContext}\n---\n\nUser's request: ${prompt}\n\nProvide a helpful, well-written response. If the user asks you to write or expand content, produce polished prose ready to be inserted directly into their document.`
    : `You are GhostwriterOS, an elite AI writing assistant.\n\nUser's request: ${prompt}\n\nProvide a helpful, well-written response.`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: fullPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response; // Standard Ollama response format
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
};
