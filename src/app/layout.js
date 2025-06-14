import './globals.css'

export const metadata = {
  title: 'Университетское общежитие',
  description: 'Портал для студентов общежития',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}