import type {
  Customer,
  CustomerPurchase,
  PurchaseFrequency,
  CustomersParams,
  PurchaseFrequencyParams,
  ApiError,
} from '../types/api'

/**
 * @todo
 * - 환경변수 설정
 */
// 기본 API URL 설정
const API_BASE_URL = 'http://localhost:4000'

// 공통 fetch 함수
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }))
    throw new Error(errorData.error || `Request failed with status ${response.status}`)
  }

  return response.json()
}

// 고객 목록 조회
export async function getCustomers(params?: CustomersParams): Promise<Customer[]> {
  const searchParams = new URLSearchParams()

  if (params?.sortBy) {
    searchParams.append('sortBy', params.sortBy)
  }
  if (params?.name) {
    searchParams.append('name', params.name)
  }

  const queryString = searchParams.toString()
  const endpoint = `/api/customers${queryString ? `?${queryString}` : ''}`

  return fetchApi<Customer[]>(endpoint)
}

// 특정 고객의 구매 내역 조회
export async function getCustomerPurchases(customerId: number): Promise<CustomerPurchase[]> {
  return fetchApi<CustomerPurchase[]>(`/api/customers/${customerId}/purchases`)
}

// 구매 빈도 데이터 조회
export async function getPurchaseFrequency(params?: PurchaseFrequencyParams): Promise<PurchaseFrequency[]> {
  const searchParams = new URLSearchParams()

  if (params?.from) {
    searchParams.append('from', params.from)
  }
  if (params?.to) {
    searchParams.append('to', params.to)
  }

  const queryString = searchParams.toString()
  const endpoint = `/api/purchase-frequency${queryString ? `?${queryString}` : ''}`

  return fetchApi<PurchaseFrequency[]>(endpoint)
}

// Query Functions
export const apiQueryFns = {
  // 고객 목록 조회
  customers: (params?: CustomersParams) => () => getCustomers(params),

  // 특정 고객 구매 내역 조회
  customerPurchases: (customerId: number) => () => getCustomerPurchases(customerId),

  // 구매 빈도 조회
  purchaseFrequency: (params?: PurchaseFrequencyParams) => () => getPurchaseFrequency(params),
}

// React Query Keys
export const queryKeys = {
  customers: (params?: CustomersParams) => ['customers', params] as const,
  customerPurchases: (customerId: number) => ['customers', 'purchases', customerId] as const,
  purchaseFrequency: (params?: PurchaseFrequencyParams) => ['purchase-frequency', params] as const,
}
