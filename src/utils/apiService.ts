
// API service for Gemini and Groq

interface AIResponse {
  text: string;
  error?: string;
}

// Default models - updated to current working versions
export const DEFAULT_MODELS = {
  gemini: "gemini-1.5-flash",
  groq: "llama-3.3-70b-versatile"
};

// Call Gemini API
export const callGeminiAPI = async (
  prompt: string, 
  apiKey: string, 
  model: string = DEFAULT_MODELS.gemini
): Promise<AIResponse> => {
  try {
    console.log(`Calling Gemini API with model: ${model}`);
    
    // Use v1beta endpoint for Gemini 1.5 models
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

    const tryModels = Array.from(new Set([
      model,
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768",
    ]));

    let lastErrorMsg: string | undefined;

    for (const m of tryModels) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: m,
          messages: [
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.choices?.[0]?.message?.content || "";
        if (m !== model) console.warn(`Groq model fallback used: ${m}`);
        return { text: responseText };
      }

      let errorData: any = {};
      try { errorData = await response.json(); } catch {}
      const code = errorData?.error?.code;
      const message = errorData?.error?.message || `HTTP ${response.status}`;
      console.error(`Groq API error for model ${m}:`, message);
      lastErrorMsg = message;

      const isModelIssue = code === "model_decommissioned" || /decommissioned|not found|unsupported/i.test(message || "");
      if (!isModelIssue) {
        return { text: "", error: `Error: ${message || "Failed to get response from Groq"}` };
      }
      // otherwise continue to next model
    }

    return { text: "", error: `Error: ${lastErrorMsg || "All Groq models failed"}` };
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return { 
      text: "", 
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}` 
    };
  }
};
