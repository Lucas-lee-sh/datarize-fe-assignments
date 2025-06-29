import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import CustomersTable from './components/CustomersTable/CustomersTable'
import PurchasesTab from './components/PurchasesTab'
import PurchaseFrequencyChart from './components/PurchaseFrequencyChart/PurchaseFrequencyChartContainer'
import type { Customer } from './types/api'
import { TabId } from './types/tabs'

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
})

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(TabId.CUSTOMERS)

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer)
    setActiveTab(TabId.PURCHASES)
  }

  const handleBackToCustomers = () => {
    setSelectedCustomer(null)
    setActiveTab(TabId.CUSTOMERS)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        {/* 헤더 */}
        <Header />

        {/* 탭 네비게이션 */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} selectedCustomer={selectedCustomer} />

        {/* 메인 콘텐츠 */}
        <main className="max-w-7xl mx-auto py-8 px-8">
          <div className="px-4 py-6">
            {/* 고객 목록 */}
            {activeTab === TabId.CUSTOMERS && (
              <div className="space-y-6">
                <CustomersTable onCustomerSelect={handleCustomerSelect} />
              </div>
            )}

            {/* 구매 내역 */}
            {activeTab === TabId.PURCHASES && (
              <PurchasesTab selectedCustomer={selectedCustomer} onBackToCustomers={handleBackToCustomers} />
            )}

            {/* 구매 빈도 분석 */}
            {activeTab === TabId.FREQUENCY && <PurchaseFrequencyChart />}
          </div>
        </main>
      </div>

      {/* React Query 개발 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
