'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen 
      bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-slate-900 dark:to-slate-800 
      text-gray-800 dark:text-white">

      <div className="text-center p-10 rounded-2xl 
        bg-white dark:bg-white/5 
        backdrop-blur-lg shadow-xl">

        <h1 className="text-7xl font-bold text-blue-500 dark:text-sky-400">
          404
        </h1>

        <h2 className="text-2xl mt-2">Page introuvable</h2>

        <p className="text-gray-500 dark:text-slate-300 mt-2 mb-6">
          Oups... la page que tu cherches n'existe pas ou a été déplacée.
        </p>

        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-lg 
            bg-blue-500 text-white 
            hover:bg-blue-600 
            dark:bg-sky-400 dark:text-slate-900 dark:hover:bg-sky-300 
            transition"
        >
          ← Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}