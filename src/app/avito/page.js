'use client'
import Header from '../components/Header'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { avitoAds } from '../lib/avitoData'

export default function AvitoPage() {
  const recentAds = avitoAds.getRecent(5)

  return (
    <div className="min-h-screen">
      <Header 
        title="Авитостан" 
        showBackButton={true}
      />

      <main className="p-4 pb-20">
        <div className="flex space-x-2 mb-6">
          <Link 
            href="/avito/give" 
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg text-center font-medium"
          >
            Отдам
          </Link>
          <Link 
            href="/avito/take" 
            className="flex-1 bg-green-500 text-white py-3 rounded-lg text-center font-medium"
          >
            Возьму
          </Link>
          <Link 
            href="/avito/lost" 
            className="flex-1 bg-yellow-500 text-white py-3 rounded-lg text-center font-medium"
          >
            Потеряшки
          </Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Последние объявления</h2>
          <Link 
            href="/avito/new" 
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <FiPlus size={20} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentAds.map(ad => (
            <Link 
              key={ad.id} 
              href={`/avito/${ad.id}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{ad.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  ad.type === 'give' ? 'bg-blue-100 text-blue-800' :
                  ad.type === 'take' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {ad.type === 'give' ? 'Отдам' : ad.type === 'take' ? 'Возьму' : 'Потеряшка'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{ad.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">{ad.contact}</span>
                <span className="text-xs text-gray-400">{ad.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}