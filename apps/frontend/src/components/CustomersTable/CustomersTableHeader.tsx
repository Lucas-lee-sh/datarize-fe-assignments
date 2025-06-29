import SearchIcon from '@/assets/icons/search.svg?react'

interface CustomersTableHeaderProps {
  totalCount: number
  searchValue: string
  onSearchChange: (value: string) => void
}

export default function CustomersTableHeader({ totalCount, searchValue, onSearchChange }: CustomersTableHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100">
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">고객 관리</h2>
          <p className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{totalCount}명</span>의 고객이 등록되어 있습니다
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
            placeholder="고객명으로 검색..."
          />
        </div>
      </div>
    </div>
  )
}
