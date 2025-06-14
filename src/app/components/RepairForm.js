'use client'
import { useState } from 'react'

export default function RepairForm({ service }) {
  const [room, setRoom] = useState('')
  const [problem, setProblem] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setRoom('')
    setProblem('')
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const serviceNames = {
    plumber: 'сантехнику',
    carpenter: 'плотнику',
    electrician: 'электрику'
  }

  return (
    <div>
      <h3 className="font-bold mb-4">Заявка {serviceNames[service]}</h3>
      
      {isSubmitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          Ваша заявка отправлена. {serviceNames[service]} свяжется с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ваша комната:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Опишите проблему:</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Отправить заявку
          </button>
        </form>
      )}
    </div>
  )
}