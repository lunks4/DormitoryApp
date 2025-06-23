'use client'
import { useState, useRef } from 'react'
import Header from '../components/Header'
import { FiTool, FiDroplet, FiHome, FiZap, FiCamera, FiX } from 'react-icons/fi'

export default function RepairPage() {
  return (
    <div className="min-h-screen">
      <Header 
        title="Ремонт" 
        onMenuClick={() => {}} 
        showBackButton={true}
      />
      
      <main className="p-4 pb-20">
        <div className="flex flex-col space-y-4 mb-6">
          <RepairButton 
            icon={<FiDroplet className="text-blue-500" size={24} />}
            title="Сантехник"
            description="Протечки, засоры, проблемы с сантехникой"
            formComponent={<PlumberForm />}
          />
          
          <RepairButton 
            icon={<FiHome className="text-amber-500" size={24} />}
            title="Плотник"
            description="Мебель, двери, окна, деревянные конструкции"
            formComponent={<CarpenterForm />}
          />
          
          <RepairButton 
            icon={<FiZap className="text-yellow-500" size={24} />}
            title="Электрик"
            description="Розетки, выключатели, проблемы с проводкой"
            formComponent={<ElectricianForm />}
          />
        </div>
      </main>
    </div>
  )
}

function RepairButton({ icon, title, description, formComponent }) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Заявка: {title}</h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            {formComponent}
          </div>
        </div>
      )}
    </>
  )
}

function PlumberForm() {
  const [room, setRoom] = useState('')
  const [problem, setProblem] = useState('')
  const [photos, setPhotos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Здесь будет отправка данных на сервер
    setTimeout(() => {
      alert('Заявка на сантехника отправлена!')
      setIsSubmitting(false)
    }, 1000)
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setPhotos([...photos, ...newPhotos])
  }

  const removePhoto = (index) => {
    const newPhotos = [...photos]
    URL.revokeObjectURL(newPhotos[index].preview)
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Номер комнаты</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Описание проблемы</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Прикрепить фото</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img 
                src={photo.preview} 
                alt={`Приложение ${index + 1}`} 
                className="w-16 h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiCamera className="mr-2" />
          Добавить фото
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  )
}

function CarpenterForm() {
  // ... (тот же код что и в PlumberForm, но с заменой bg-blue-600 на bg-amber-600)
  const [room, setRoom] = useState('')
  const [problem, setProblem] = useState('')
  const [photos, setPhotos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Здесь будет отправка данных на сервер
    setTimeout(() => {
      alert('Заявка на сантехника отправлена!')
      setIsSubmitting(false)
    }, 1000)
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setPhotos([...photos, ...newPhotos])
  }

  const removePhoto = (index) => {
    const newPhotos = [...photos]
    URL.revokeObjectURL(newPhotos[index].preview)
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Номер комнаты</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Описание проблемы</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Прикрепить фото</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img 
                src={photo.preview} 
                alt={`Приложение ${index + 1}`} 
                className="w-16 h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiCamera className="mr-2" />
          Добавить фото
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  )
}

function ElectricianForm() {
  // ... (тот же код что и в PlumberForm, но с заменой bg-blue-600 на bg-yellow-600)
  const [room, setRoom] = useState('')
  const [problem, setProblem] = useState('')
  const [photos, setPhotos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Здесь будет отправка данных на сервер
    setTimeout(() => {
      alert('Заявка на сантехника отправлена!')
      setIsSubmitting(false)
    }, 1000)
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setPhotos([...photos, ...newPhotos])
  }

  const removePhoto = (index) => {
    const newPhotos = [...photos]
    URL.revokeObjectURL(newPhotos[index].preview)
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Номер комнаты</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Описание проблемы</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg h-32"
          required
        />
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img 
                src={photo.preview} 
                alt={`Приложение ${index + 1}`} 
                className="w-16 h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiCamera className="mr-2" />
          Добавить фото
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  )
}