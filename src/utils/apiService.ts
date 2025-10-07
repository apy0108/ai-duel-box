
// API service for Gemini and Groq

interface AIResponse {
  text: string;
  error?: string;
}

// Default models - updated to current working versions
export const DEFAULT_MODELS = {
  gemini: "gemini-1.5-flash",
  groq: "llama-3.1-70b-versatile"
};

// Call Gemini API
export const callGeminiAPI = async (
  prompt: string, 
  apiKey: string, 
  model: string = DEFAULT_MODELS.gemini
): Promise<AIResponse> => {
  try {
    console.log(`Calling Gemini API with model: ${model}`);
    
    // API URL depends on the model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return { 
        text: "", 
        error: `Error: ${errorData.error?.message || "Failed to get response from Gemini"}` 
      };
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "", 
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}` 
    };
  }
};

// Call Groq API
export const callGroqAPI = async (
  prompt: string, 
  apiKey: string,
  model: string = DEFAULT_MODELS.groq
): Promise<AIResponse> => {
  try {
    console.log(`Calling Groq API with model: ${model}`);
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      return { 
        text: "", 
        error: `Error: ${errorData.error?.message || "Failed to get response from Groq"}` 
      };
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "";
    return { text: responseText };

  } catch (error) {
    console.error("Error calling Groq API:", error);
    return { 
      text: "", 
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}` 
    };
  }
};
