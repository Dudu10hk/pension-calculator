'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
          <div className="max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              משהו השתבש!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              אירעה שגיאה בטעינת הדף. אנא נסה שוב.
            </p>
            <button
              onClick={() => reset()}
              className="rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              נסה שוב
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

