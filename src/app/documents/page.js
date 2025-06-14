'use client'
import Header from '../components/Header'
import Link from 'next/link'
import { FiFileText, FiArrowLeft } from 'react-icons/fi'

export default function DocumentsPage() {
  return (
    <div>
      <Header title="Документы" />
      
      <div className="p-4">
        <div className="flex flex-col space-y-3">
          <Link 
            href="/documents/templates" 
            className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <FiFileText className="mr-3 text-blue-500" />
              <span>Шаблоны документов</span>
            </div>
            <FiArrowLeft className="transform rotate-180 text-gray-400" />
          </Link>
          
          <Link 
            href="/documents/receipts" 
            className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center">
              <FiFileText className="mr-3 text-blue-500" />
              <span>Квитанции для оплаты</span>
            </div>
            <FiArrowLeft className="transform rotate-180 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  )
}