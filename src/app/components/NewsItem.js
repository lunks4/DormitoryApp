export default function NewsItem({ 
  title, 
  content, 
  date, 
  source, 
  startDate = null,
  endDate = null
}) {
  // Функция для получения месяца с правильным окончанием
  const getMonthName = (date) => {
    const months = {
      'январь': 'января',
      'февраль': 'февраля',
      'март': 'марта',
      'апрель': 'апреля',
      'май': 'мая',
      'июнь': 'июня',
      'июль': 'июля',
      'август': 'августа',
      'сентябрь': 'сентября',
      'октябрь': 'октября',
      'ноябрь': 'ноября',
      'декабрь': 'декабря'
    };
    const monthName = date.toLocaleString('ru-RU', { month: 'long' });
    return months[monthName] || monthName;
  };

  // Функция для форматирования даты публикации
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
  };

  // Функция для форматирования времени
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция для форматирования временного промежутка
  const formatTimeRange = () => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    // Если есть и startDate и endDate
    if (start && end) {
      // Если даты разные
      if (start.toDateString() !== end.toDateString()) {
        return `с ${start.getDate()} ${getMonthName(start)} ${formatTime(startDate)} до ${end.getDate()} ${getMonthName(end)} ${formatTime(endDate)}`;
      }
      // Если даты одинаковые
      return `${start.getDate()} ${getMonthName(start)} ${formatTime(startDate)}-${formatTime(endDate)}`;
    }
    
    // Если только startDate
    return `${start.getDate()} ${getMonthName(start)} ${formatTime(startDate)}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      {/* Блок с датой события - теперь вверху */}
      {(startDate || endDate) && (
        <div className="mb-2">
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded whitespace-nowrap">
            {formatTimeRange()}
          </span>
        </div>
      )}
      
      {/* Заголовок */}
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      
      {/* Содержание */}
      <p className="text-gray-700 mb-3">{content}</p>
      
      {/* Источник и дата публикации */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{source}</span>
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
}