'use client'
import Link from 'next/link'
import Header from '../../components/Header'

export default function StudyRoomPage() {
  return (
    <div className="min-h-screen">
      <Header 
        title="Учебная комната" 
        onMenuClick={() => {}} 
        showBackButton={true}
      />
      
      <main className="p-4 pb-20">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Учебная комната</h2>
          <p className="mb-4">Местоположение: 1 этаж, рядом с администрацией</p>
          <p className="mb-4">Время работы: ежедневно с 8:00 до 22:00</p>
          <p>В учебной комнате есть:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>10 рабочих мест</li>
            <li>Бесплатный Wi-Fi</li>
            <li>Розетки для зарядки устройств</li>
            <li>Доска для заметок</li>
          </ul>
        </div>
      </main>
    </div>
  )
}