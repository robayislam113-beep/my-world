
import { GoogleGenAI, Type } from "@google/genai";
import { Comment } from "../types";

/**
 * My World uses Gemini AI to provide a supportive, non-toxic interaction layer.
 * Note: The API_KEY is expected to be provided via the environment.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const names = ["Alice", "Leo", "Sarah", "James", "Elena", "Marcus", "Sophie", "David", "Luna", "Aria", "Felix"];
const handles = ["dreamer", "starlight", "gentle_soul", "echoes", "vibe_check", "serenity", "kind_heart", "growth_mindset", "pure_intent"];

/**
 * Generates empathetic comments based on the user's reflection.
 * @param postContent The user's post text.
 */
export const generateSupportiveComments = async (postContent: string): Promise<Comment[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this private reflection: "${postContent}", generate 4 short, highly supportive, and empathetic social media comments. Each comment should sound like it's from a caring friend or an inspired follower. Maintain a peaceful and encouraging tone.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING, description: "The content of the supportive comment" },
            },
            required: ["content"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    const data = JSON.parse(jsonStr);

    return data.map((item: { content: string }, index: number) => {
      const name = names[Math.floor(Math.random() * names.length)];
      const handle = handles[Math.floor(Math.random() * handles.length)] + Math.floor(Math.random() * 99);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        authorName: name,
        authorHandle: `@${handle}`,
        authorAvatar: `https://picsum.photos/seed/${handle}/100/100`,
        content: item.content,
        timestamp: Date.now() - (index * 60000),
        likes: Math.floor(Math.random() * 500) + 100
      };
    });
  } catch (error) {
    console.error("Gemini AI integration error:", error);
    // Return empty array to fail gracefully without breaking the UI
    return [];
  }
};
