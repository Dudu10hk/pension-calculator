'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLeadStore } from '@/lib/store'

export default function Step3RetirementAge() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [selectedAge, setSelectedAge] = useState<number | null>(
    data.retirementAge || null
  )

  const retirementOptions = [
    { age: 50, label: 'חלום אמיתי 🌴', description: 'חלום אמיתי 🌴' },
    { age: 55, label: 'שאפתני 🎯', description: 'שאפתני 🎯' },
    { age: 60, label: 'ריאליסטי ⚡️', description: 'ריאליסטי ⚡️' },
  ]

  const handleAgeSelect = (age: number) => {
    setSelectedAge(age)
    setData({ retirementAge: age })
  }

  const handleContinue = () => {
    if (selectedAge) {
      router.push('/step/4')
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
                className="text-primary text-base font-medium leading-normal hover:underline"
                href="/step/2"
              >
                שלב 1: יעדים
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 2: אסטרטגיה
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 3: סימולציה
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-3 px-4">
              <div className="flex flex-col gap-3">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  באיזה גיל תרצה/י לפרוש?
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  זוהי אחת ההחלטות החשובות ביותר בתכנון הפרישה שלך.
                </p>
              </div>
            </div>

            {/* Age Options */}
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                {retirementOptions.map((option) => (
                  <button
                    key={option.age}
                    onClick={() => handleAgeSelect(option.age)}
                    className={`flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/30 ${
                      selectedAge === option.age
                        ? 'border-2 border-primary ring-4 ring-primary/20'
                        : 'border-2 border-transparent'
                    }`}
                  >
                    <span
                      className={`text-5xl font-extrabold ${
                        selectedAge === option.age
                          ? 'text-primary'
                          : 'text-slate-800 dark:text-white'
                      }`}
                    >
                      {option.age}
                    </span>
                    <span
                      className={`text-lg mt-1 ${
                        selectedAge === option.age
                          ? 'text-primary/80 dark:text-primary/90'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center p-4 mt-8">
              <button
                onClick={handleContinue}
                disabled={!selectedAge}
                className={`flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-base font-bold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark ${
                  selectedAge
                    ? 'bg-primary shadow-primary/30 hover:bg-primary/90'
                    : 'bg-slate-400 cursor-not-allowed'
                }`}
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

