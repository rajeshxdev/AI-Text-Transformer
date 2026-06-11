// ============================================================
// geminiApi.js - Handles all communication with the Gemini API
// ============================================================
// Your Gemini API key - get it from https://aistudio.google.com/app/apikey
// New AQ.Ab... format (Authorization key) requires x-goog-api-key header
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// The Gemini model we're using (gemini-2.5-flash is the current stable free-tier model)
const GEMINI_MODEL = "gemini-2.5-flash";

// The base URL for the Gemini API endpoint (no key in URL - we use header instead)
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// -------------------------------------------------------
// Main function: sendToGemini
// Takes a prompt (instruction + text) and returns AI response
// -------------------------------------------------------
export async function sendToGemini(prompt) {
  // Build the request body in the format Gemini expects
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt, // The full prompt with instruction and user text
          },
        ],
      },
    ],
    // Optional: Control how creative/random the response is (0 = focused, 1 = creative)
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  };

  // Make the API call using fetch (built into modern browsers)
  // IMPORTANT: Use x-goog-api-key header instead of ?key= URL parameter
  // This is required for the new AQ.Ab... Authorization API keys
  const response = await fetch(GEMINI_API_URL, {
    method: "POST", // We're sending data, so use POST
    headers: {
      "Content-Type": "application/json", // Tell the server we're sending JSON
      "x-goog-api-key": GEMINI_API_KEY,   // NEW: Auth key requires this header
    },
    body: JSON.stringify(requestBody), // Convert JS object to JSON string
  });

  // Check if the API call was successful (status 200-299)
  if (!response.ok) {
    const errorData = await response.json();
    // Extract a human-friendly error message
    const errorMessage =
      errorData?.error?.message || `API Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  // Parse the JSON response from Gemini
  const data = await response.json();

  // Navigate the nested response structure to get the actual text
  // Gemini wraps the response in: candidates → content → parts → text
  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!resultText) {
    throw new Error("No response received from Gemini. Please try again.");
  }

  return resultText;
}

// -------------------------------------------------------
// Helper functions: Build prompts for each transformation type
// Each function returns a complete prompt string for Gemini
// -------------------------------------------------------

export function buildSummarizePrompt(text) {
  return `Please summarize the following text in a clear and concise way. 
Keep the key points and main ideas. 
Return only the summary, no extra commentary.

Text to summarize:
${text}`;
}

export function buildGrammarPrompt(text) {
  return `Please fix all grammar, spelling, and punctuation errors in the following text.
Keep the original meaning and style intact.
Return only the corrected text, no explanations.

Text to fix:
${text}`;
}

export function buildProfessionalPrompt(text) {
  return `Please rewrite the following text in a formal, professional tone.
Make it suitable for a business email or report.
Return only the rewritten text, no explanations.

Text to rewrite:
${text}`;
}

export function buildCasualPrompt(text) {
  return `Please rewrite the following text in a friendly, casual, and conversational tone.
Make it feel natural and easy to read, like talking to a friend.
Return only the rewritten text, no explanations.

Text to rewrite:
${text}`;
}