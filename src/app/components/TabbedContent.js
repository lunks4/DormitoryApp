'use client'
export default function TabbedContent({ tabs, activeTab, setActiveTab, children }) {
  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}