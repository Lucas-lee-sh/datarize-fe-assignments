import ShoppingBagIcon from '@/assets/icons/shopping-bag.svg?react'
import SearchIcon from '@/assets/icons/search.svg?react'

interface CustomerPurchasesTableHeaderProps {
  customerId: number
  customerName?: string
  totalPurchases: number
  totalAmount: number
  searchValue: string
  onSearchChange: (value: string) => void
}

export default function CustomerPurchasesTableHeader({
  customerId,
  customerName,
  totalPurchases,
  totalAmount,
  searchValue,
  onSearchChange,
}: CustomerPurchasesTableHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
      <div className="flex flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between space-x-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <ShoppingBagIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {customerName ? `${customerName}님의 구매 내역` : `고객 ID ${customerId} 구매 내역`}
              </h3>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-72 pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200"
                placeholder="상품명으로 검색..."
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">#</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{totalPurchases}건</p>
                  <p className="text-xs text-gray-500">총 구매 건수</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">₩</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">₩{totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">총 구매 금액</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
