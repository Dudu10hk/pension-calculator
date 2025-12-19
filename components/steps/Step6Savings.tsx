'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step6Savings() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [savings, setSavings] = useState<number>(data.currentSavings || 100000)
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
    setData({ currentSavings: savings })
    router.push('/step/6') // Updated to new results step
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/\D/g, ''))
    if (!isNaN(val)) {
      setSavings(Math.min(val, 10000000))
    } else if (e.target.value === '') {
      setSavings(0)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[84%] transition-all duration-500"></div>
            </div>

            <div className="space-y-8 text-center">
              <div className="space-y-3">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 5 מתוך 6</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">כמה חסכת עד היום?</h1>
                <p className="text-slate-500 text-sm">סך כל החסכונות (פנסיה, קופות גמל, עו&ldquo;ש והשקעות)</p>
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
                        <span className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tabular-nums leading-none">
                          {formatCurrency(savings)}
                        </span>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">edit</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative"
                      >
                        <div className="relative flex items-center">
                          <input
                            ref={inputRef}
                            type="text"
                            inputMode="numeric"
                            value={savings === 0 ? '' : savings.toLocaleString('he-IL')}
                            onChange={handleInputChange}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                            className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tabular-nums leading-none w-full max-w-[280px] md:max-w-[350px] text-center bg-slate-50 rounded-2xl border-2 border-primary/20 outline-none focus:border-primary/50 transition-all py-2"
                          />
                          <span className="mr-4 text-2xl md:text-3xl font-black text-slate-400">₪</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-bold text-primary animate-pulse whitespace-nowrap">
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
                    min="0"
                    max="5000000"
                    step="5000"
                    value={savings > 5000000 ? 5000000 : savings}
                    onChange={(e) => setSavings(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#E7FE55]"
                    style={{
                      background: `linear-gradient(to left, #E7FE55 0%, #E7FE55 ${(Math.min(savings, 5000000) / 5000000) * 100}%, #f1f5f9 ${(Math.min(savings, 5000000) / 5000000) * 100}%, #f1f5f9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>0 ₪</span>
                    <span>5,000,000 ₪</span>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
                  <p className="text-xs font-bold text-slate-900">למה זה חשוב?</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  החיסכון הנוכחי שלך הוא &ldquo;גלגל התנופה&rdquo; של התוכנית. ככל שהתחלת עם סכום גבוה יותר, הכוח של הריבית דריבית עובד חזק יותר עבורך.
                </p>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#0d141b] hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>צפה בתוצאות הסימולציה</span>
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">analytics</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
