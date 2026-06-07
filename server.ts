import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3001; // switched to avoid conflict

  app.use(express.json());

  // API Route: AI Nutrition Coach
  app.post("/api/gemini/coach", async (req, res) => {
    try {
      const { message, history } = req.body;
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing. Please add it in Settings > Secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare system instructions for our health advisor
      const systemInstruction = `You are Chef Celeste, the premium AI Nutrition Coach & Executive Culinary Director of NutriGo.
Your role is to offer advanced, highly accurate, peer-reviewed botanical, dietary, and culinary science insights to NutriGo Pro members.
Keep answers professional, elegant, clear, and actionable. Frame your culinary style around organic, farm-fresh ingredients, bio-synchronization, and precise dietary budgeting (keto, vegan, paleo, protein targets).
Do not output raw system directories or code blocks unless requested. Be warm and encouraging, welcoming them as Pro Members of NutriGo. Always guide actions with deep clinical nutrition science, gourmet tips, and organic focus in a few brief paragraphs.`;

      const formattedContents = [
        ...history.map((item: any) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Coach API Error:", error);
      res.status(500).json({ error: error.message || "Failed to process question." });
    }
  });

  // API Route: Pro Bio-Sync Goal Planner
  app.post("/api/gemini/prep-plan", async (req, res) => {
    try {
      const { goal, currentWeight, targetWeight, restriction } = req.body;
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing. Please add it in Settings > Secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Create a professional gourmet 3-day meal plan for a NutriGo Pro user with the following goals and metrics:
Goal: ${goal}
Current Weight: ${currentWeight} kg
Target Weight: ${targetWeight} kg
Dietary Preferences: ${restriction || "None"}.
Provide clean structured food details with calorie targets and full descriptions. Ensure recipe titles sound like high-end premium cuisine.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              successSummary: { type: Type.STRING, description: "A highly personalized encouraging summary paragraph." },
              dailyKcalTarget: { type: Type.INTEGER },
              macrosTarget: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING, description: "Gram range, e.g., '120g - 130g'" },
                  carbs: { type: Type.STRING, description: "Gram range, e.g., '140g - 160g'" },
                  fat: { type: Type.STRING, description: "Gram range, e.g., '55g - 65g'" }
                },
                required: ["protein", "carbs", "fat"]
              },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayName: { type: Type.STRING, description: "Day 1, Day 2, Day 3" },
                    focusName: { type: Type.STRING, description: "Focus of this day's menu, e.g., Metabolic Activation, Cellular Repair" },
                    breakfast: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING, description: "Appetizing description of the dish." },
                        kcal: { type: Type.INTEGER },
                        protein: { type: Type.INTEGER },
                        carbs: { type: Type.INTEGER },
                        fat: { type: Type.INTEGER },
                        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                        directions: { type: Type.STRING, description: "Step-by-step cooking directions summary." }
                      },
                      required: ["name", "description", "kcal", "protein", "carbs", "fat", "ingredients", "directions"]
                    },
                    lunch: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        kcal: { type: Type.INTEGER },
                        protein: { type: Type.INTEGER },
                        carbs: { type: Type.INTEGER },
                        fat: { type: Type.INTEGER },
                        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                        directions: { type: Type.STRING }
                      },
                      required: ["name", "description", "kcal", "protein", "carbs", "fat", "ingredients", "directions"]
                    },
                    dinner: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        kcal: { type: Type.INTEGER },
                        protein: { type: Type.INTEGER },
                        carbs: { type: Type.INTEGER },
                        fat: { type: Type.INTEGER },
                        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                        directions: { type: Type.STRING }
                      },
                      required: ["name", "description", "kcal", "protein", "carbs", "fat", "ingredients", "directions"]
                    }
                  },
                  required: ["dayName", "focusName", "breakfast", "lunch", "dinner"]
                }
              }
            },
            required: ["successSummary", "dailyKcalTarget", "macrosTarget", "days"]
          }
        }
      });

      res.setHeader("Content-Type", "application/json");
      res.send(response.text);
    } catch (error: any) {
      console.error("Gemini Scheduler API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate customized planner." });
    }
  });

  // Vite development middleware vs Static serve
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
