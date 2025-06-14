'use client'
import Header from '../../components/Header'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { avitoAds } from '../../lib/avitoData'

export default function GivePage() {
 const giveAds = avitoAds.getByType('give')
  return (
    <div className="min-h-screen">
      <Header 
        title="Авитостан - Отдам" 
        showBackButton={true}
      />

      <main className="p-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Вещи, которые отдают</h2>
          <Link 
            href="/avito/new?type=give" 
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <FiPlus size={20} />
          </Link>
        </div>

        <div className="space-y-3">
          {giveAds.map(ad => (
            <Link 
              key={ad.id} 
              href={`/avito/${ad.id}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{ad.title}</h3>
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