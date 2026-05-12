export const generateAIResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY;
  // Defaulting to typical Ollama generation API, but this could be a chat completion endpoint
  // if it's an OpenAI compatible API based on the format.
  // Wait, looking at the key format: "fb3fb3b8cf0443a592eabb0704854c0c.g-eMJkPU7yaUZY0jg23_P3xT"
  // It could be a custom API.
  const apiUrl = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434/api/generate';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3', // Typical default, can be parameterized
        prompt: prompt,
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
