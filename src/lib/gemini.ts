import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please add it to your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateProductContent(productInput: string) {
  const prompt = `Act as a professional E-commerce Copywriter and Product Designer.
Product Name or Link: ${productInput}

Please provide the following:
1. Compelling Description: Write a high-converting, SEO-optimized product description focusing on benefits, problem-solving, and a strong Call-to-Action (CTA).
2. 3D Mockup Prompt: Provide a detailed 'text-to-image' prompt (for Midjourney or DALL-E) to create a photorealistic 3D mockup of this product. The visual should be minimalist, modern, and consistent with a premium digital store aesthetic.
3. Feature Highlights: List 3-5 bullet points that emphasize why the customer needs this specific item.

Output must be in JSON format.`;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            mockupPrompt: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestedCategory: { type: Type.STRING },
            suggestedPrice: { type: Type.NUMBER }
          },
          required: ["title", "description", "mockupPrompt", "features"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
}
