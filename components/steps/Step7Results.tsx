'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-4 bg-[#0d141b] text-white text-[11px] leading-relaxed rounded-2xl shadow-2xl z-50 text-right border border-white/10 backdrop-blur-md"
          >
            <div className="relative z-10 font-medium">
              <span className="text-[#E7FE55] font-black block mb-1">מידע חשוב:</span>
              {text}
            </div>
            {/* Triangle Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-x-[8px] border-x-transparent border-t-[8px] border-t-[#0d141b]"></div>
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
  const [idError, setIdError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    idIssueDate: '',
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
  
  // לוגיקת חישוב
  const targetMonthlyPension = monthlyExpenses * Math.pow(1.03, yearsToRetirement)
  const expectedCapital = (currentSavings * Math.pow(1.06, yearsToRetirement)) + 
    ((monthlyIncome - monthlyExpenses) * ((Math.pow(1 + 0.06/12, yearsToRetirement * 12) - 1) / (0.06/12)))
  const expectedMonthlyPension = (expectedCapital * 0.04) / 12
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIdError('')
    setEmailError('')
    let hasError = false
    if (!validateEmail(formData.email)) {
      setEmailError('כתובת אימייל לא תקינה')
      hasError = true
    }
    if (!validateIsraeliID(formData.idNumber)) {
      setIdError('תעודת זהות לא תקינה')
      hasError = true
    }
    if (!hasError) {
      setIsSubmitted(true)
      useLeadStore.getState().updateData(formData)
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                הסימולציה הושלמה
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
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
                  <div className="p-10 space-y-10">
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
                            <span className="block text-5xl font-black text-slate-900 tabular-nums tracking-tighter">
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
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                      <StatTooltip text="גיל הפרישה בישראל הוא 67 לגברים ו־65 לנשים. גם אם בוחרים לפרוש מוקדם יותר, נכון לבסס יציבות כלכלית מבלי למשוך את כספי הפנסיה.">
                        <div className="p-6 bg-slate-50 rounded-2xl text-center cursor-help transition-colors hover:bg-slate-100 group">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">גיל פרישה</p>
                          <p className="text-3xl font-black text-slate-900">{retirementAge}</p>
                        </div>
                      </StatTooltip>
                      <div className="p-6 bg-slate-50 rounded-2xl text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">קצבה חודשית</p>
                        <p className="text-3xl font-black text-slate-900">{formatCurrency(expectedMonthlyPension)}</p>
                      </div>
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
                      <h2 className="text-2xl font-black text-slate-900">קבל/י את הדוח המלא</h2>
                      <p className="text-slate-500 text-sm mt-1">השאר/י פרטים וניצור קשר לתיאום שליחת התוכנית</p>
                    </div>

                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                          {['name', 'email', 'phone', 'idNumber', 'idIssueDate'].map((field) => (
                            <div key={field} className="space-y-1">
                              <input
                                type={field === 'email' ? 'email' : 'text'}
                                placeholder={
                                  field === 'name' ? 'שם מלא' :
                                  field === 'email' ? 'כתובת אימייל' :
                                  field === 'phone' ? 'מספר טלפון' :
                                  field === 'idNumber' ? 'תעודת זהות (9 ספרות)' :
                                  'תאריך הנפקה (DD/MM/YYYY)'
                                }
                                className={`w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#E7FE55]/30 outline-none transition-all ${
                                  (field === 'email' && emailError) || (field === 'idNumber' && idError) ? 'border-red-500' : ''
                                }`}
                                value={(formData as any)[field]}
                                onChange={(e) => {
                                  let val = e.target.value
                                  if (field === 'idNumber') val = val.replace(/\D/g, '').slice(0, 9)
                                  if (field === 'idIssueDate') {
                                    val = val.replace(/\D/g, '')
                                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2)
                                    if (val.length >= 5) val = val.slice(0, 5) + '/' + val.slice(5, 9)
                                  }
                                  setFormData({...formData, [field]: val})
                                }}
                                required
                              />
                            </div>
                          ))}
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
