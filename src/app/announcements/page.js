'use client'
import { useState } from 'react'
import Header from '../components/Header'
import NewsItem from '../components/NewsItem'
import { FiMenu } from 'react-icons/fi'

export default function AnnouncementsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const announcements = [
    {
      id: 1,
      title: 'Проверка пожарной безопасности',
      content: '20 июня пройдет плановая проверка пожарной безопасности. Просьба обеспечить доступ в комнаты.',
      author: 'Администрация',
      date: '2023-06-12'
    },
    {
      id: 2,
      title: 'Ищу соседа',
      content: 'Студент 2 курса ищет соседа в комнату 305. Звонить после 18:00.',
      author: 'Иван Петров',
      date: '2023-06-11'
    },
    {
      id: 3,
      title: 'Уборка территории',
      content: '18 июня в 10:00 состоится субботник. Участие всех жильцов обязательно.',
      author: 'Комендант',
      date: '2023-06-09'
    },
    {
      id: 4,
      title: 'Замена ламп в коридорах',
      content: 'Сегодня с 14:00 до 16:00 будет проводиться замена ламп освещения на 3 этаже.',
      author: 'Электрик',
      date: '2023-06-15'
    }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Объявления" 
        onMenuClick={toggleMenu}
        showBackButton={true}
      />

      <main className="p-4 pb-20">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Последние объявления</h1>
          
        </div>
        
        <div className="space-y-4">
          {announcements.map(item => (
            <NewsItem 
              key={item.id}
              title={item.title}
              content={item.content}
              date={item.date}
              source={item.author}
              isAnnouncement={true}
            />
          ))}
        </div>
      </main>
    </div>
  )
}