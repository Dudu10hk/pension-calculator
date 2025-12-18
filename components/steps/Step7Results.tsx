'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLeadStore } from '@/lib/store'

// קומפוננט Tooltip
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <span className="relative inline-flex items-center gap-1">
      {children}
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 text-slate-400 hover:text-primary transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="material-symbols-outlined text-sm">info</span>
      </button>
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg z-50 leading-relaxed">
          {text}
          <div className="absolute top-full right-4 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
        </div>
      )}
    </span>
  )
}

export default function Step7Results() {
  const { data } = useLeadStore()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [idError, setIdError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    idIssueDate: '',
  })

  // פונקציית ולידציה לתעודת זהות ישראלית
  const validateIsraeliID = (id: string): boolean => {
    // בדיקת אורך
    if (id.length !== 9) {
      return false
    }

    // בדיקת ספרות בלבד
    if (!/^\d+$/.test(id)) {
      return false
    }

    // אלגוריתם לון (Luhn algorithm) לבדיקת ת.ז ישראלית
    let sum = 0
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id[i])
      // כפל הספרות במיקומים אי-זוגיים ב-2
      if (i % 2 === 0) {
        digit *= 1
      } else {
        digit *= 2
        // אם התוצאה גדולה מ-9, חבר את הספרות
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10)
        }
      }
      sum += digit
    }

    // הסכום חייב להתחלק ב-10
    return sum % 10 === 0
  }

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

  // בדיקת מצב הפרישה - האם המשתמש במסלול טוב
  const isOnTrack = availableMonthlySavings >= requiredMonthlySavings || expectedMonthlyPension >= targetMonthlyPension
  const savingsGap = requiredMonthlySavings - availableMonthlySavings
  const savingsGapPercentage = requiredMonthlySavings > 0 ? (savingsGap / requiredMonthlySavings) * 100 : 0

  // בדיקה אם הטופס נשלח
  const isFormFilled = isSubmitted

  // קביעת סטטוס וטקסט מתאים
  const getStatusInfo = () => {
    if (isOnTrack) {
      return {
        title: 'מצוין, את/ה במסלול נהדר',
        subtitle: 'החיסכון שלך מספיק להגיע ליעד הפרישה.',
        icon: 'check_circle',
        color: 'green'
      }
    } else if (savingsGapPercentage <= 30) {
      return {
        title: 'כמעט שם',
        subtitle: `עוד קצת מאמץ ותגיע/י ליעד. חסר לך ${formatCurrency(savingsGap)} בחודש.`,
        icon: 'trending_up',
        color: 'yellow'
      }
    } else {
      return {
        title: 'יש מקום לשיפור',
        subtitle: 'בוא/י נבנה תוכנית מותאמת אישית שתעזור לך להגיע ליעד.',
        icon: 'analytics',
        color: 'orange'
      }
    }
  }

  const statusInfo = getStatusInfo()

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
    
    // Validation: צריך גם ת.ז וגם תאריך הנפקה
    if (!formData.idNumber || !formData.idIssueDate) {
      setIdError('אנא הזן ת.ז ותאריך הנפקה')
      return
    }

    // בדיקת תקינות ת.ז
    if (!validateIsraeliID(formData.idNumber)) {
      setIdError('תעודת זהות לא תקינה. אנא בדוק את המספר שהזנת')
      return
    }

    // איפוס שגיאות
    setIdError('')
    
    // כאן תהיה שליחה לשרת
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    // שמירה ב-store אם צריך
    useLeadStore.getState().updateData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })
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

            {/* Contact Form - Top Section */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center rounded-full shrink-0">
                  <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                    קבל/י את תוכנית הפרישה המלאה שלך
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    השאר/י פרטים כדי לקבל ניתוח מפורט ומדויק
                  </p>
                  {/* Progress Indicator */}
                  {(() => {
                    const filledFields = [
                      formData.name,
                      formData.email,
                      formData.phone,
                      formData.idNumber,
                      formData.idIssueDate
                    ].filter(Boolean).length
                    const totalFields = 5
                    const progress = (filledFields / totalFields) * 100
                    return (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">התקדמות מילוי הטופס</span>
                          <span className="text-xs font-semibold text-primary">{filledFields}/{totalFields}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )
                  })()}
                </div>
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors border border-primary/20"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">preview</span>
                  <span>תראה מה תקבל</span>
                </button>
              </div>

              {!isSubmitted ? (
                <>
                  {/* Benefit Highlights */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/20 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">stars</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                          למה כדאי לך להשאיר פרטים עכשיו?
                        </h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>דוח מותאם אישית - חינם וללא התחייבות</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>תוכנית פעולה מעשית - צעדים ברורים למימוש החלום</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span>ללא עלות נסתרת - הכל שקוף וברור מראש</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label className="sr-only" htmlFor="name">
                      שם מלא
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm py-2.5 px-4"
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
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <label className="sr-only" htmlFor="email">
                      כתובת אימייל
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm py-2.5 px-4"
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
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <label className="sr-only" htmlFor="phone">
                      טלפון נייד
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm py-2.5 px-4"
                      id="phone"
                      placeholder="טלפון נייד"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <label className="sr-only" htmlFor="idNumber">
                      ת.ז
                    </label>
                    <input
                      className={`w-full rounded-lg border ${
                        idError && formData.idNumber
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-primary/20'
                      } dark:bg-slate-700 dark:text-white focus:ring-2 text-sm py-2.5 px-4`}
                      id="idNumber"
                      placeholder="תעודת זהות (9 ספרות)"
                      type="text"
                      maxLength={9}
                      value={formData.idNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        setFormData({ ...formData, idNumber: value })
                        // איפוס שגיאה בזמן הקלדה
                        if (idError) setIdError('')
                      }}
                      onBlur={() => {
                        // בדיקת ולידציה כשעוזבים את השדה
                        if (formData.idNumber && formData.idNumber.length === 9) {
                          if (!validateIsraeliID(formData.idNumber)) {
                            setIdError('תעודת זהות לא תקינה')
                          }
                        } else if (formData.idNumber && formData.idNumber.length > 0) {
                          setIdError('תעודת זהות חייבת להכיל 9 ספרות')
                        }
                      }}
                      required
                    />
                    {idError && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {idError}
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <label className="sr-only" htmlFor="idIssueDate">
                      תאריך הנפקה
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm py-2.5 px-4"
                      id="idIssueDate"
                      placeholder="תאריך הנפקת ת.ז (DD/MM/YYYY)"
                      type="text"
                      value={formData.idIssueDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '')
                        if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2)
                        if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5, 9)
                        setFormData({ ...formData, idIssueDate: value })
                      }}
                      maxLength={10}
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="md:col-span-2"
                  >
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-green-500 text-base">verified</span>
                        <span>אבטחה מלאה</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-blue-500 text-base">lock</span>
                        <span>פרטיות מובטחת</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-purple-500 text-base">groups</span>
                        <span>יותר מ-5,000 לקוחות מרוצים</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex flex-col items-center gap-3">
                      <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>קבל/י את התוכנית המלאה עכשיו</span>
                        <span className="material-symbols-outlined arrow-animate text-lg">
                          arrow_back
                        </span>
                      </motion.button>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        ⚡ תקבל/י את הדוח המלא תוך דקות ספורות
                      </p>
                    </div>
                  </motion.div>
                  </form>

                  {/* Animated Arrow & Preview Section */}
                  <motion.div
                    className="flex flex-col items-center gap-4 mt-6"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    {/* Animated Arrow */}
                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="text-primary text-4xl">↓</span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        ברגע שתשאיר/י פרטים, נפתחים הנתונים המלאים:
                      </p>
                    </motion.div>

                    {/* Preview Cards - What Will Unlock */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                      <motion.div
                        className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800/30"
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">analytics</span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">דוח פיננסי מפורט</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          ניתוח מדויק של מצבך הפיננסי עם המלצות מותאמות
                        </p>
                      </motion.div>

                      <motion.div
                        className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800/30"
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-green-600 dark:text-green-400">route</span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">תוכנית פעולה</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          צעדים מעשיים למימוש החלום - שלב אחר שלב
                        </p>
                      </motion.div>

                      <motion.div
                        className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800/30"
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">support_agent</span>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">ליווי מקצועי</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          מעקב שוטף והתאמה אישית של התוכנית שלך
                        </p>
                      </motion.div>
                    </div>

                    {/* Social Proof & Urgency */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-slate-800"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          +5,247 כבר קיבלו את התוכנית שלהם
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined text-lg animate-pulse">schedule</span>
                        <span className="text-sm font-medium">הצטרף עכשיו - מקומות מוגבלים</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center rounded-full shrink-0">
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                  </div>
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-semibold text-sm">
                      הפרטים נקלטו בהצלחה!
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                      תוכל/י לראות כעת את כל הניתוח המפורט למטה
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Results Card - Bottom Section */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-500 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {/* Visible Section - Always Shown */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 ${
                  statusInfo.color === 'green' 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : statusInfo.color === 'yellow'
                    ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                }`}>
                  <span className="material-symbols-outlined text-2xl">{statusInfo.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {statusInfo.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {statusInfo.subtitle}
                  </p>
                  {!isFormFilled && (
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 font-medium">
                      התוכנית הבסיסית לפרישה תיפתח באופן מלא לאחר מילוי פרטים בטופס למעלה
                    </p>
                  )}
                </div>
              </div>
              
              {/* Always Visible - Key Metrics */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <Tooltip text="גיל הפרישה שבחרת. בישראל: גברים - 67, נשים - 62-65 (בהתאם לשנת הלידה). פרישה מוקדמת אפשרית החל מגיל 60 עם קנס על הקצבה.">
                    <span className="text-slate-600 dark:text-slate-300">גיל פרישה שבחרת:</span>
                  </Tooltip>
                  <span className="font-bold text-2xl text-primary">
                    {retirementAge}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">קצבה חודשית צפויה:</span>
                  <span className="font-bold text-2xl text-slate-800 dark:text-slate-200">
                    {formatCurrency(Math.max(0, expectedMonthlyPension))}
                  </span>
                </div>
              </div>

              {/* Hidden Section - Requires Form Fill */}
              <div className={`border-t border-slate-200 dark:border-slate-700 pt-6 transition-all duration-500 ${
                !isFormFilled ? 'blur-sm opacity-40' : 'blur-0 opacity-100'
              }`}>
                {!isFormFilled && (
                  <div className="absolute inset-x-0 bottom-0 top-[280px] flex items-center justify-center z-10 rounded-b-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium px-4 text-center">
                      השאר/י פרטים למעלה כדי לראות את כל הניתוח המפורט
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <Tooltip text="הסכום שנשאר לך בכל חודש לחיסכון, לאחר הוצאות. מחושב: הכנסה חודשית פחות הוצאות חודשיות.">
                      <span className="text-slate-600 dark:text-slate-300">חיסכון חודשי זמין:</span>
                    </Tooltip>
                    <span className="font-bold text-lg text-slate-800 dark:text-white">
                      {formatCurrency(Math.max(0, availableMonthlySavings))}
                    </span>
                  </div>
                  {requiredMonthlySavings > availableMonthlySavings && (
                    <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
                      <Tooltip text="הסכום שצריך לחסוך מדי חודש כדי להגיע ליעד הפרישה שלך. מחושב לפי הון נדרש, שנים עד פרישה, ותשואה צפויה.">
                        <span className="text-sm">חיסכון חודשי נדרש:</span>
                      </Tooltip>
                      <span className="font-bold text-sm">
                        {formatCurrency(Math.max(0, requiredMonthlySavings))}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <Tooltip text="סך ההון שיצטבר עד גיל הפרישה, כולל החיסכון הנוכחי עם צמיחה (6% שנתי) ותוספת מהחיסכון החודשי הזמין.">
                      <span className="text-slate-600 dark:text-slate-300">הון צפוי בפרישה:</span>
                    </Tooltip>
                    <span className={`font-bold text-lg ${isOnTrack ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                      {formatCurrency(Math.max(0, expectedCapital))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700/50">
                <p>
                  *הערכה זו מבוססת על הנחות יסוד ואינה מהווה ייעוץ פנסיוני. התוצאות עשויות להשתנות.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowPreviewModal(false)}>
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                תראה מה תקבל בסוף התהליך
              </h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">close</span>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Progress Section */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-end">
                      <p className="text-slate-700 dark:text-slate-200 text-sm font-bold">השלמת התהליך</p>
                      <p className="text-primary text-xl font-bold">100%</p>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs text-left">התוכנית המלאה מוכנה!</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                        <span className="material-symbols-outlined">savings</span>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">פוטנציאל חיסכון בפרישה</p>
                      <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">₪150,000</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined">event_available</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">יעד מקורי: 67</span>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">גיל פרישה יעד מעודכן</p>
                      <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">62</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined">monitor_heart</span>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded flex items-center gap-1">
                        +2 נקודות
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ציון בריאות פנסיוני</p>
                      <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">7/10</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">route</span>
                    מסע הפרישה שלך
                  </h3>
                  <div className="grid grid-cols-[32px_1fr] gap-x-4">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                        <span className="material-symbols-outlined text-[20px] block">check_circle</span>
                      </div>
                      <div className="w-[2px] bg-green-200 dark:bg-green-900 h-full min-h-[40px]"></div>
                    </div>
                    <div className="flex flex-col pb-6 pt-0.5">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">נתונים אישיים</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">הושלם בהצלחה</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                        <span className="material-symbols-outlined text-[20px] block">check_circle</span>
                      </div>
                      <div className="w-[2px] bg-green-200 dark:bg-green-900 h-full min-h-[40px]"></div>
                    </div>
                    <div className="flex flex-col pb-6 pt-0.5">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">בדיקת דמי ניהול</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">נמצאו חריגות שטופלו</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                        <span className="material-symbols-outlined text-[20px] block">check_circle</span>
                      </div>
                      <div className="w-[2px] bg-green-200 dark:bg-green-900 h-full min-h-[40px]"></div>
                    </div>
                    <div className="flex flex-col pb-6 pt-0.5">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">תכנון מס</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">הושלם בהצלחה</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                        <span className="material-symbols-outlined text-[20px] block">check_circle</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">סיכום והמלצות</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">מוכן לך!</p>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">סיכום סטטוס</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full text-primary">
                            <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">צבירה נוכחית</p>
                            <p className="font-bold text-slate-900 dark:text-white">₪450,200</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full text-green-500">
                            <span className="material-symbols-outlined text-xl">trending_up</span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">חיסכון פוטנציאלי</p>
                            <p className="font-bold text-slate-900 dark:text-white">+₪150,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">היעדים שלך</h3>
                    <ul className="flex flex-col gap-3">
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <div className="text-green-500 mt-0.5">
                          <span className="material-symbols-outlined text-lg">check_box</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">פרישה מוקדמת בגיל 62</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <div className="text-green-500 mt-0.5">
                          <span className="material-symbols-outlined text-lg">check_box</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">שיפור דמי ניהול</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <div className="text-green-500 mt-0.5">
                          <span className="material-symbols-outlined text-lg">check_box</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">תכנון מס מיטבי</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-6 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                type="button"
              >
                סגור
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-blue-600 rounded-lg transition-colors shadow-lg shadow-primary/30"
                type="button"
              >
                הבנתי, המשך
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

