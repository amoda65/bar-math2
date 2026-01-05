
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Unlock, Sparkles } from 'lucide-react';

interface Props {
  table: number;
}

const tableSecrets: Record<number, { title: string, hint: string, rules: string[] }> = {
  1: { title: "آینه جادویی", hint: "عدد ۱ مثل آینه عمل می‌کنه!", rules: ["هر عددی در ۱ ضرب بشه، خودش باقی می‌مونه.", "مثال: ۱ × ۵ = ۵"] },
  2: { title: "دوستان دوقلو", hint: "ضرب در ۲ یعنی عدد رو دو برابر کن!", rules: ["جواب همیشه یک عدد زوج هست (آخرش ۰، ۲، ۴، ۶، یا ۸ داره).", "مثل اینه که عدد رو با خودش جمع کنی."] },
  3: { title: "الگوی زیگزاگی", hint: "مجموع رقم‌های جواب رو چک کن!", rules: ["اگه رقم‌های جواب رو با هم جمع کنی، همیشه یکی از عددهای ۳، ۶ یا ۹ میشه.", "مثال: ۳ × ۴ = ۱۲ -> ۱ + ۲ = ۳"] },
  4: { title: "دوبار دوبرابر", hint: "یه ترفند سریع برای عدد ۴!", rules: ["عدد رو یکبار دوبرابر کن، بعد دوباره جواب رو دوبرابر کن.", "مثال: ۴ × ۵ -> اول ۵+۵=۱۰، بعد ۱۰+۱۰=۲۰"] },
  5: { title: "ساعت ۵ عصر", hint: "پنج‌تا پنج‌تا بشمار!", rules: ["جواب همیشه یا به ۰ ختم میشه یا به ۵.", "اگه در عدد زوج ضرب بشه به ۰ و اگه در عدد فرد ضرب بشه به ۵ ختم میشه."] },
  6: { title: "زوج‌های مهربون", hint: "راز عدد ۶ با عددهای زوج!", rules: ["وقتی ۶ رو در یک عدد زوج ضرب می‌کنی، رقم آخر جواب همون عدد هست!", "مثال: ۶ × ۴ = ۲۴ (آخرش ۴ داره)"] },
  7: { title: "سخت‌ترین قهرمان", hint: "برای ۷ باید بیشتر تمرین کنی!", rules: ["۷ × ۸ = ۵۶ (این یکی از سخت‌ترین‌هاست، یادت بمونه!)", "الگوی خاصی نداره، ولی با تکرار ملکه‌ی ذهنت میشه."] },
  8: { title: "نصف عدد ۴", hint: "هشت یعنی سه بار دوبرابر!", rules: ["عدد رو سه بار دوبرابر کن: دوبرابرِ دوبرابرِ دوبرابر!", "مثال: ۸ × ۳ -> ۶، ۱۲، ۲۴"] },
  9: { title: "جادوی انگشتان", hint: "راز عدد ۹ شگفت‌انگیزه!", rules: ["مجموع رقم‌های جواب همیشه ۹ میشه! (مثال: ۹ × ۴ = ۳۶ -> ۳ + ۶ = ۹)", "دهگان جواب همیشه یکی کمتر از عددیه که در ۹ ضرب کردی."] },
  10: { title: "غول صفر", hint: "راحت‌ترین ضرب دنیا!", rules: ["فقط یک صفر بذار جلوی عددی که در ۱۰ ضرب شده.", "مثال: ۱۰ × ۷ = ۷۰"] },
};

const PatternExplorer: React.FC<Props> = ({ table }) => {
  const secret = tableSecrets[table] || { title: "راز کهکشانی", hint: "هر عددی رازی داره!", rules: ["تمرین مداوم بهترین راه یادگیریه."] };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">الگویاب و اسرار عدد {table}</h2>
        <p className="text-gray-400">هر عدد یک رمز مخفی داره، بیا کشفش کنیم!</p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square max-w-[400px] mx-auto w-full glass rounded-[3rem] p-10 flex flex-col items-center justify-center border-4 border-yellow-400/30 shadow-2xl shadow-yellow-500/10"
        >
           <div className="absolute -top-6 bg-yellow-400 text-indigo-900 px-6 py-2 rounded-full font-bold text-xl flex items-center gap-2">
              <Unlock className="w-6 h-6" />
              {secret.title}
           </div>
           
           <div className="text-center space-y-6">
              <div className="bg-white/10 p-4 rounded-2xl">
                 <p className="text-xl text-yellow-300 font-bold italic">"{secret.hint}"</p>
              </div>
              
              <div className="space-y-4 text-right">
                 {secret.rules.map((rule, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="flex items-start gap-3"
                    >
                       <div className="mt-1 bg-blue-500 rounded-full p-1"><Zap className="w-3 h-3 text-white" /></div>
                       <p className="text-lg text-blue-50 leading-relaxed">{rule}</p>
                    </motion.div>
                 ))}
              </div>
           </div>

           <div className="absolute -bottom-6 animate-pulse">
              <Sparkles className="w-12 h-12 text-yellow-400" />
           </div>
        </motion.div>

        <div className="space-y-4">
           <h3 className="text-xl font-bold text-purple-400 mb-4">بیا الگو رو توی جدول ببینی:</h3>
           <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <div key={i} className="glass p-3 rounded-xl flex justify-between items-center border border-white/5 hover:border-blue-500/30 transition-colors">
                   <span className="text-gray-400 font-mono">{table} × {i} =</span>
                   <span className="text-2xl font-black text-white">{table * i}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-6 p-4 bg-indigo-900/40 rounded-2xl border border-indigo-400/20 text-center">
              <p className="text-indigo-200">
                 <span className="font-bold text-white">نکته طلایی:</span> وقتی الگوها رو یاد بگیری، دیگه لازم نیست حفظ کنی، فقط کافیه فکر کنی!
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatternExplorer;
