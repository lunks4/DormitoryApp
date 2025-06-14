'use client'
import { useState, useEffect } from 'react'
import { format, addDays, addHours, isWithinInterval, parse } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function LaundryCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [duration, setDuration] = useState(1)
  const [bookings, setBookings] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Загрузка бронирований из localStorage при монтировании
  useEffect(() => {
    const savedBookings = localStorage.getItem('laundryBookings')
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }, [])

  // Сохранение бронирований в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('laundryBookings', JSON.stringify(bookings))
  }, [bookings])

  const times = []
  for (let i = 8; i <= 22; i++) {
    times.push(`${i}:00`)
    if (i !== 22) times.push(`${i}:30`)
  }

  const isTimeBooked = (time) => {
    return bookings.some(booking => {
      if (format(selectedDate, 'yyyy-MM-dd') !== booking.date) return false

      const bookingStart = parse(booking.time, 'H:mm', new Date())
      const bookingEnd = addHours(bookingStart, booking.duration)
      const currentTime = parse(time, 'H:mm', new Date())

      return currentTime >= bookingStart && currentTime < bookingEnd
    })
  }

  const handleBooking = () => {
    if (!selectedTime) return
    
    const newBooking = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      duration,
      bookedAt: new Date().toISOString()
    }
    
    setBookings([...bookings, newBooking])
    setSelectedTime(null)
    setShowConfirmation(true)
    
    setTimeout(() => {
      setShowConfirmation(false)
    }, 3000)
  }

  const handleTimeSelect = (time) => {
    if (isTimeBooked(time)) return
    setSelectedTime(time)
  }

  const formatDate = (date) => {
    return format(date, 'd MMMM', { locale: ru })
  }

  return (
    <div className="pb-20">
      <h2 className="text-xl font-bold mb-4">Прачечная</h2>
      
      {/* Выбор даты */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Выберите дату:</h3>
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const date = addDays(new Date(), day)
            const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
            
            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDate(date)
                  setSelectedTime(null)
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-16 ${isSelected ? 'bg-blue-500 text-white' : 'bg-white border'}`}
              >
                <span className="text-sm">{format(date, 'EEE', { locale: ru })}</span>
                <span className="font-medium">{format(date, 'd')}</span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Выбор времени */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Выберите время:</h3>
        <div className="grid grid-cols-3 gap-2">
          {times.map(time => {
            const isBooked = isTimeBooked(time)
            const isSelected = selectedTime === time
            
            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={isBooked}
                className={`p-2 rounded ${isBooked ? 'bg-gray-200 text-gray-400' : isSelected ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-50'}`}
              >
                {time}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Выбор длительности */}
      {selectedTime && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Длительность стирки:</h3>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="3"
              step="0.5"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-medium">{duration} час{duration !== 1 ? 'а' : ''}</span>
          </div>
        </div>
      )}
      
      {/* Кнопка подтверждения */}
      {selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
          <button
            onClick={handleBooking}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600"
          >
            Подтвердить бронь
          </button>
        </div>
      )}
      
      {/* Уведомление о подтверждении */}
      {showConfirmation && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Бронь успешно создана!
        </div>
      )}
      
      {/* Список бронирований */}
      {bookings.filter(b => b.date === format(selectedDate, 'yyyy-MM-dd')).length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Забронированное время:</h3>
          <div className="space-y-2">
            {bookings
              .filter(b => b.date === format(selectedDate, 'yyyy-MM-dd'))
              .map((booking, index) => {
                const endTime = format(
                  addHours(
                    parse(booking.time, 'H:mm', new Date()),
                    booking.duration
                  ),
                  'H:mm'
                );
                return (
                  <div key={index} className="bg-white p-3 rounded border">
                    <p>
                      <span className="font-medium">{booking.time}</span> - {endTime} ({booking.duration} час{booking.duration !== 1 ? 'а' : ''})
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  )
}