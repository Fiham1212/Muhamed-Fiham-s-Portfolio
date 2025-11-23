import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// We assume this variable is pre-configured, valid, and accessible.
// In a Vite environment, we use import.meta.env for client-side keys if configured, 
// but sticking to process.env pattern for compatibility with the specific prompt requirements.
const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
}

export const chatWithPortfolio = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  // Gracefully handle missing API key (Demo Mode)
  if (!ai || !apiKey) {
    console.warn("API Key missing. Chat functionality disabled.");
    return "I am currently in 'Demo Mode'. To enable live AI responses, please configure the API Key in your deployment settings.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history, 
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later or email Muhamed directly.";
  }
};