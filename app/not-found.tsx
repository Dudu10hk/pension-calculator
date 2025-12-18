import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          404
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          הדף שביקשת לא נמצא
        </p>
        <Link
          href="/step/1"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          חזור לדף הבית
        </Link>
      </div>
    </div>
  )
}


