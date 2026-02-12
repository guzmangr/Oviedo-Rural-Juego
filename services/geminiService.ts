
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMoreQuestions = async (existingParishes: string[]): Promise<Question[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Genera 5 preguntas de trivia en español sobre las parroquias rurales de Oviedo (Asturias). 
      Usa como referencia estas parroquias: ${existingParishes.join(", ")}.
      Las preguntas deben ser interesantes, educativas y variadas (geografía, monumentos, historia).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
              parishId: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["id", "text", "options", "correctAnswer", "parishId", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return [];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};
