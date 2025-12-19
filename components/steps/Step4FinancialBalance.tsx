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

            <div className="space-y-8 text-center">
              <div className="space-y-2">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 3 מתוך 6</p>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">מה המצב הכלכלי שלך?</h1>
                <p className="text-slate-500 text-sm">נתחיל מההכנסה וההוצאות החודשיות</p>
              </div>

              {/* Two Cards Side by Side - Softer Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-4">
                {/* Income Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border border-slate-200">
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto bg-[#E7FE55]/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[#0d141b]">
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-2">הכנסה חודשית נטו</p>
                      <div 
                        className="flex items-center justify-center gap-2 cursor-pointer group"
                        onClick={() => setActiveEdit('income')}
                      >
                        <AnimatePresence mode="wait">
                          {activeEdit === 'income' ? (
                            <motion.input
                              ref={inputRef}
                              key="income-input"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              type="text"
                              inputMode="numeric"
                              value={income.toLocaleString('he-IL')}
                              onChange={(e) => setIncome(Number(e.target.value.replace(/\D/g, '')))}
                              onBlur={() => setActiveEdit(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setActiveEdit(null)}
                              className="w-40 bg-slate-50 border-2 border-[#E7FE55] rounded-xl py-2 px-3 text-2xl md:text-3xl font-bold text-[#0d141b] text-center outline-none"
                            />
                          ) : (
                            <motion.div
                              key="income-display"
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <p className="text-3xl md:text-4xl font-bold text-[#0d141b] tabular-nums">
                                {formatCurrency(income)}
                              </p>
                              <span className="material-symbols-outlined text-slate-400 group-hover:text-[#E7FE55] text-lg transition-colors">
                                edit
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="relative h-2 flex items-center pt-2">
                      <div className="absolute w-full h-2 bg-slate-100 rounded-full"></div>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="500"
                        value={income}
                        onChange={(e) => setIncome(parseInt(e.target.value))}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                        style={{ 
                          WebkitAppearance: 'none',
                          background: 'transparent'
                        }}
                      />
                      <motion.div 
                        className="absolute h-2 bg-[#E7FE55] rounded-full"
                        animate={{ width: `${((income - 5000) / (100000 - 5000)) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Expenses Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border border-slate-200">
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[#0d141b]">
                        receipt_long
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-2">הוצאות חודשיות</p>
                      <div 
                        className="flex items-center justify-center gap-2 cursor-pointer group"
                        onClick={() => setActiveEdit('expenses')}
                      >
                        <AnimatePresence mode="wait">
                          {activeEdit === 'expenses' ? (
                            <motion.input
                              ref={inputRef}
                              key="expenses-input"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              type="text"
                              inputMode="numeric"
                              value={expenses.toLocaleString('he-IL')}
                              onChange={(e) => setExpenses(Number(e.target.value.replace(/\D/g, '')))}
                              onBlur={() => setActiveEdit(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setActiveEdit(null)}
                              className="w-40 bg-slate-50 border-2 border-slate-400 rounded-xl py-2 px-3 text-2xl md:text-3xl font-bold text-[#0d141b] text-center outline-none"
                            />
                          ) : (
                            <motion.div
                              key="expenses-display"
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <p className="text-3xl md:text-4xl font-bold text-[#0d141b] tabular-nums">
                                {formatCurrency(expenses)}
                              </p>
                              <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600 text-lg transition-colors">
                                edit
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="relative h-2 flex items-center pt-2">
                      <div className="absolute w-full h-2 bg-slate-100 rounded-full"></div>
                      <input
                        type="range"
                        min="2000"
                        max="80000"
                        step="500"
                        value={expenses}
                        onChange={(e) => setExpenses(parseInt(e.target.value))}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                        style={{ 
                          WebkitAppearance: 'none',
                          background: 'transparent'
                        }}
                      />
                      <motion.div 
                        className="absolute h-2 bg-slate-400 rounded-full"
                        animate={{ width: `${((expenses - 2000) / (80000 - 2000)) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Card - Softer */}
              <motion.div 
                className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-right">
                    <p className="text-sm font-semibold text-slate-600 mb-2">חיסכון חודשי אפשרי</p>
                    <p className="text-4xl md:text-5xl font-bold text-[#0d141b] tabular-nums">
                      {formatCurrency(disposableIncome)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-xs text-slate-500 mb-1 font-medium">שיעור חיסכון</p>
                      <p className="text-2xl font-bold text-[#0d141b]">{savingsRate.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              </motion.div>

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
