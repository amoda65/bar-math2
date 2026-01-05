
export enum LearningMode {
  EXPLORE = 'explore',
  REPEATED_ADDITION = 'repeated_addition',
  ARRAY_MODEL = 'array_model',
  NUMBER_LINE = 'number_line',
  AREA_MODEL = 'area_model',
  FINGER_METHOD = 'finger_method',
  PATTERNS = 'patterns',
  QUIZ = 'quiz',
  AI_TUTOR = 'ai_tutor'
}

export const ModeHints: Record<LearningMode, { title: string; message: string }> = {
  [LearningMode.EXPLORE]: {
    title: "خوش اومدی قهرمان!",
    message: "در این بخش می‌تونی تمام ضرب‌های یک عدد رو یک‌جا ببینی و باهاشون آشنا بشی."
  },
  [LearningMode.REPEATED_ADDITION]: {
    title: "جمع تکراری چیه؟",
    message: "ضرب یعنی یک عدد رو چند بار با خودش جمع کنیم. اینجا می‌تونی دسته‌های سیب رو بشماری!"
  },
  [LearningMode.ARRAY_MODEL]: {
    title: "چیدمان ستاره‌ای",
    message: "وقتی اشیاء رو در ردیف و ستون مرتب می‌چینیم، با ضرب کردن تعداد ردیف در ستون، کل اون‌ها رو سریع پیدا می‌کنیم."
  },
  [LearningMode.NUMBER_LINE]: {
    title: "پرش‌های بلند",
    message: "روی محور اعداد مثل یک کانگورو بپر! هر پرش تو رو به جواب بعدی جدول ضرب می‌رسونه."
  },
  [LearningMode.AREA_MODEL]: {
    title: "مستطیل جادویی (تجزیه)",
    message: "یاد بگیر چطور یک ضرب بزرگ رو مرحله به مرحله به دو تا ضرب کوچیک تقسیم کنی تا حل کردنش مثل آب خوردن بشه!"
  },
  [LearningMode.FINGER_METHOD]: {
    title: "جادوی انگشتان",
    message: "دست‌های تو همیشه همراهتن! یاد بگیر چطوری با انگشتات ضرب‌های سخت رو در یک ثانیه جواب بدی."
  },
  [LearningMode.PATTERNS]: {
    title: "کارآگاه اعداد",
    message: "هر عدد یک راز مخفی داره. الگوها رو کشف کن تا دیگه نیازی به حفظ کردن نداشته باشی."
  },
  // Fixed: Removed duplicate QUIZ entry that was causing the duplicate property error
  [LearningMode.QUIZ]: {
    title: "میدان مسابقه",
    message: "وقتشه دانشت رو به چالش بکشی! سرعت عمل داشته باش تا بیشترین ستاره رو بگیری."
  },
  [LearningMode.AI_TUTOR]: {
    title: "معلم هوشمند",
    message: "هر سوالی داری از روبو بپرس. اون با مثال‌های واقعی برات توضیح میده که چرا ضرب اینطوری میشه."
  }
};

export interface Question {
  id: number;
  a: number;
  b: number;
  answer: number;
  options: number[];
}

export interface Progress {
  tableNumber: number;
  score: number;
  completed: boolean;
}
