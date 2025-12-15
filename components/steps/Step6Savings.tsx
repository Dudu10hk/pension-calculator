'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step6Savings() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [savings, setSavings] = useState<number>(data.currentSavings || 100000)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  
  const savingsOptions = [50000, 100000, 500000, 1000000, 2000000]

  useEffect(() => {
    setData({ currentSavings: savings })
  }, [savings, setData])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleContinue = () => {
    router.push('/step/7')
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setInputValue(savings.toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue) || 10000
    const clampedValue = Math.max(10000, Math.min(5000000, numValue))
    setSavings(clampedValue)
    setIsEditing(false)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setInputValue('')
    }
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
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/5"
              >
                שלב 5
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-primary text-base font-medium leading-normal">
                שלב 6: חיסכון
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-3 px-4">
              <div className="flex flex-col gap-3">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  כמה חיסכון צברת עד עכשיו?
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                  זה עוזר לנו לחשב את נקודת הפתיחה שלכם ולבנות תכנית מותאמת אישית
                </p>
              </div>
            </div>

            {/* Savings Input */}
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="w-full max-w-lg px-4">
                <div className="flex flex-col gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <label
                    className="text-lg font-bold text-center text-slate-700 dark:text-slate-300"
                    htmlFor="savings-slider"
                  >
                    סכום החיסכון הנוכחי:
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="text-center flex items-center justify-center gap-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          onKeyDown={handleInputKeyDown}
                          autoFocus
                          className="text-4xl font-extrabold text-black text-center bg-transparent border-b-2 border-primary focus:outline-none w-48"
                        />
                      ) : (
                        <>
                          <span
                            className="text-4xl font-extrabold text-black"
                            id="savings-value"
                          >
                            {formatCurrency(savings)}
                          </span>
                          <button
                            onClick={handleEditClick}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all group"
                            aria-label="ערוך סכום"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors"
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
                    <div className="relative w-full h-12 flex items-center">
                      <input
                        className="w-full absolute h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
                        id="savings-slider"
                        max={5000000}
                        min={10000}
                        step={10000}
                        type="range"
                        value={savings}
                        onChange={(e) => setSavings(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium px-1">
                      {savingsOptions.map((value) => (
                        <button
                          key={value}
                          onClick={() => setSavings(value)}
                          className={`px-1 py-1 rounded transition-all whitespace-nowrap flex-shrink-0 ${
                            savings === value
                              ? 'font-bold bg-primary/10 dark:bg-primary/20'
                              : 'text-slate-400 dark:text-slate-500 hover:text-[#137FEC] hover:font-semibold'
                          }`}
                          style={savings === value ? { color: '#137FEC' } : {}}
                        >
                          {formatCurrency(value)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 py-2 rounded-lg">
                    💰 כולל חסכונות, קופות גמל, קרנות השתלמות וכל נכס פיננסי אחר
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center p-4">
              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span>המשך</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

