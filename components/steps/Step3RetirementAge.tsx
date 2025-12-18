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
    { age: 55, label: 'חלום 🌴', description: 'פרישה מוקדמת מאוד' },
    { age: 60, label: 'שאפתני 🎯', description: 'לפני הגיל הממוצע' },
    { age: 67, label: 'ריאליסטי ⚡️', description: 'גיל הפרישה הרשמי' },
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
            className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-10 border border-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <div className="bg-[#E7FE55] h-full w-[28%] transition-all duration-500"></div>
            </div>

            <div className="space-y-8 text-center">
              <div className="space-y-3">
                <p className="text-[#E7FE55] bg-[#0d141b] inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">שלב 2 מתוך 7</p>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">באיזה גיל תרצה לפרוש?</h1>
                <p className="text-slate-500 text-sm">המטרה שלך קובעת את אסטרטגיית החיסכון הנדרשת</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
                {retirementOptions.map((option) => (
                  <button
                    key={option.age}
                    onClick={() => handleAgeSelect(option.age)}
                    className={`relative flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-300 ${
                      selectedAge === option.age
                        ? 'bg-[#0d141b] text-white shadow-2xl scale-105'
                        : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-4xl font-black mb-1">{option.age}</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${selectedAge === option.age ? 'text-[#E7FE55]' : 'text-primary'}`}>
                      {option.label}
                    </span>
                    <p className={`text-[10px] mt-2 opacity-60`}>{option.description}</p>
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
                    ? 'bg-[#0d141b] text-white hover:bg-slate-800' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
