
import { GoogleGenAI } from "@google/genai";

// Fixed: Initializing GoogleGenAI using the recommended pattern with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAITeacherAdvice = async (a: number, b: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `توضیح بده چرا ${a} ضربدر ${b} میشه ${a * b}. از مثال‌های کودکانه و جذاب مثل دسته‌های سیب یا پریدن روی اعداد استفاده کن. مخاطب یک بچه ۹ ساله کلاس سومیه. خیلی صمیمی و مهربون حرف بزن. پاسخ رو کوتاه و در حد ۲-۳ جمله بنویس.`,
      config: {
        systemInstruction: "You are a kind, funny, and encouraging Persian math teacher for 3rd graders. Use simple language and emojis."
      }
    });
    // Fixed: response.text is a property, accessing it directly
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "اوه! ارتباطم با کهکشان قطع شد. ولی یادت باشه: " + a + " دسته " + b + " تایی میشه " + (a * b) + "!";
  }
};
