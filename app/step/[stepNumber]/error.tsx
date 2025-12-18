'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function StepError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Step error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          שגיאה בטעינת השלב
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          אירעה שגיאה בטעינת השלב. אנא נסה שוב או חזור לשלב הקודם.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            נסה שוב
          </button>
          <Link
            href="/step/1"
            className="rounded-lg border-2 border-slate-300 dark:border-slate-600 px-6 py-3 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            חזור להתחלה
          </Link>
        </div>
      </div>
    </div>
  )
}


