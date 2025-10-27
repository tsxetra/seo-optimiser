
import { GoogleGenAI } from "@google/genai";
import { Tone } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const beautifyDescription = async (
  description: string,
  tone: Tone,
  keywords: string
): Promise<string> => {
  const keywordsInstruction = keywords
    ? `Crucially, you must naturally weave in the following SEO keywords: ${keywords}.`
    : "Optimize for general e-commerce search terms related to the product.";

  const prompt = `
    You are a world-class e-commerce copywriter with a knack for turning bland product descriptions into compelling, high-converting sales copy for platforms like Shopify and Etsy.
    Your task is to rewrite the following product description.

    **Instructions:**
    1.  **Tone of Voice:** Adopt a ${tone} tone.
    2.  **Focus on Benefits:** Don't just list features; explain how they benefit the customer.
    3.  **Engaging & Punchy:** Use strong verbs, sensory words, and a persuasive structure. Start with a strong hook.
    4.  **Readability:** Use short paragraphs, bullet points (with emojis if appropriate for the tone), and bold text to break up the text and make it easy to scan.
    5.  **SEO Optimization:** ${keywordsInstruction}
    6.  **Maintain Accuracy:** Ensure all original product details are preserved. Do not invent new features.

    **Original Product Description to Rewrite:**
    ---
    ${description}
    ---

    **Your Rewritten, Beautified Description:**
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API call failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
