'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step4FinancialBalance() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  
  const [income, setIncome] = useState<number>(data.monthlyIncome || 15000)
  const [expenses, setExpenses] = useState<number>(data.monthlyExpenses || 10000)
  
  const [isVisible, setIsVisible] = useState(false)
  const [activeEdit, setActiveEdit] = useState<'income' | 'expenses' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (activeEdit && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [activeEdit])

  const handleContinue = () => {
    setData({ monthlyIncome: income, monthlyExpenses: expenses })
    router.push('/step/5')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const disposableIncome = Math.max(0, income - expenses)
  const savingsRate = income > 0 ? (disposableIncome / income) * 100 : 0

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#DDDDDD] font-display text-[#0d141b] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-8 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <motion.div 
            className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-10 border border-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[50%] transition-all duration-500"></div>
            </div>

            <div className="space-y-10 text-center">
              <div className="space-y-2">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 3 מתוך 6</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">המאזן החודשי שלך</h1>
                <p className="text-slate-500 text-sm">הבסיס לחיסכון הוא הפער בין ההכנסה להוצאה</p>
              </div>

              {/* Enhanced Dynamic Balance Card */}
              <div className="bg-[#0d141b] rounded-[24px] p-8 text-white relative overflow-hidden group shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#E7FE55] rounded-full blur-[100px] opacity-10 -mr-24 -mt-24 transition-opacity group-hover:opacity-20"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <p className="text-[10px] font-black text-[#E7FE55] uppercase tracking-[0.25em] mb-2 opacity-80">תזרים חודשי פנוי</p>
                  <span className="text-5xl md:text-6xl font-black tabular-nums text-white tracking-tighter">
                    {formatCurrency(disposableIncome)}
                  </span>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E7FE55] animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-300">שיעור חיסכון: {savingsRate.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-12 py-6">
                {/* Income Input - Highlighted */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">הכנסה נטו</span>
                      <span className="text-sm font-bold text-slate-900">משק בית</span>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveEdit('income')}>
                      <AnimatePresence mode="wait">
                        {activeEdit === 'income' ? (
                          <motion.input
                            ref={inputRef}
                            key="income-input"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            type="text"
                            inputMode="numeric"
                            value={income.toLocaleString('he-IL')}
                            onChange={(e) => setIncome(Number(e.target.value.replace(/\D/g, '')))}
                            onBlur={() => setActiveEdit(null)}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveEdit(null)}
                            className="w-32 bg-slate-50 border-2 border-[#E7FE55] rounded-xl py-2 px-3 text-xl font-black text-slate-900 text-center outline-none shadow-inner"
                          />
                        ) : (
                          <motion.div 
                            key="income-display"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                              {formatCurrency(income)}
                            </span>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary text-sm">edit</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="relative h-4 flex items-center">
                    <div className="absolute w-full h-2 bg-slate-100 rounded-full"></div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="500"
                      value={income}
                      onChange={(e) => setIncome(parseInt(e.target.value))}
                      className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 accent-[#E7FE55]"
                      style={{ 
                        WebkitAppearance: 'none',
                        background: 'transparent'
                      }}
                    />
                    <motion.div 
                      className="absolute h-2 bg-[#E7FE55] rounded-full shadow-[0_0_15px_rgba(231,254,85,0.4)]"
                      animate={{ width: `${((income - 5000) / (100000 - 5000)) * 100}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </div>
                </div>

                {/* Expenses Input - Highlighted */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">הוצאות ממוצעות</span>
                      <span className="text-sm font-bold text-slate-900">מחיה שוטפת</span>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveEdit('expenses')}>
                      <AnimatePresence mode="wait">
                        {activeEdit === 'expenses' ? (
                          <motion.input
                            ref={inputRef}
                            key="expenses-input"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            type="text"
                            inputMode="numeric"
                            value={expenses.toLocaleString('he-IL')}
                            onChange={(e) => setExpenses(Number(e.target.value.replace(/\D/g, '')))}
                            onBlur={() => setActiveEdit(null)}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveEdit(null)}
                            className="w-32 bg-slate-50 border-2 border-indigo-500 rounded-xl py-2 px-3 text-xl font-black text-slate-900 text-center outline-none shadow-inner"
                          />
                        ) : (
                          <motion.div 
                            key="expenses-display"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight group-hover:text-indigo-500 transition-colors">
                              {formatCurrency(expenses)}
                            </span>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 text-sm">edit</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="relative h-4 flex items-center">
                    <div className="absolute w-full h-2 bg-slate-100 rounded-full"></div>
                    <input
                      type="range"
                      min="2000"
                      max="80000"
                      step="500"
                      value={expenses}
                      onChange={(e) => setExpenses(parseInt(e.target.value))}
                      className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 accent-indigo-500"
                      style={{ 
                        WebkitAppearance: 'none',
                        background: 'transparent'
                      }}
                    />
                    <motion.div 
                      className="absolute h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                      animate={{ width: `${((expenses - 2000) / (80000 - 2000)) * 100}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#0d141b] hover:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>אישור והמשך לחיסכון</span>
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
