'use client'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import NewsItem from '../components/NewsItem'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const news = [
    {
      id: 1,
      title: 'Отключение горячей воды',
      content: '15 июня с 9:00 до 17:00 будет отключена горячая вода в связи с плановыми работами.',
      date: '2025-06-10',
      source: 'Администрация',
      startDate: '2025-06-15T09:00:00',
      endDate: '2025-06-15T17:00:00'
    },
    {
      id: 2,
      title: 'Собрание жильцов',
      content: '17 июня в 19:00 состоится общее собрание жильцов общежития в холле 1 этажа.',
      date: '2025-06-08',
      source: 'Совет общежития',
      startDate: '2025-06-17T19:00:00',
      endDate: '2025-06-17T20:30:00'
    },
    {
      id: 3,
      title: 'Ремонт лифтов',
      content: 'С 20 по 25 июня будет проводиться плановый ремонт лифтов. Просим учитывать это при планировании времени.',
      date: '2025-06-05',
      source: 'Техническая служба',
      startDate: '2025-06-20T00:00:00',
      endDate: '2025-06-25T00:00:00'
    }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Общежитие" 
        onMenuClick={toggleMenu} 
        showBackButton={false}
      />
      
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <main className="p-4 pb-20">
        <h1 className="text-2xl font-bold mb-6">Последние новости</h1>
        
        <div className="space-y-4">
          {news.map(item => (
            <NewsItem 
              key={item.id}
              title={item.title}
              content={item.content}
              date={item.date}
              source={item.source}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          ))}
        </div>
      </main>
    </div>
  )
}