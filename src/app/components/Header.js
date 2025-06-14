'use client'
import Link from 'next/link'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

export default function Header({ title, onMenuClick, showBackButton = true }) {
  const pathname = usePathname()
  const isRoot = pathname === '/'

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      {isRoot || !showBackButton ? (
        <button onClick={onMenuClick} className="text-2xl">
          <FiMenu />
        </button>
      ) : (
        <Link href={getBackLink(pathname)} className="text-2xl">
          <FiArrowLeft />
        </Link>
      )}
      
      <h1 className="text-xl font-bold">{title}</h1>
      
      {/* Пустой div для выравнивания, так как правая часть теперь пустая */}
      <div className="w-8"></div>
    </header>
  )
}

function getBackLink(path) {
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 1) {
    return `/${segments[0]}`
  }
  return '/'
}