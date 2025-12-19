'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

// קומפוננט טולטיפ יוקרתי
function StatTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="relative inline-block w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-1/2 -translate-y-1/2 left-full ml-4 w-72 p-4 bg-[#0d141b] text-white text-[11px] leading-relaxed rounded-2xl shadow-2xl z-50 text-right border border-white/10 backdrop-blur-md"
          >
            <div className="relative z-10 font-medium">
              <span className="text-[#E7FE55] font-black block mb-1">מידע חשוב:</span>
              {text}
            </div>
            {/* Triangle Arrow pointing right */}
            <div className="absolute top-1/2 -translate-y-1/2 right-full mr-[-8px] border-y-[8px] border-y-transparent border-l-[8px] border-l-[#0d141b]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Step7Results() {
  const { data } = useLeadStore()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [idError, setIdError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [pensionClearinghouseError, setPensionClearinghouseError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    idIssueDate: '',
    termsAccepted: false,
    pensionClearinghouseContact: false,
  })

  // פונקציית ולידציה לתעודת זהות ישראלית
  const validateIsraeliID = (id: string): boolean => {
    if (id.length !== 9 || !/^\d+$/.test(id)) return false
    let sum = 0
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id[i])
      if (i % 2 !== 0) {
        digit *= 2
        if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10)
      }
      sum += digit
    }
    return sum % 10 === 0
  }

  // פונקציית ולידציה לאימייל
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/
    return emailRegex.test(email) && email.length <= 254
  }

  // פונקציית ולידציה לשם
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  // פונקציית ולידציה לטלפון ישראלי
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length === 10 && /^0[2-9]\d{8}$/.test(cleanPhone)
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // חישובים פיננסיים
  const currentAge = data.currentAge || 35
  const retirementAge = data.retirementAge || 60
  const monthlyIncome = data.monthlyIncome || 15000
  const monthlyExpenses = data.monthlyExpenses || 12000
  const currentSavings = data.currentSavings || 100000
  const yearsToRetirement = Math.max(1, retirementAge - currentAge)
  
  // קבועים לחישוב
  const ANNUAL_RETURN = 0.05 // תשואה שנתית ריאלית 5%
  const MONTHLY_RETURN = ANNUAL_RETURN / 12
  const INFLATION_RATE = 0.025 // אינפלציה שנתית 2.5%
  const WITHDRAWAL_RATE = 0.04 // שיעור משיכה שנתי 4% (כלל 4%)
  const LIFE_EXPECTANCY = 90 // תוחלת חיים
  
  // חישוב חיסכון חודשי
  const monthlySavings = Math.max(0, monthlyIncome - monthlyExpenses)
  
  // חישוב הון צפוי בפרישה
  // 1. ערך עתידי של חיסכון קיים
  const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + ANNUAL_RETURN, yearsToRetirement)
  
  // 2. ערך עתידי של חיסכון חודשי (FV של אנונה רגילה)
  const futureValueOfMonthlySavings = monthlySavings * 
    ((Math.pow(1 + MONTHLY_RETURN, yearsToRetirement * 12) - 1) / MONTHLY_RETURN)
  
  // סך הכל הון צפוי
  const expectedCapital = futureValueOfCurrentSavings + futureValueOfMonthlySavings
  
  // חישוב קצבה חודשית צפויה (כלל 4% - 4% מההון בשנה, מחולק ל-12 חודשים)
  const expectedMonthlyPension = (expectedCapital * WITHDRAWAL_RATE) / 12
  
  // חישוב הוצאות חודשיות צפויות בפרישה (מותאם לאינפלציה)
  const targetMonthlyPension = monthlyExpenses * Math.pow(1 + INFLATION_RATE, yearsToRetirement)
  
  // האם המסלול בטוח
  const isOnTrack = expectedMonthlyPension >= targetMonthlyPension

  // אחוז ביטחון פנסיוני (לשימוש בגרף)
  const confidenceScore = isOnTrack ? 92 : 64
  const strokeDasharray = 2 * Math.PI * 84 // r=84
  const strokeDashoffset = strokeDasharray * (1 - confidenceScore / 100)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNameError('')
    setEmailError('')
    setPhoneError('')
    setIdError('')
    setTermsError('')
    setPensionClearinghouseError('')
    let hasError = false
    
    // ולידציה לשם
    if (!validateName(formData.name)) {
      setNameError('נא להזין שם מלא (לפחות 2 תווים)')
      hasError = true
    }
    
    // ולידציה לאימייל
    if (!validateEmail(formData.email)) {
      setEmailError('כתובת המייל נראית לא תקינה, אנא בדקו שהזנתם אותה נכון (למשל name@example.com)')
      hasError = true
    }
    
    // ולידציה לטלפון
    if (!validatePhone(formData.phone)) {
      setPhoneError('מספר הטלפון אינו תקין. נא להזין 10 ספרות (למשל 0501234567)')
      hasError = true
    }
    
    // ולידציה לתעודת זהות
    if (!validateIsraeliID(formData.idNumber)) {
      setIdError('מספר תעודת הזהות אינו תקין. וודאו שהזנתם 9 ספרות כולל ספרת ביקורת.')
      hasError = true
    }
    
    // ולידציה לאישור תנאי שימוש
    if (!formData.termsAccepted) {
      setTermsError('יש לאשר את תנאי השימוש כדי להמשיך')
      hasError = true
    }
    
    // ולידציה לאישור פניה למסלקה
    if (!formData.pensionClearinghouseContact) {
      setPensionClearinghouseError('יש לאשר את הפניה למסלקה הפנסיונית כדי להמשיך')
      hasError = true
    }
    
    if (!hasError) {
      // Prepare all data for submission
      const submissionData = {
        ...formData,
        currentAge: data.currentAge,
        retirementAge: data.retirementAge,
        monthlyIncome: data.monthlyIncome,
        monthlyExpenses: data.monthlyExpenses,
        currentSavings: data.currentSavings,
        simulationResult: {
          confidenceScore,
          expectedMonthlyPension,
          expectedCapital,
          isOnTrack,
          targetMonthlyPension,
        },
      }

      // Submit to API
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        })

        const result = await response.json()

        if (!response.ok) {
          console.error('Submission error:', result.error)
          alert(`שגיאה בשליחת הטופס: ${result.error || 'שגיאה לא ידועה'}`)
          return
        }

        setIsSubmitted(true)
        useLeadStore.getState().setData({ ...formData })
      } catch (error) {
        console.error('Network error:', error)
        alert('שגיאה בחיבור לשרת. אנא נסה שוב.')
      }
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#DDDDDD] font-display text-[#0d141b] overflow-x-hidden pb-12">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-8 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-start">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] gap-8">
            
            {/* Header */}
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 px-4 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center gap-2">
                    <Link
                      className="text-slate-400 text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-widest"
                      href={`/step/${num}`}
                    >
                      שלב {num}
                    </Link>
                    <span className="text-slate-300 text-[10px]">/</span>
                  </div>
                ))}
                <span className="text-primary text-[10px] font-black uppercase tracking-widest">
                  תוצאות
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                הסימולציה הושלמה
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                התוכנית שלך ל<span className="text-primary">פרישה בטוחה</span>
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Results & Circle */}
              <div className="lg:col-span-7 space-y-6">
                <motion.div 
                  className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-6 md:p-10 space-y-10">
                    {/* FIXED Pie Chart Container */}
                    <div className="relative flex flex-col items-center py-4">
                      <div className="w-64 h-64 flex items-center justify-center relative">
                        {/* Background Track */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle
                            cx="128"
                            cy="128"
                            r="88"
                            fill="transparent"
                            stroke="#f8fafc"
                            strokeWidth="8"
                          />
                          {/* Progress Circle */}
                          <motion.circle
                            cx="128"
                            cy="128"
                            r="88"
                            fill="transparent"
                            stroke={isOnTrack ? '#10b981' : '#6366f1'}
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 88}
                            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - confidenceScore / 100) }}
                            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        <div className="text-center z-10">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                          >
                            <span className="block text-4xl md:text-5xl font-black text-slate-900 tabular-nums tracking-tighter">
                              {confidenceScore}%
                            </span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mt-1 mr-1">
                              ביטחון פנסיוני
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      <div className="mt-10 text-center space-y-2">
                        <h3 className={`text-xl font-black tracking-tight ${isOnTrack ? 'text-emerald-600' : 'text-indigo-600'}`}>
                          {isOnTrack ? 'המסלול שלך בטוח' : 'פוטנציאל לשיפור משמעותי'}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-500">הון משוער בפרישה:</span>
                          <span className="text-sm font-black text-slate-900">{formatCurrency(expectedCapital)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 border-t border-slate-50">
                      <StatTooltip text="גיל הפרישה בישראל הוא 67 לגברים ו־65 לנשים. גם אם בוחרים לפרוש מוקדם יותר, נכון לבסס יציבות כלכלית מבלי למשוך את כספי הפנסיה.">
                        <div className="p-4 md:p-6 bg-slate-50 rounded-2xl text-center cursor-help transition-colors hover:bg-slate-100 group">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">גיל פרישה</p>
                          <p className="text-2xl md:text-3xl font-black text-slate-900">{retirementAge}</p>
                        </div>
                      </StatTooltip>
                      <StatTooltip text="קצבה חודשית צפויה בגיל פרישה, על סמך הנתונים הקיימים.">
                        <div className="p-4 md:p-6 bg-slate-50 rounded-2xl text-center cursor-help transition-colors hover:bg-slate-100 group">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">קצבה חודשית</p>
                          <p className="text-2xl md:text-3xl font-black text-slate-900">{formatCurrency(expectedMonthlyPension)}</p>
                        </div>
                      </StatTooltip>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Lead Form */}
              <div className="lg:col-span-5">
                <motion.div 
                  className="bg-white rounded-[32px] shadow-2xl p-8 border-2 border-[#E7FE55] relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="absolute -top-4 -right-4 bg-[#E7FE55] text-[#0d141b] text-[10px] font-black px-4 py-2 rounded-full shadow-xl transform rotate-3 z-20 uppercase tracking-widest">
                    מומלץ ביותר
                  </div>

                  <div className="space-y-6">
                    <div className="text-right">
                      <h2 className="text-2xl font-black text-[#0d141b]">קבל/י את הדוח המלא</h2>
                      <p className="text-slate-500 text-sm mt-1">השאר/י פרטים וניצור קשר לתיאום שליחת התוכנית</p>
                    </div>

                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                          {[
                            { id: 'name', label: 'שם מלא', type: 'text', placeholder: 'שם מלא' },
                            { id: 'email', label: 'כתובת אימייל', type: 'email', placeholder: 'name@example.com' },
                            { id: 'phone', label: 'מספר טלפון', type: 'tel', placeholder: '0501234567' },
                            { id: 'idNumber', label: 'תעודת זהות', type: 'text', placeholder: '123456789' },
                            { id: 'idIssueDate', label: 'תאריך הנפקה (אופציונלי)', type: 'text', placeholder: 'DD/MM/YYYY' }
                          ].map((field) => (
                            <div key={field.id} className="space-y-1">
                              <div className="relative">
                                <input
                                  id={field.id}
                                  type={field.type}
                                  placeholder={field.placeholder || field.label}
                                  aria-invalid={
                                    (field.id === 'name' && !!nameError) ||
                                    (field.id === 'email' && !!emailError) ||
                                    (field.id === 'phone' && !!phoneError) ||
                                    (field.id === 'idNumber' && !!idError)
                                  }
                                  aria-describedby={field.id + "-error"}
                                  className={`w-full bg-slate-50 border rounded-xl p-4 text-sm focus:ring-2 outline-none transition-all ${
                                    (field.id === 'name' && nameError) ||
                                    (field.id === 'email' && emailError) ||
                                    (field.id === 'phone' && phoneError) ||
                                    (field.id === 'idNumber' && idError)
                                      ? 'border-red-300 focus:ring-red-100' 
                                      : 'border-slate-100 focus:ring-[#E7FE55]/30'
                                  }`}
                                  value={(formData as any)[field.id]}
                                  onChange={(e) => {
                                    let val = e.target.value
                                    
                                    // פורמט לתעודת זהות - רק ספרות, עד 9
                                    if (field.id === 'idNumber') {
                                      val = val.replace(/\D/g, '').slice(0, 9)
                                    }
                                    
                                    // פורמט לטלפון - רק ספרות, עד 10
                                    if (field.id === 'phone') {
                                      val = val.replace(/\D/g, '').slice(0, 10)
                                    }
                                    
                                    // פורמט לתאריך הנפקה
                                    if (field.id === 'idIssueDate') {
                                      val = val.replace(/\D/g, '')
                                      if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2)
                                      if (val.length >= 5) val = val.slice(0, 5) + '/' + val.slice(5, 9)
                                    }
                                    
                                    setFormData({...formData, [field.id]: val})
                                    
                                    // ניקוי שגיאות בעת שינוי
                                    if (field.id === 'name') setNameError('')
                                    if (field.id === 'email') setEmailError('')
                                    if (field.id === 'phone') setPhoneError('')
                                    if (field.id === 'idNumber') setIdError('')
                                  }}
                                  required={field.id !== 'idIssueDate'}
                                />
                                {((field.id === 'name' && nameError) ||
                                  (field.id === 'email' && emailError) ||
                                  (field.id === 'phone' && phoneError) ||
                                  (field.id === 'idNumber' && idError)) && (
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                  </div>
                                )}
                              </div>
                              
                              <AnimatePresence mode="wait">
                                {field.id === 'name' && nameError && (
                                  <motion.p
                                    id="name-error"
                                    role="alert"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                  >
                                    {nameError}
                                  </motion.p>
                                )}
                                {field.id === 'email' && emailError && (
                                  <motion.p
                                    id="email-error"
                                    role="alert"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                  >
                                    {emailError}
                                  </motion.p>
                                )}
                                {field.id === 'phone' && phoneError && (
                                  <motion.p
                                    id="phone-error"
                                    role="alert"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                  >
                                    {phoneError}
                                  </motion.p>
                                )}
                                {field.id === 'idNumber' && idError && (
                                  <motion.p
                                    id="idNumber-error"
                                    role="alert"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                  >
                                    {idError}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="relative">
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex-shrink-0 mt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => {
                                      setFormData({...formData, termsAccepted: e.target.checked})
                                      if (e.target.checked) setTermsError('')
                                    }}
                                    className={`w-5 h-5 rounded border-2 transition-all appearance-none focus:ring-2 focus:ring-[#E7FE55]/30 outline-none ${
                                      termsError 
                                        ? 'border-red-300' 
                                        : 'border-slate-200 group-hover:border-slate-300'
                                    } ${
                                      formData.termsAccepted 
                                        ? 'bg-[#E7FE55] border-[#E7FE55]' 
                                        : 'bg-white'
                                    }`}
                                    required
                                  />
                                  {formData.termsAccepted && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute inset-0 w-5 h-5 pointer-events-none"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="#0d141b"
                                      strokeWidth={3}
                                    >
                                      <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.2 }}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </motion.svg>
                                  )}
                                </div>
                                <span className={`text-sm flex-1 text-right ${
                                  termsError ? 'text-red-500' : 'text-slate-700'
                                }`}>
                                  אני מאשר/ת את תנאי השימוש
                                </span>
                              </label>
                            </div>
                            <AnimatePresence mode="wait">
                              {termsError && (
                                <motion.p
                                  id="terms-error"
                                  role="alert"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                >
                                  {termsError}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="space-y-1">
                            <div className="relative">
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex-shrink-0 mt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={formData.pensionClearinghouseContact}
                                    onChange={(e) => {
                                      setFormData({...formData, pensionClearinghouseContact: e.target.checked})
                                      if (e.target.checked) setPensionClearinghouseError('')
                                    }}
                                    className={`w-5 h-5 rounded border-2 transition-all appearance-none focus:ring-2 focus:ring-[#E7FE55]/30 outline-none ${
                                      pensionClearinghouseError 
                                        ? 'border-red-300' 
                                        : 'border-slate-200 group-hover:border-slate-300'
                                    } ${
                                      formData.pensionClearinghouseContact 
                                        ? 'bg-[#E7FE55] border-[#E7FE55]' 
                                        : 'bg-white'
                                    }`}
                                    required
                                  />
                                  {formData.pensionClearinghouseContact && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute inset-0 w-5 h-5 pointer-events-none"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="#0d141b"
                                      strokeWidth={3}
                                    >
                                      <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.2 }}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </motion.svg>
                                  )}
                                </div>
                                <span className={`text-sm flex-1 text-right ${
                                  pensionClearinghouseError ? 'text-red-500' : 'text-slate-700'
                                }`}>
                                  אני מאשר/ת פניה למסלקה הפנסיונית
                                </span>
                              </label>
                            </div>
                            <AnimatePresence mode="wait">
                              {pensionClearinghouseError && (
                                <motion.p
                                  id="pensionClearinghouse-error"
                                  role="alert"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1 pr-1"
                                >
                                  {pensionClearinghouseError}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full bg-[#E7FE55] hover:bg-[#d9f030] text-[#0d141b] font-black py-5 rounded-2xl shadow-xl shadow-[#E7FE55]/20 transition-all flex items-center justify-center gap-2 group"
                        >
                          <span>קבל/י את התוכנית עכשיו</span>
                          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        </motion.button>
                      </form>
                    ) : (
                      <div className="text-center py-12 space-y-4">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                          <span className="material-symbols-outlined text-4xl">check</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">הפרטים התקבלו!</h3>
                        <p className="text-slate-500 text-sm">נציג יחזור אליך תוך 24 שעות.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
