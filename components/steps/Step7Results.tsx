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

  // בדיקת מצב הפרישה - האם המשתמש במסלול טוב
  const isOnTrack = availableMonthlySavings >= requiredMonthlySavings || expectedMonthlyPension >= targetMonthlyPension
  const savingsGap = requiredMonthlySavings - availableMonthlySavings
  const savingsGapPercentage = requiredMonthlySavings > 0 ? (savingsGap / requiredMonthlySavings) * 100 : 0

  // בדיקה אם הטופס מולא
  const isFormFilled = formData.name.trim() !== '' && formData.email.trim() !== ''

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
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                    קבל/י את תוכנית הפרישה המלאה שלך
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    השאר/י פרטים כדי לקבל ניתוח מפורט ומדויק
                  </p>
                </div>
              </div>
              <form className="grid md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
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
                  className="flex gap-2"
                >
                  <input
                    className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm py-2.5 px-4"
                    id="phone"
                    placeholder="טלפון (אופציונלי)"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <motion.button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>שלח</span>
                    <span className="material-symbols-outlined arrow-animate text-lg">
                      arrow_back
                    </span>
                  </motion.button>
                </motion.div>
              </form>
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
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {statusInfo.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {statusInfo.subtitle}
                  </p>
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
                  <span className={`font-bold text-2xl ${isOnTrack ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
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
    </div>
  )
}

