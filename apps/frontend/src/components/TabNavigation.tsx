import type { Customer } from '../types/api'
import { TabId, TABS } from '../types/tabs'
import type { Dispatch, SetStateAction } from 'react'

interface TabNavigationProps {
  activeTab: TabId
  setActiveTab: Dispatch<SetStateAction<TabId>>
  selectedCustomer: Customer | null
}

export default function TabNavigation({ activeTab, setActiveTab, selectedCustomer }: TabNavigationProps) {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex space-x-2 py-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-600 text-white shadow-lg transform scale-105 focus:ring-indigo-300'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === TabId.PURCHASES && !selectedCustomer && (
                <span className="text-xs opacity-75">(고객 선택 필요)</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
