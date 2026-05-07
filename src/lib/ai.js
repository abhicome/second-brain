export async function askAI(message, notes = '') {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return 'Missing OpenAI API key. Add VITE_OPENAI_API_KEY to your .env file.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI second brain assistant. Use the user notes as memory context.'
          },
          {
            role: 'user',
            content: `Notes Context:\n${notes}\n\nQuestion:\n${message}`
          }
        ]
      })
    });

    const data = await response.json();

    return data.choices?.[0]?.message?.content || 'No response generated.';
  } catch (err) {
    return 'AI request failed: ' + err.message;
  }
}
