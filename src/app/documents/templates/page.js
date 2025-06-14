'use client'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function TemplatesPage() {
  return (
    <div>
      {/* Шапка как на главной */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/documents" className="text-2xl">
          <FiArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Шаблоны документов</h1>
        <div className="w-8"></div> {/* Для выравнивания */}
      </header>

      {/* Контент */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">Заявление на гостевой режим</h3>
            <p className="text-sm text-gray-500 mt-1">DOCX · 45 KB</p>
            <button className="mt-2 text-blue-600 text-sm">Скачать</button>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">Заявление на поселение</h3>
            <p className="text-sm text-gray-500 mt-1">DOCX · 52 KB</p>
            <button className="mt-2 text-blue-600 text-sm">Скачать</button>
          </div>
        </div>
      </div>
    </div>
  )
}