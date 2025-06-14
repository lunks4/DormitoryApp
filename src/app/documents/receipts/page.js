'use client'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function ReceiptsPage() {
  return (
    <div>
      {/* Шапка как на главной */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/documents" className="text-2xl">
          <FiArrowLeft />
        </Link>
        <h1 className="text-xl font-bold">Квитанции для оплаты</h1>
        <div className="w-8"></div> {/* Для выравнивания */}
      </header>

      {/* Контент */}
      <div className="p-4">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="mb-4 font-medium">Квитанция за июнь 2023</p>
          <div className="mx-auto w-48 h-48 bg-gray-100 flex items-center justify-center mb-4">
            {/* Замените на реальный QR-код */}
            <span className="text-gray-500">QR-код</span>
          </div>
          <p className="text-gray-700 mb-2">Сумма: 2 500 руб.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Оплатить
          </button>
        </div>
      </div>
    </div>
  )
}