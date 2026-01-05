
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // استفاده از متغیر محلی برای جلوگیری از خطای مستقیم در صورت عدم تعریف process
    const env = (typeof process !== 'undefined' && process.env) ? process.env : {};
    // @ts-ignore
    return env.API_KEY || '';
  } catch (e) {
    console.warn("API Key not found in environment.");
    return '';
  }
};

export const getAITeacherAdvice = async (a: number, b: number) => {
  const apiKey = getApiKey();
  
  // اگر کلید موجود نباشد، یک پاسخ پیش‌فرض هوشمندانه برمی‌گردانیم تا برنامه کراش نکند
  if (!apiKey) {
    return `عدد ${a} رو اگه ${b} بار با خودش جمع کنی میشه ${a * b}. مثل اینه که ${a} تا بسته ${b} تایی مداد رنگی داشته باشی! 🎨`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `توضیح بده چرا ${a} ضربدر ${b} میشه ${a * b}. از مثال‌های کودکانه و جذاب استفاده کن. مخاطب یک بچه ۹ ساله است. صمیمی و کوتاه پاسخ بده. استفاده از ایموجی فراموش نشه.`,
      config: {
        systemInstruction: "You are a kind and energetic Persian math teacher for children. Your explanations are simple, short, and use real-world analogies like apples, balls, or stars."
      }
    });
    return response.text || `بیا با هم حساب کنیم: ${a} ضربدر ${b} مساوی میشه با ${a * b}! ✨`;
  } catch (error) {
    console.error("AI Error:", error);
    return `فکر کنم ایستگاه فضایی ارتباطش قطع شده! ولی یادت نره که ${a} × ${b} همیشه میشه ${a * b}. 😉`;
  }
};
