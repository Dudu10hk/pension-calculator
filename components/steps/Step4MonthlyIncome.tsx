'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step4MonthlyIncome() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [income, setIncome] = useState<number>(data.monthlyIncome || 15000)
  const [expenses, setExpenses] = useState<number>(data.monthlyExpenses || 12000)
  const [isEditingIncome, setIsEditingIncome] = useState<boolean>(false)
  const [isEditingExpenses, setIsEditingExpenses] = useState<boolean>(false)
  const [inputValueIncome, setInputValueIncome] = useState<string>('')
  const [inputValueExpenses, setInputValueExpenses] = useState<string>('')

  const expenseOptions = [5000, 9000, 16000, 23000, 30000]

  useEffect(() => {
    setData({ monthlyIncome: income, monthlyExpenses: expenses })
  }, [income, expenses, setData])

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

  const handleEditClickIncome = () => {
    setIsEditingIncome(true)
    setInputValueIncome(income.toString())
  }

  const handleEditClickExpenses = () => {
    setIsEditingExpenses(true)
    setInputValueExpenses(expenses.toString())
  }

  const handleInputChangeIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setInputValueIncome(value)
  }

  const handleInputChangeExpenses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setInputValueExpenses(value)
  }

  const handleInputBlurIncome = () => {
    const numValue = parseInt(inputValueIncome) || 5000
    const clampedValue = Math.max(5000, Math.min(55000, numValue))
    setIncome(clampedValue)
    setIsEditingIncome(false)
  }

  const handleInputBlurExpenses = () => {
    const numValue = parseInt(inputValueExpenses) || 5000
    const clampedValue = Math.max(5000, Math.min(30000, numValue))
    setExpenses(clampedValue)
    setIsEditingExpenses(false)
  }

  const handleInputKeyDownIncome = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlurIncome()
    }
    if (e.key === 'Escape') {
      setIsEditingIncome(false)
      setInputValueIncome('')
    }
  }

  const handleInputKeyDownExpenses = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlurExpenses()
    }
    if (e.key === 'Escape') {
      setIsEditingExpenses(false)
      setInputValueExpenses('')
    }
  }

  const handleSliderChangeIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(parseInt(e.target.value))
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-4">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 justify-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                שלב 1: יעדים
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
                שלב 2: נכסים
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-normal">
                /
              </span>
              <Link
                className="text-primary text-sm font-medium leading-normal hover:underline"
                href="/step/3"
              >
                שלב 3: הכנסה
              </Link>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-1 px-4">
              <div className="flex flex-col gap-1">
                <p className="text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  הכנסה והוצאות חודשיות
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                  זה עוזר לנו לחשב כמה תוכל לחסוך מדי חודש ולבנות תכנית פיננסית מותאמת אישית
                </p>
              </div>
            </div>

            {/* Income and Expenses - Side by Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 py-2 px-4">
              {/* Income Input */}
              <div className="w-full max-w-lg lg:flex-1">
                <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <label
                    className="text-sm font-bold text-center text-slate-700 dark:text-slate-300"
                    htmlFor="monthly-income"
                  >
                    הכנסה ברוטו (לפני מס):
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="text-center flex items-center justify-center gap-2">
                      {isEditingIncome ? (
                        <input
                          type="text"
                          value={inputValueIncome}
                          onChange={handleInputChangeIncome}
                          onBlur={handleInputBlurIncome}
                          onKeyDown={handleInputKeyDownIncome}
                          autoFocus
                          className="text-2xl font-bold text-slate-900 dark:text-white text-center bg-transparent border-b-2 border-primary focus:outline-none w-36"
                        />
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {formatCurrency(income)}
                          </span>
                          <button
                            onClick={handleEditClickIncome}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all group"
                            aria-label="ערוך סכום"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <div className="relative w-full h-6 flex items-center">
                      <input
                        className="w-full absolute h-1.5 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
                        id="monthly-income"
                        max={55000}
                        min={5000}
                        step={500}
                        type="range"
                        value={income}
                        onChange={handleSliderChangeIncome}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
                      <span>5,000 ₪</span>
                      <span>55,000 ₪</span>
                    </div>
                  </div>
                  <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 py-1 rounded-lg">
                    💡 זה עוזר לנו לחשב כמה תוכל לחסוך מדי חודש
                  </p>
                </div>
              </div>

              {/* Expenses Input */}
              <div className="w-full max-w-lg lg:flex-1">
                <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <label
                    className="text-sm font-bold text-center text-slate-700 dark:text-slate-300"
                    htmlFor="monthly-expenses-slider"
                  >
                    הוצאות חודשיות ממוצעות:
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="text-center flex items-center justify-center gap-2">
                      {isEditingExpenses ? (
                        <input
                          type="text"
                          value={inputValueExpenses}
                          onChange={handleInputChangeExpenses}
                          onBlur={handleInputBlurExpenses}
                          onKeyDown={handleInputKeyDownExpenses}
                          autoFocus
                          className="text-2xl font-bold text-slate-900 dark:text-white text-center bg-transparent border-b-2 border-primary focus:outline-none w-36"
                        />
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {formatCurrency(expenses)}
                          </span>
                          <button
                            onClick={handleEditClickExpenses}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all group"
                            aria-label="ערוך סכום"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <div className="relative w-full h-6 flex items-center">
                      <input
                        className="w-full absolute h-1.5 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
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
                          className={`px-1 py-0.5 rounded transition-all text-xs ${
                            expenses === value
                              ? 'font-bold bg-primary/10 dark:bg-primary/20 text-primary'
                              : 'text-slate-400 dark:text-slate-500 hover:text-primary hover:font-semibold'
                          }`}
                        >
                          {formatCurrency(value)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 py-1 rounded-lg">
                    🏠 משכנתא, אוכל, חשבונות, בילויים - הכל ביחד
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center p-2">
              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span>המשך לכמה חסכת וצברת</span>
                <span className="material-symbols-outlined arrow-animate">
                  arrow_back
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

