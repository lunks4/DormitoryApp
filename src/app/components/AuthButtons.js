'use client'
import Link from 'next/link'

export default function AuthButtons({ onLogin }) {
  return (
    <div className="flex space-x-2">
      <Link 
        href="/login" 
        className="px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium"
        onClick={onLogin}
      >
        Войти
      </Link>
      <Link 
        href="/register" 
        className="px-3 py-1 bg-blue-700 text-white rounded text-sm font-medium"
      >
        Регистрация
      </Link>
    </div>
  )
}