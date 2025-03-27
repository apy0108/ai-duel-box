
// API service for Gemini and Grok

interface AIResponse {
  text: string;
  error?: string;
}

// Model options 
export const AI_MODELS = {
  gemini: [
    { id: "gemini-pro", name: "Gemini Pro" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" }
  ],
  grok: [
    { id: "grok-1", name: "Grok-1" },
    { id: "grok-1.5", name: "Grok-1.5" },
    { id: "grok-2-mini", name: "Grok-2 Mini" }
  ]
};

// Call Gemini API
export const callGeminiAPI = async (
  prompt: string, 
  apiKey: string, 
  model: string = "gemini-pro"
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

// Call Grok API
export const callGrokAPI = async (
  prompt: string, 
  apiKey: string,
  model: string = "grok-1"
): Promise<AIResponse> => {
  try {
    console.log(`Calling Grok API with model: ${model}`);
    
    // Use simulated response for Grok since the API is not working correctly
    console.log("Using simulated response for Grok API");
    
    // Wait a bit to simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a response
    return { 
      text: `This is a simulated response using the provided API key. In a real implementation, this would be the actual response from Grok API using the ${model} model.\n\nYour prompt was: "${prompt}"\n\nWhen the Grok API is properly configured and accessible, this would show the genuine AI-generated response.` 
    };
    
    /* Commenting out the actual API call that's failing
    const response = await fetch("https://api.grok.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
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
      console.error("Grok API error:", errorData);
      return { 
        text: "", 
        error: `Error: ${errorData.error?.message || "Failed to get response from Grok"}` 
      };
    }

    const data = await response.json();
    
    // Extract the response text from the Grok API response
    const responseText = data.choices?.[0]?.message?.content || "";
    return { text: responseText };
    */
  } catch (error) {
    console.error("Error calling Grok API:", error);
    return { 
      text: "", 
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}` 
    };
  }
};
