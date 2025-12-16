'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLeadStore } from '@/lib/store'

export default function Step7Results() {
  const { data } = useLeadStore()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // חישוב הפרמטרים
  const currentAge = data.currentAge || 35
  const retirementAge = data.retirementAge || 60
  const monthlyIncome = data.monthlyIncome || 15000
  const monthlyExpenses = data.monthlyExpenses || 12000
  const currentSavings = data.currentSavings || 100000
  
  const yearsToRetirement = Math.max(1, retirementAge - currentAge)
  const monthsToRetirement = yearsToRetirement * 12

  // פרמטרים פיננסיים
  const annualReturnRate = 0.06 // ריבית שנתית משוערת 6%
  const monthlyReturnRate = annualReturnRate / 12
  const inflationRate = 0.03 // אינפלציה שנתית משוערת 3%
  const yearsInRetirement = 25 // שנים צפויות בפרישה
  const withdrawalRate = 0.04 // כלל 4% לפרישה

  // חישוב קצבה חודשית רצויה בפרישה (עם התאמה לאינפלציה)
  // קצבה = הוצאות חודשיות נוכחיות * (1 + אינפלציה)^שנים עד פרישה
  const targetMonthlyPension = monthlyExpenses * Math.pow(1 + inflationRate, yearsToRetirement)
  
  // הון נדרש לפרישה (לפי כלל 4%)
  // הון נדרש = קצבה חודשית * 12 / 0.04
  const targetTotalCapital = (targetMonthlyPension * 12) / withdrawalRate

  // חיסכון נוכחי עם צמיחה עד פרישה
  const currentSavingsWithGrowth = currentSavings * Math.pow(1 + annualReturnRate, yearsToRetirement)

  // כמה אפשר לחסוך מדי חודש (הכנסה פחות הוצאות)
  const availableMonthlySavings = Math.max(0, monthlyIncome - monthlyExpenses)

  // הון צפוי בפרישה - מה יהיה אם יחסוך את החיסכון החודשי הזמין
  // חיסכון נוכחי עם צמיחה + חיסכון עתידי מהחיסכון החודשי הזמין
  // ערך עתידי של אנואיטה: FV = PMT * (((1+r)^n - 1) / r)
  let futureSavingsFromMonthly = 0
  if (availableMonthlySavings > 0 && monthsToRetirement > 0) {
    const fvFactor = (Math.pow(1 + monthlyReturnRate, monthsToRetirement) - 1) / monthlyReturnRate
    futureSavingsFromMonthly = availableMonthlySavings * fvFactor
  }
  
  const expectedCapital = currentSavingsWithGrowth + futureSavingsFromMonthly

  // חישוב האם החיסכון הזמין מספיק למטרה
  // כמה צריך לחסוך מדי חודש כדי להגיע למטרה
  const additionalCapitalNeeded = Math.max(0, targetTotalCapital - currentSavingsWithGrowth)
  let requiredMonthlySavings = 0
  if (monthsToRetirement > 0 && additionalCapitalNeeded > 0) {
    const fvFactor = (Math.pow(1 + monthlyReturnRate, monthsToRetirement) - 1) / monthlyReturnRate
    requiredMonthlySavings = additionalCapitalNeeded / fvFactor
  }

  // קצבה חודשית צפויה (כלל 4% מהון)
  const expectedMonthlyPension = (expectedCapital * withdrawalRate) / 12

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // כאן תהיה שליחה לשרת
    console.log('Form submitted:', formData)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-8">
            {/* Breadcrumb */}
            <motion.div
              className="flex flex-wrap gap-2 px-4 justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
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
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/6"
              >
                שלב 6
              </Link>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-primary text-base font-medium leading-normal">
                שלב 7: תוצאה
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              className="flex flex-wrap justify-center text-center gap-3 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  זוהי תמונת המצב שלך לפרישה
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  בהתבסס על הנתונים שהזנת, זוהי ההערכה שלנו לגבי עתידך הפיננסי.
                </p>
              </div>
            </motion.div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-8 items-stretch">
              {/* Results Card */}
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col gap-6 h-full"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-full shrink-0">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      את/ה בדרך הנכונה! 🎉
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      התוכנית שלך נראית מבטיחה.
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6 flex flex-col gap-5 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">גיל פרישה יעד:</span>
                    <span className="font-bold text-lg text-slate-800 dark:text-white">
                      {retirementAge}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">חיסכון חודשי זמין:</span>
                    <span className="font-bold text-lg text-slate-800 dark:text-white">
                      {formatCurrency(Math.max(0, availableMonthlySavings))}
                    </span>
                  </div>
                  {requiredMonthlySavings > availableMonthlySavings && (
                    <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
                      <span className="text-sm">חיסכון חודשי נדרש:</span>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.max(0, requiredMonthlySavings))}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">הון צפוי בפרישה:</span>
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">
                      {formatCurrency(Math.max(0, expectedCapital))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">קצבה חודשית צפויה:</span>
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">
                      {formatCurrency(Math.max(0, expectedMonthlyPension))}
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-4 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700/50">
                  <p>
                    *הערכה זו מבוססת על הנחות יסוד ואינה מהווה ייעוץ פנסיוני. התוצאות עשויות להשתנות.
                  </p>
                </div>
              </motion.div>

              {/* Contact Form Card */}
              <motion.div
                className="bg-primary/5 dark:bg-slate-800/50 rounded-xl shadow-lg p-6 flex flex-col gap-6 h-full relative border border-primary/10 dark:border-slate-700"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 text-primary flex items-center justify-center rounded-full shadow-sm ring-1 ring-slate-200 dark:ring-slate-600 shrink-0">
                    <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                      קבל/י את תוכנית הפרישה המלאה שלך!
                    </h3>
                  </div>
                </div>
                <div className="border-t border-primary/10 dark:border-slate-700 pt-6 flex flex-col gap-2 flex-1">
                  <div className="flex flex-col gap-4 mb-6">
                    <motion.div
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-sm font-medium leading-tight">
                        ניתוח מקיף של מצבך הפיננסי הנוכחי.
                      </p>
                    </motion.div>
                    <motion.div
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-sm font-medium leading-tight">
                        תחזית מפורטת של ההון והקצבה שתהיה לך בפרישה, בהתאמה אישית.
                      </p>
                    </motion.div>
                    <motion.div
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-sm font-medium leading-tight">
                        המלצות אסטרטגיות לשיפור החיסכון וההשקעות שלך.
                      </p>
                    </motion.div>
                    <motion.div
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                    >
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-sm font-medium leading-tight">
                        פעולות קונקרטיות שתוכל/י לבצע כבר היום כדי להבטיח את עתידך.
                      </p>
                    </motion.div>
                  </div>
                  <form className="mt-auto w-full flex flex-col gap-3" onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                    >
                      <label className="sr-only" htmlFor="name">
                        שם מלא
                      </label>
                      <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5 px-4"
                        id="name"
                        placeholder="שם מלא"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 1.2 }}
                    >
                      <label className="sr-only" htmlFor="email">
                        כתובת אימייל
                      </label>
                      <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5 px-4"
                        id="email"
                        placeholder="כתובת אימייל"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 1.3 }}
                    >
                      <label className="sr-only" htmlFor="phone">
                        טלפון
                      </label>
                      <input
                        className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5 px-4"
                        id="phone"
                        placeholder="טלפון (אופציונלי)"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark w-full mt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 1.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>שלחו לי את התוכנית</span>
                      <span className="material-symbols-outlined arrow-animate text-lg">
                        arrow_back
                      </span>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

