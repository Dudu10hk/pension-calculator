'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLeadStore } from '@/lib/store'

export default function Step5MonthlyExpenses() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [expenses, setExpenses] = useState<number>(data.monthlyExpenses || 12000)
  
  const expenseOptions = [5000, 9000, 16000, 23000, 30000]

  useEffect(() => {
    setData({ monthlyExpenses: expenses })
  }, [expenses, setData])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleContinue = () => {
    router.push('/step/6')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 justify-center">
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/1"
              >
                שלב 1
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/2"
              >
                שלב 2
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/3"
              >
                שלב 3
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/4"
              >
                שלב 4
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-primary text-base font-medium leading-normal">
                שלב 5: רמת חיים
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-3 px-4">
              <div className="flex flex-col gap-3">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  כמה אתה מוציא בחודש?
                </p>
              </div>
            </div>

            {/* Expenses Input */}
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="w-full max-w-lg px-4">
                <div className="flex flex-col gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <label
                    className="text-lg font-bold text-center text-slate-700 dark:text-slate-300"
                    htmlFor="monthly-expenses-slider"
                  >
                    הוצאות חודשיות ממוצעות:
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="text-center">
                      <span
                        className="text-4xl font-extrabold text-black"
                        id="expenses-value"
                      >
                        {formatCurrency(expenses)}
                      </span>
                    </div>
                    <div className="relative w-full h-12 flex items-center">
                      <input
                        className="w-full absolute h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
                        id="monthly-expenses-slider"
                        max={30000}
                        min={5000}
                        step={1000}
                        type="range"
                        value={expenses}
                        onChange={(e) => setExpenses(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium px-1">
                      {expenseOptions.map((value) => (
                        <button
                          key={value}
                          onClick={() => setExpenses(value)}
                          className={`px-2 py-1 rounded transition-all ${
                            expenses === value
                              ? 'text-primary font-bold bg-primary/10 dark:bg-primary/20'
                              : 'text-slate-400 dark:text-slate-500 hover:text-primary hover:font-semibold'
                          }`}
                        >
                          {formatCurrency(value)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 py-2 rounded-lg">
                    🏠 משכנתא, אוכל, חשבונות, בילויים - הכל ביחד
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center p-4">
              <button
                onClick={handleContinue}
                className="flex w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span>חשב את התוצאה! 🎯</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

