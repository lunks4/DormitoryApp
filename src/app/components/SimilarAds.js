'use client'
import Link from 'next/link'
import { avitoAds  } from '../lib/avitoData'

export default function SimilarAds({ currentAdId, type }) {
  const similarAds = avitoAds.getAll()
    .filter(ad => ad.id !== currentAdId && ad.type === type)
    .slice(0, 3)

  if (similarAds.length === 0) return null

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold mb-2">Похожие объявления</h2>
      <div className="space-y-3">
        {similarAds.map(ad => (
          <Link 
            key={ad.id} 
            href={`/avito/${ad.id}`}
            className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">{ad.title}</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{ad.contact}</span>
              <span>{ad.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}