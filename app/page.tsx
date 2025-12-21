'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { id: 'investments', label: 'השקעות', icon: 'trending_up', color: 'bg-blue-500/10 text-blue-600' },
    { id: 'pension', label: 'פנסיה', icon: 'account_balance', color: 'bg-purple-500/10 text-purple-600' },
    { id: 'retirement', label: 'פרישה', icon: 'self_improvement', color: 'bg-emerald-500/10 text-emerald-600' },
    { id: 'insurance', label: 'ביטוח', icon: 'shield', color: 'bg-orange-500/10 text-orange-600' },
    { id: 'taxes', label: 'מיסים', icon: 'receipt_long', color: 'bg-red-500/10 text-red-600' },
  ]

  const calculators = [
    {
      title: 'תכנון פרישה מוקדמת',
      description: 'סימולציה מתקדמת לבדיקת היתכנות לעצמאות כלכלית ופרישה לפני גיל 67.',
      link: '/step/1',
      icon: 'rocket_launch',
      featured: true
    },
    {
      title: 'מחשבון תשואה',
      description: 'כלי לחישוב ריבית דריבית ובדיקת צמיחת ההון לאורך זמן.',
      link: '#',
      icon: 'calculate',
      comingSoon: true
    },
    {
      title: 'בדיקת כפל ביטוח',
      description: 'ניתוח תיק ביטוחי למניעת תשלומים כפולים ומיותרים.',
      link: '#',
      icon: 'content_copy',
      comingSoon: true
    }
  ]

  const articles = [
    {
      title: '5 טעויות נפוצות בתכנון פרישה מוקדמת',
      category: 'פרישה',
      date: 'דצמבר 2025',
      image: 'https://images.unsplash.com/photo-1556742049-13ff7337990c?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'המדריך המלא להשקעות פסיביות בשוק ההון',
      category: 'השקעות',
      date: 'נובמבר 2025',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'איך לקרוא את הדו"ח השנתי של קרן הפנסיה',
      category: 'פנסיה',
      date: 'אוקטובר 2025',
      image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=600',
    }
  ]

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-display text-[#0d141b]">
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-[#E7FE55] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined font-black text-[#0d141b]">hub</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">FINANCE<span className="text-slate-400 font-light">HUB</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0d141b] transition-colors">בית</Link>
            <Link href="#calculators" className="text-sm font-semibold text-slate-600 hover:text-[#0d141b] transition-colors">מחשבונים</Link>
            <Link href="#articles" className="text-sm font-semibold text-slate-600 hover:text-[#0d141b] transition-colors">מאמרים</Link>
            <Link href="https://lilachinc.com/about/" className="text-sm font-semibold text-slate-600 hover:text-[#0d141b] transition-colors">אודות</Link>
          </nav>
          <Link 
            href="/step/1"
            className="bg-[#0d141b] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            סימולציה חינם
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 text-right space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7FE55] animate-pulse"></span>
                מרכז המידע והכלים הפיננסיים
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900">
                הדרך הבטוחה <br />
                לחופש <span className="text-[#0d141b] border-b-4 border-[#E7FE55]/60">כלכלי אמיתי</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
                אנחנו עוזרים לך לקבל החלטות פיננסיות מושכלות באמצעות כלים מתקדמים, מחשבונים מדויקים וידע מקצועי בגובה העיניים.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link 
                  href="/step/1"
                  className="bg-[#0d141b] text-white px-10 py-4.5 rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-3 group"
                >
                  <span>מחשבון פרישה מוקדמת</span>
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">rocket_launch</span>
                </Link>
                <Link 
                  href="#articles"
                  className="text-[#0d141b] px-8 py-4.5 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all border border-slate-200"
                >
                  למאמרים המקצועיים
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white p-3 rounded-[48px] shadow-2xl shadow-slate-300 relative z-20 overflow-hidden border border-slate-100">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                    alt="Financial Planning Workspace" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative Blur Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E7FE55]/10 rounded-full blur-[120px] -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Categories Strip */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${cat.color}`}>
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Section - More Refined */}
      <section id="calculators" className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">מחשבונים וכלים פיננסיים</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">כלי עזר מתקדמים שיעזרו לך לתכנן את העתיד הכלכלי שלך בצורה מדויקת ופשוטה.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {calculators.map((calc, i) => (
            <Link href={calc.link} key={i}>
              <motion.div 
                className={`h-full bg-white rounded-[40px] p-10 shadow-xl shadow-slate-100 border border-slate-100 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden ${calc.featured ? 'ring-2 ring-[#E7FE55]/50 shadow-[#E7FE55]/5' : 'hover:shadow-2xl hover:shadow-slate-200'}`}
                whileHover={{ y: -8 }}
              >
                {calc.comingSoon && (
                  <div className="absolute top-6 left-6 bg-slate-100 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    בקרוב
                  </div>
                )}
                <div className="space-y-6 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${calc.featured ? 'bg-[#0d141b] text-[#E7FE55]' : 'bg-slate-50 text-slate-400 group-hover:bg-[#0d141b] group-hover:text-white'}`}>
                    <span className="material-symbols-outlined text-2xl">{calc.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{calc.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{calc.description}</p>
                  </div>
                </div>
                <div className="pt-10 flex items-center gap-3 text-sm font-bold text-slate-900 group-hover:gap-5 transition-all">
                  <span>כניסה לכלי</span>
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles Section - Clean Design */}
      <section id="articles" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-3 text-right">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">מרכז הידע שלנו</h2>
              <p className="text-slate-500 font-medium">מאמרים מקצועיים, מדריכים וכתבות ממומחים.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 text-slate-900 font-bold text-sm group">
              <span className="border-b-2 border-transparent group-hover:border-[#0d141b] transition-all">לכל המאמרים</span>
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {articles.map((article, i) => (
              <motion.div 
                key={i} 
                className="group cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[4/3] rounded-[32px] overflow-hidden mb-8 shadow-2xl shadow-slate-200 relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                    {article.category}
                  </div>
                </div>
                <div className="space-y-4 text-right px-2">
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{article.date}</p>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d141b] border-b-2 border-transparent group-hover:border-[#E7FE55] inline-block pt-2 transition-all">
                    <span>קרא עוד</span>
                    <span className="material-symbols-outlined text-xs">arrow_back</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant & Soft */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="bg-[#0d141b] rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-slate-400">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E7FE55]/10 to-transparent"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              העתיד הכלכלי שלך <br className="hidden md:block" /> מתחיל בצעד אחד קטן.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              אלפי אנשים כבר גילו מתי הם יוכלו להפסיק לעבוד ולהתחיל לחיות. 
              הצטרף אליהם וקבל סימולציה אישית בחינם.
            </p>
            <div className="flex justify-center pt-6">
              <Link 
                href="/step/1"
                className="bg-[#E7FE55] text-[#0d141b] px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-black/20 hover:scale-105 transition-all"
              >
                בואו נתחיל בחישוב
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
