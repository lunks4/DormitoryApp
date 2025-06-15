'use client'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { FiCalendar, FiClock } from 'react-icons/fi'

export default function LaundryPage() {
  const [selectedMachine, setSelectedMachine] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(1) // 1 hour by default
  const [bookings, setBookings] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [lastBookingInfo, setLastBookingInfo] = useState(null);

  // Generate dates (today + 6 days ahead)
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    
    return dates
  }

  // Generate time slots every 30 minutes from 8:00 to 22:00
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 22) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return slots
  }

  const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
    }

   const isSlotAvailable = (machine, date, time, duration) => {
    const startMin = timeToMinutes(time)
    const endMin = timeToMinutes(addDuration(time, duration))

    return !bookings.some(booking => {
        if (booking.machine !== machine || booking.date !== date) return false

        const bookingStart = timeToMinutes(booking.time)
        const bookingEnd = timeToMinutes(addDuration(booking.time, booking.duration))

        // Проверка пересечения интервалов
        return startMin < bookingEnd && endMin > bookingStart
    })
    }

  // Helper function to add duration to time
    const addDuration = (time, hours) => {
        const [h, m] = time.split(':').map(Number)
        const totalMinutes = h * 60 + m + hours * 60
        const newH = Math.floor(totalMinutes / 60)
        const newM = totalMinutes % 60
        return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`
    }
  // Format date for display
    const formatDisplayDate = (dateString) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short' }
        return new Date(dateString).toLocaleDateString('ru-RU', options)
    }

  // Load mock bookings
  useEffect(() => {
    // const mockBookings = [
    //   { id: 1, machine: 1, date: new Date().toISOString().split('T')[0], time: '10:00', duration: 1.5, user: 'Иван Петров' },
    //   { id: 2, machine: 2, date: new Date().toISOString().split('T')[0], time: '14:00', duration: 2, user: 'Мария Иванова' },
    // ]
    // setBookings(mockBookings)
  }, [])

  // Handle booking submission
  const handleBooking = () => {
    if (!selectedDate || !startTime) return
    
    const newBooking = {
      id: bookings.length + 1,
      machine: selectedMachine,
      date: selectedDate,
      time: startTime,
      duration: duration,
      user: 'Иван Петров'
    }
    
    setBookings([...bookings, newBooking])
    setLastBookingInfo({ machine: selectedMachine, time: startTime, duration, date: selectedDate })
    setShowConfirmation(true)
    setStartTime('')
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Прачечная" 
        onMenuClick={() => {}} 
        showBackButton={true}
      />
      
      <main className="p-4 pb-20">
        {/* Machine selection tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          {[1, 2, 3].map(machine => (
            <button
              key={machine}
              onClick={() => setSelectedMachine(machine)}
              className={`flex-1 py-2 font-medium ${selectedMachine === machine ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              Машина #{machine}
            </button>
          ))}
        </div>

        {/* Date selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FiCalendar className="mr-2" /> Выберите дату
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {generateDates().map(date => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date)
                  setStartTime('')
                }}
                className={`p-2 rounded-lg border ${selectedDate === date ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
              >
                {formatDisplayDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Time selection */}
        {selectedDate && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <FiClock className="mr-2" /> Выберите время начала
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {generateTimeSlots().map(time => {
                const effectiveDuration = startTime === time ? duration : 0.5 // минимальная длительность
                const isAvailable = isSlotAvailable(selectedMachine, selectedDate, time, effectiveDuration)
                return (
                  <button
                    key={time}
                    onClick={() => isAvailable && setStartTime(time)}
                    disabled={!isAvailable}
                    className={`p-2 rounded-lg border ${startTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} ${!isAvailable ? 'opacity-50' : ''}`}
                  >
                    {time}
                    {!isAvailable && <span className="block text-xs text-gray-500">Занято</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Duration selection */}
        {startTime && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Длительность</h2>
            <div className="grid grid-cols-3 gap-2">
              {[0.5, 1, 1.5, 2, 2.5, 3].map(hours => (
                <button
                  key={hours}
                  onClick={() => setDuration(hours)}
                  className={`p-2 rounded-lg border ${duration === hours ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  {hours} ч
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Бронируете с {startTime} до {addDuration(startTime, duration)}
            </p>
          </div>
        )}

        {/* Book button */}
        {startTime && (
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6"
          >
            Забронировать Машину #{selectedMachine}<br />
            {formatDisplayDate(selectedDate)} с {startTime} до {addDuration(startTime, duration)}
          </button>
        )}

        {/* User bookings */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Мои бронирования</h2>
          {bookings.filter(b => b.user === 'Иван Петров').length > 0 ? (
            <div className="space-y-3">
              {bookings
                .filter(b => b.user === 'Иван Петров')
                .map(booking => (
                  <div key={booking.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="font-medium">Машина #{booking.machine}</div>
                    <div>{formatDisplayDate(booking.date)}</div>
                    <div>{booking.time} - {addDuration(booking.time, booking.duration)} ({booking.duration} ч)</div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">У вас нет активных бронирований</p>
          )}
        </div>
      </main>
    </div>
  )
}