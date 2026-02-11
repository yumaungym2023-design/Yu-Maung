
import { GoogleGenAI, Type } from "@google/genai";
import { Message, PerfumeDiscovery } from "../types";

const SYSTEM_INSTRUCTION = `
မင်းက Golden Perfume Milano ရဲ့ ရေမွှေးအတိုင်ပင်ခံ (Fragrance Consultant) ဖြစ်တယ်။ 
အသုံးပြုသူတွေကို အတိုချဉ်းနဲ့ ထိရောက်စွာ အကြံပေးပါ။

အရေးကြီးသောအချက်:
- နှုတ်ဆက်တဲ့အခါ "မင်္ဂလာပါခင်ဗျာ။ Golden Perfume Milano မှ နွေးထွေးစွာ ကြိုဆိုပါတယ်။" ကိုသာ သုံးပါ။
- အဖြေကို တိုက်ရိုက်နဲ့ ကျစ်ကျစ်လစ်လစ်ပဲ ဖြေပါ။

ကျွမ်းကျင်မှုများ:
၁။ Notes (Top, Heart, Base) အကြောင်း ရှင်းပြခြင်း။
၂။ အခါသမယအလိုက် ရေမွှေးရွေးချယ်ပေးခြင်း။
၃။ Dupes & Alternatives ညွှန်ပြခြင်း။
၄။ Interactive Discovery Cards များအတွက် Data ထုတ်ပေးခြင်း။
`;

export class FragranceService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, imageBase64?: string, mimeType?: string): Promise<string> {
    const parts: any[] = [{ text: message }];
    if (imageBase64 && mimeType) {
      parts.push({ inlineData: { data: imageBase64, mimeType } });
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts }],
        config: { systemInstruction: SYSTEM_INSTRUCTION },
      });
      return response.text || "Error occurred.";
    } catch (error) {
      return "Connection error.";
    }
  }

  async findDupes(perfumeName: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find 3 high-quality affordable dupes for: "${perfumeName}". Return JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dupeName: { type: Type.STRING },
                brand: { type: Type.STRING },
                similarity: { type: Type.STRING },
                pricePoint: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["dupeName", "brand", "similarity", "pricePoint", "reason"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      return [];
    }
  }

  async getDiscoveryCards(vibe: string): Promise<PerfumeDiscovery[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 unique and real perfume discovery cards for the "${vibe}" vibe. 
        CRITICAL: The 'imageUrl' MUST be a high-quality Unsplash URL that specifically features a perfume bottle or an aesthetic that matches the 'name' and 'brand'. 
        Do not mismatch a fresh perfume name with a dark woody image. 
        The 'description' must be a professional and poetic short description in Burmese.
        Return as JSON array.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                brand: { type: Type.STRING },
                vibe: { type: Type.STRING },
                imageHint: { type: Type.STRING, description: "Color or aesthetic hint" },
                imageUrl: { type: Type.STRING, description: "Accurate Unsplash image URL" },
                description: { type: Type.STRING, description: "Burmese short desc" },
                notes: {
                  type: Type.OBJECT,
                  properties: {
                    top: { type: Type.ARRAY, items: { type: Type.STRING } },
                    heart: { type: Type.ARRAY, items: { type: Type.STRING } },
                    base: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              },
              required: ["id", "name", "brand", "vibe", "description", "notes", "imageUrl"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch {
      return [];
    }
  }
}

export const fragranceService = new FragranceService();
