export default function NewsItem({ title, content, date, source, isAnnouncement = false }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-lg">{title}</h3>
        {isAnnouncement && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Объявление
          </span>
        )}
      </div>
      <p className="text-gray-700 mb-2">{content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{source}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}