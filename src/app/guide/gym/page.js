'use client'
import Link from 'next/link'
import Header from '../../components/Header'

export default function GymPage() {
  return (
    <div className="min-h-screen">
      <Header 
        title="Спортзал" 
        onMenuClick={() => {}} 
        showBackButton={true}
      />
      
      <main className="p-4 pb-20">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Спортзал</h2>
          <p className="mb-4">Местоположение: цокольный этаж, левое крыло</p>
          <p className="mb-4">Время работы: Пн-Пт с 7:00 до 23:00, Сб-Вс с 9:00 до 21:00</p>
          <p>В спортзале доступно:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Тренажеры для силовых тренировок</li>
            <li>Беговая дорожка и велотренажеры</li>
            <li>Гантели и штанги</li>
            <li>Раздевалки с душевыми</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">* Для доступа необходим пропуск в спортзал</p>
        </div>
      </main>
    </div>
  )
}