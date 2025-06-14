'use client'
import Header from '../../components/Header'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { avitoAds } from '../../lib/avitoData'

export default function LostPage() {
  const lostAds = avitoAds.getByType('lost')

  return (
    <div className="min-h-screen">
      <Header 
        title="Авитостан - Потеряшки" 
        showBackButton={true}
      />

      <main className="p-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Найденные вещи</h2>
          <Link 
            href="/avito/new?type=lost" 
            className="bg-yellow-500 text-white p-2 rounded-full"
            aria-label="Создать новое объявление"
          >
            <FiPlus size={20} />
          </Link>
        </div>

        {lostAds.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">Пока нет объявлений в этой категории</p>
            <Link 
              href="/avito/new?type=lost" 
              className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Сообщить о находке
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {lostAds.map(ad => (
              <Link 
                key={ad.id} 
                href={`/avito/${ad.id}`}
                className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{ad.title}</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Потеряшка
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{ad.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">Найдено: {ad.contact}</span>
                  <span className="text-xs text-gray-400">{ad.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}