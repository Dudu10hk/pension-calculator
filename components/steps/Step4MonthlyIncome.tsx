'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLeadStore } from '@/lib/store'

export default function Step4MonthlyIncome() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [income, setIncome] = useState<number>(data.monthlyIncome || 15000)

  useEffect(() => {
    setData({ monthlyIncome: income })
  }, [income, setData])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleContinue = () => {
    router.push('/step/5')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 justify-center">
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 1: יעדים
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 2: נכסים
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <Link
                className="text-primary text-base font-medium leading-normal hover:underline"
                href="/step/3"
              >
                שלב 3: הכנסה
              </Link>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-3 px-4">
              <div className="flex flex-col gap-3">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  מה ההכנסה החודשית שלך?
                </p>
              </div>
            </div>

            {/* Income Input */}
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="w-full max-w-sm px-4">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 text-center">
                    <label
                      className="text-lg font-semibold text-slate-800 dark:text-slate-200"
                      htmlFor="monthly-income"
                    >
                      הכנסה ברוטו (לפני מס):
                    </label>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(income)}
                      </span>
                    </div>
                    <div className="relative pt-4">
                      <input
                        className="w-full"
                        id="monthly-income"
                        max={55000}
                        min={5000}
                        step={500}
                        type="range"
                        value={income}
                        onChange={(e) => setIncome(parseInt(e.target.value))}
                      />
                      <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                        <span>5,000 ₪</span>
                        <span>55,000 ₪</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <span>💡</span>
                    <span>זה עוזר לנו לחשב כמה תוכל לחסוך מדי חודש</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center p-4">
              <button
                onClick={handleContinue}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span>המשך</span>
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

