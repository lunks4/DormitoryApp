'use client'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { FiMessageSquare, FiPhone } from 'react-icons/fi'
import { avitoAds } from '../../lib/avitoData'
import SimilarAds from '../../components/SimilarAds'

export default function AdPage({ params }) {
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитация асинхронной загрузки
    const loadAd = async () => {
      try {
        const adData = avitoAds.getById(params.id)
        setAd(adData)
      } catch (error) {
        console.error('Error loading ad:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadAd()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header title="Загрузка..." showBackButton={true} />
        <div className="p-4">Загрузка объявления...</div>
      </div>
    )
  }

  if (!ad) {
    return (
      <div className="min-h-screen">
        <Header title="Объявление не найдено" showBackButton={true} />
        <main className="p-4">
          <p>Объявление не существует или было удалено</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={`Авитостан - ${ad.type === 'give' ? 'Отдам' : ad.type === 'take' ? 'Возьму' : 'Потеряшка'}`} 
        showBackButton={true}
      />

      <main className="p-4 pb-20">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-100 h-48 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-xl font-bold">{ad.title}</h1>
              <span className={`text-xs px-2 py-1 rounded ${
                ad.type === 'give' ? 'bg-blue-100 text-blue-800' :
                ad.type === 'take' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {ad.type === 'give' ? 'Отдам' : ad.type === 'take' ? 'Возьму' : 'Потеряшка'}
              </span>
            </div>

            <p className="text-gray-700 mb-4 whitespace-pre-line">{ad.description}</p>

            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <span>{ad.contact}</span>
              <span>{ad.date}</span>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="mr-2" />
                Написать
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center">
                <FiPhone className="mr-2" />
                Позвонить
              </button>
            </div>
          </div>
        </div>

        <SimilarAds currentAdId={ad.id} type={ad.type} />
      </main>
    </div>
  )
}