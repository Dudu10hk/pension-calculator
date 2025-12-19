'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Step1Marketing() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContinue = () => {
    router.push('/step/2')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#DDDDDD] font-display text-[#0d141b] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-8 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <motion.div 
            className="layout-content-container flex flex-col w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image/Visual Side */}
              <div className="relative bg-[#0d141b] p-8 md:p-10 flex flex-col justify-center items-center text-center text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7FE55] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-16 h-16 bg-[#E7FE55] rounded-2xl flex items-center justify-center mb-6 mx-auto rotate-12"
                  >
                    <span className="material-symbols-outlined text-[#0d141b] text-3xl">auto_graph</span>
                  </motion.div>
                  <h2 className="text-2xl font-black mb-3">העתיד שלך מתחיל בחישוב אחד</h2>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                    הצטרף לאלפי ישראלים שכבר גילו איך לפרוש מוקדם יותר עם תוכנית פיננסית חכמה
                  </p>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      סימולטור פרישה מתקדם
                    </div>
                  <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-slate-900">
                    מתי תגיע ל<span className="text-primary">חופש כלכלי?</span>
                  </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                      האלגוריתם שלנו ינתח את המצב שלך ויבנה לך מפת דרכים מדויקת לפרישה המיוחלת.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: 'bolt', text: 'ניתוח מהיר ב-60 שניות' },
                      { icon: 'security', text: 'דיסקרטיות מלאה מובטחת' },
                      { icon: 'trending_up', text: 'אופטימיזציה של דמי ניהול' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-base">{item.icon}</span>
                        </div>
                        <span className="text-slate-700 font-bold text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 space-y-4">
                    <motion.button
                      onClick={handleContinue}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#E7FE55] hover:bg-[#d9f030] text-[#0d141b] font-black py-4 rounded-2xl shadow-xl shadow-[#E7FE55]/20 transition-all flex items-center justify-center gap-3 text-lg group"
                    >
                      <span>בואו נתחיל בחישוב</span>
                      <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    </motion.button>
                    <p className="text-center text-[10px] text-slate-400 font-medium italic">
                      * ללא עלות וללא התחייבות
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
