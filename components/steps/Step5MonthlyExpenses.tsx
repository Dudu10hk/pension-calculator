'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step5MonthlyExpenses() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [expenses, setExpenses] = useState<number>(data.monthlyExpenses || 10000)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContinue = () => {
    setData({ monthlyExpenses: expenses })
    router.push('/step/6')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
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
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[56%] transition-all duration-500"></div>
            </div>

            <div className="space-y-8 text-center">
              <div className="space-y-3">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 4 מתוך 7</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">מהן ההוצאות החודשיות?</h1>
                <p className="text-slate-500 text-sm">כמה אתם מוציאים בממוצע בחודש (הכל כולל הכל)</p>
              </div>

              <div className="py-12 flex flex-col items-center gap-8">
                <div className="relative">
                  <span className="text-7xl font-black text-slate-900 tabular-nums">{formatCurrency(expenses)}</span>
                </div>

                <div className="w-full space-y-4">
                  <input
                    type="range"
                    min="2000"
                    max="80000"
                    step="500"
                    value={expenses}
                    onChange={(e) => setExpenses(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#E7FE55]"
                    style={{
                      background: `linear-gradient(to left, #E7FE55 0%, #E7FE55 ${((expenses - 2000) / (80000 - 2000)) * 100}%, #f1f5f9 ${((expenses - 2000) / (80000 - 2000)) * 100}%, #f1f5f9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>2,000 ₪</span>
                    <span>80,000 ₪</span>
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
