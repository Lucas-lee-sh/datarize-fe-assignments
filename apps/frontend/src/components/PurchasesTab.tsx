import CustomerPurchasesTable from './CustomerPurchasesTable/CustomerPurchasesTable'
import type { Customer } from '../types/api'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react'
import UsersIcon from '@/assets/icons/users.svg?react'

interface PurchasesTabProps {
  selectedCustomer: Customer | null
  onBackToCustomers: () => void
}

export default function PurchasesTab({ selectedCustomer, onBackToCustomers }: PurchasesTabProps) {
  return (
    <div className="space-y-6">
      {selectedCustomer ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBackToCustomers}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              고객 목록으로 돌아가기
            </button>
          </div>
          <CustomerPurchasesTable customerId={selectedCustomer.id} customerName={selectedCustomer.name} />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-purple-500 text-3xl">🛍️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">고객을 선택해주세요</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            구매 내역을 확인하려면 먼저 고객 목록에서 고객을 선택해주세요.
          </p>
          <button
            onClick={onBackToCustomers}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            고객 목록 보기
          </button>
        </div>
      )}
    </div>
  )
}
