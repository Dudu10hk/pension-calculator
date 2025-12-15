'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Step1Marketing() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/step/2')
  }

  const handleSkip = () => {
    router.push('/step/2')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center items-center">
          <div className="layout-content-container flex flex-col w-full max-w-2xl flex-1 gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 justify-center">
              <span className="text-primary text-base font-medium leading-normal">
                שלב 1: דף שיווקי
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-base font-medium leading-normal">
                /
              </span>
              <Link
                className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal hover:text-primary transition-colors"
                href="/step/2"
              >
                שלב 2: פרטים אישיים
              </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-8 py-8">
              <div className="flex flex-col gap-6 text-center px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] text-[#0d141b] dark:text-white">
                  פרישה מוקדמת זה לא חלום! ✨
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                  גלו מתי תוכלו לפרוש ולחיות את החיים שאתם רוצים
                </p>
              </div>

              {/* Benefits/Features */}
              <div className="w-full max-w-lg px-4 mt-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                  <ul className="space-y-4 text-right">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        check_circle
                      </span>
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        חישוב מדויק של גיל הפרישה שלכם
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        check_circle
                      </span>
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        תכנון פיננסי מותאם אישית
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        check_circle
                      </span>
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        המלצות מקצועיות למימוש החלום
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg px-4 mt-4">
                <button
                  onClick={handleContinue}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                >
                  <span>בואו נתחיל</span>
                  <span className="material-symbols-outlined transform">
                    arrow_back
                  </span>
                </button>
                <button
                  onClick={handleSkip}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-transparent px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300/50 focus:ring-offset-2"
                >
                  <span>דלג</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

