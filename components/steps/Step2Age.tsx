'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step2Age() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [age, setAge] = useState<number>(data.currentAge || 35)
  const [isVisible, setIsVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleContinue = () => {
    setData({ currentAge: age })
    router.push('/step/3')
  }

  const handleAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    if (!isNaN(val) && val >= 1 && val <= 120) {
      setAge(val)
    } else if (e.target.value === '') {
      setAge(0)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#DDDDDD] font-display text-[#0d141b] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-12 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <motion.div 
            className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl p-10 border border-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[14%] transition-all duration-500"></div>
            </div>

            <div className="space-y-8 text-center">
              <div className="space-y-3">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 1 מתוך 7</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">בן כמה אתה היום?</h1>
                <p className="text-slate-500 text-sm">הגיל שלך הוא הבסיס לחישוב שנות הצבירה שנותרו לך</p>
              </div>

              <div className="py-12 flex flex-col items-center gap-8">
                <div className="relative group cursor-pointer" onClick={() => !isEditing && setIsEditing(true)}>
                  <AnimatePresence mode="wait">
                    {!isEditing ? (
                      <motion.div
                        key="display"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center justify-center gap-4"
                      >
                        <span className="text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none">{age || 0}</span>
                        <div className="flex flex-col items-start">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2 transition-transform group-hover:scale-110">שנים</span>
                          <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">edit</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative"
                      >
                        <input
                          ref={inputRef}
                          type="number"
                          value={age || ''}
                          onChange={handleAgeInputChange}
                          onBlur={() => setIsEditing(false)}
                          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                          className="text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none w-32 md:w-48 text-center bg-slate-50 rounded-2xl border-2 border-primary/20 outline-none focus:border-primary/50 transition-all"
                          min="1"
                          max="120"
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-bold text-primary animate-pulse">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          <span>לחץ Enter לסיום</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={`w-full space-y-4 transition-opacity duration-300 ${isEditing ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    step="1"
                    value={age || 18}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#E7FE55]"
                    style={{
                      background: `linear-gradient(to left, #E7FE55 0%, #E7FE55 ${(((age || 18) - 18) / (80 - 18)) * 100}%, #f1f5f9 ${(((age || 18) - 18) / (80 - 18)) * 100}%, #f1f5f9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>18</span>
                    <span>80</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#0d141b] hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>המשך לשלב הבא</span>
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
