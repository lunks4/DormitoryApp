'use client'
import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import { addNewAd } from '../../lib/avitoData'
import { FiCamera, FiX } from 'react-icons/fi'

export default function NewAdPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') || 'give'
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    type: defaultType,
    images: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newAd = await addNewAd(formData)
      router.push(`/avito/${newAd.id}`)
    } catch (error) {
      alert('Ошибка при создании объявления')
      console.error(error)
    }
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - formData.images.length)
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setFormData({
      ...formData,
      images: [...formData.images, ...newPhotos]
    })
  }

  const removePhoto = (index) => {
    const newImages = [...formData.images]
    URL.revokeObjectURL(newImages[index].preview)
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={formData.type === 'give' ? 'Отдать вещь' : 
               formData.type === 'take' ? 'Найти вещь' : 'Потеряшка'} 
        showBackButton={true}
      />

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-0"> {/* Убрали вертикальные отступы */}
          {/* Тип объявления */}
          <div className="bg-white p-4 rounded-t-lg shadow">
            <label className="block text-gray-700 font-medium mb-2">Тип объявления*</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="give">Отдам</option>
              <option value="take">Возьму</option>
              <option value="lost">Потеряшка</option>
            </select>
          </div>

          {/* Заголовок */}
          <div className="bg-white px-4 py-3 shadow"> {/* Уменьшили вертикальные отступы */}
            <label className="block text-gray-700 font-medium mb-2">Заголовок*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Краткое описание"
              required
              maxLength={100}
            />
          </div>

          {/* Описание */}
          <div className="bg-white px-4 py-3 shadow">
            <label className="block text-gray-700 font-medium mb-2">Подробное описание*</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Опишите детали"
              required
            />
          </div>

          {/* Контакты */}
          <div className="bg-white px-4 py-3 shadow">
            <label className="block text-gray-700 font-medium mb-2">Ваши контакты*</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Комната или телеграм"
              required
            />
          </div>

          {/* Фотографии */}
          <div className="bg-white px-4 py-3 rounded-b-lg shadow"> {/* Скругление только снизу */}
            <label className="block text-gray-700 font-medium mb-2">Фотографии (макс. 3)</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image.preview} 
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
            {formData.images.length < 3 && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FiCamera className="mr-2 text-gray-400" size={20} />
                <span className="text-gray-500">Добавить фото</span>
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow mt-4"
          >
            Опубликовать объявление
          </button>
        </form>
      </main>
    </div>
  )
}