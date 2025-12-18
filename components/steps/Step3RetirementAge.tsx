'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLeadStore } from '@/lib/store'

export default function Step3RetirementAge() {
  const router = useRouter()
  const { data, setData } = useLeadStore()
  const [selectedAge, setSelectedAge] = useState<number | null>(data.retirementAge || null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const retirementOptions = [
    { 
      age: 55, 
      label: 'פרישה מוקדמת', 
      tag: 'חלום',
      icon: 'forest',
      description: 'חופש כלכלי בשיא הכוח' 
    },
    { 
      age: 60, 
      label: 'מסלול שאפתני', 
      tag: 'פופולרי',
      icon: 'rocket_launch',
      description: 'לפני גיל הפרישה הממוצע' 
    },
    { 
      age: 67, 
      label: 'גיל פרישה רשמי', 
      tag: 'בטוח',
      icon: 'account_balance',
      description: 'יציבות וביטחון פנסיוני מלא' 
    },
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
    <div className="relative flex min-h-screen w-full flex-col bg-[#DDDDDD] font-display text-[#0d141b] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-12 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <motion.div 
            className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl p-10 border border-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[28%] transition-all duration-500"></div>
            </div>

            <div className="space-y-10 text-center">
              <div className="space-y-3">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 2 מתוך 7</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">באיזה גיל תרצה לפרוש?</h1>
                <p className="text-slate-500 text-sm">המטרה שלך קובעת את אסטרטגיית החיסכון הנדרשת</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                {retirementOptions.map((option) => (
                  <button
                    key={option.age}
                    onClick={() => handleAgeSelect(option.age)}
                    className={`relative flex flex-col items-center p-8 rounded-[24px] transition-all duration-500 border-2 ${
                      selectedAge === option.age
                        ? 'bg-[#0d141b] border-[#0d141b] text-white shadow-2xl scale-105 z-10'
                        : 'bg-white border-slate-100 text-[#0d141b] hover:border-primary/20 hover:bg-slate-50'
                    }`}
                  >
                    {option.tag === 'פופולרי' && selectedAge !== option.age && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/10">
                        {option.tag}
                      </span>
                    )}
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                      selectedAge === option.age ? 'bg-[#E7FE55] text-[#0d141b]' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <span className="material-symbols-outlined text-2xl">{option.icon}</span>
                    </div>

                    <div className="space-y-1 mb-4">
                      <span className="text-5xl font-black tabular-nums block">{option.age}</span>
                      <span className={`text-[10px] font-black uppercase tracking-[0.15em] block ${
                        selectedAge === option.age ? 'text-[#E7FE55]' : 'text-primary'
                      }`}>
                        {option.label}
                      </span>
                    </div>

                    <p className={`text-[11px] font-medium leading-relaxed max-w-[120px] mx-auto ${
                      selectedAge === option.age ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {option.description}
                    </p>

                    {selectedAge === option.age && (
                      <motion.div 
                        layoutId="active-tick"
                        className="mt-6 w-6 h-6 bg-[#E7FE55] rounded-full flex items-center justify-center text-[#0d141b]"
                      >
                        <span className="material-symbols-outlined text-sm font-black">check</span>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <motion.button
                onClick={handleContinue}
                disabled={!selectedAge}
                whileHover={selectedAge ? { scale: 1.02 } : {}}
                whileTap={selectedAge ? { scale: 0.98 } : {}}
                className={`w-full font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group ${
                  selectedAge 
                    ? 'bg-[#0d141b] text-white hover:bg-slate-800 shadow-slate-200' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <span>המשך לשלב הבא</span>
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
