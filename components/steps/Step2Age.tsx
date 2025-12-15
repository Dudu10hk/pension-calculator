'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step2Age() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [age, setAge] = useState<number>(data.currentAge || 35)
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAgeChange = (newAge: number) => {
    setAge(newAge)
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  useEffect(() => {
    setData({ currentAge: age })
  }, [age, setData])

  const handleContinue = () => {
    router.push('/step/3')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-lg flex-1 gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 justify-center">
              <Link
                className="text-primary text-base font-medium leading-normal hover:underline"
                href="/step/1"
              >
                שלב 1: פרטים אישיים
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 2: יעדים
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                שלב 3: תוצאות
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-wrap justify-center text-center gap-3 px-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  פרישה מוקדמת זה לא חלום!
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-normal leading-normal">
                  גלו מתי תוכלו לפרוש.
                </p>
              </div>
            </div>

            {/* Age Input */}
            <motion.div
              className="flex flex-col items-center gap-8 py-4"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <motion.div
                className="w-full max-w-sm px-4"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.label
                  className="mb-4 block text-center text-lg font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="current-age"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  בן כמה אתה?
                </motion.label>
                <motion.div
                  className="relative flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <input
                    className={`w-full rounded-xl border-slate-300 bg-white p-4 text-center text-5xl font-extrabold text-slate-800 shadow-lg transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary dark:focus:ring-primary/50 ${
                      !hasInteracted ? 'number-blink' : ''
                    }`}
                    id="current-age"
                    max={70}
                    min={18}
                    placeholder="35"
                    type="number"
                    value={age}
                    onChange={(e) => handleAgeChange(parseInt(e.target.value) || 35)}
                    onFocus={() => setHasInteracted(true)}
                  />
                </motion.div>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <input
                    className="w-full"
                    id="age-slider"
                    max={70}
                    min={18}
                    type="range"
                    value={age}
                    onChange={(e) => handleAgeChange(parseInt(e.target.value))}
                  />
                  <div className="mt-2 flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span>18</span>
                    <span>70</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Continue Button */}
            <div className="flex justify-center p-4 mt-4">
              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span>המשך לשלב הבא</span>
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

