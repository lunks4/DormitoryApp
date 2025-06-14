'use client'
import Link from 'next/link'
import { FiBell, FiFileText, FiClock, FiShoppingBag, FiBook, FiTool } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

export default function SideMenu({ isOpen, onClose }) {
  const pathname = usePathname()
  
  const menuItems = [
    { path: '/', icon: <FiBell />, label: 'Новости' },
    { path: '/announcements', icon: <FiBell />, label: 'Объявления' },
    { path: '/documents', icon: <FiFileText />, label: 'Документы' },
    { path: '/laundry', icon: <FiClock />, label: 'Прачечная' },
    { path: '/avito', icon: <FiShoppingBag />, label: 'Авитостан' },
    { path: '/guide', icon: <FiBook />, label: 'Гайд' },
    { path: '/repair', icon: <FiTool />, label: 'Ремонт' }
  ]

  return (
    <>
      {/* Оверлей для закрытия */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}

      {/* Боковое меню с анимацией */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 bg-blue-600 text-white flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-3">
            ИП
          </div>
          <div>
            <p className="font-medium">Иван Петров</p>
          </div>
        </div>
        
        <nav className="p-2">
          {menuItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`
                w-full text-left p-3 rounded flex items-center
                ${pathname === item.path ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}