import { useQuery } from '@tanstack/react-query'
import { apiQueryFns, queryKeys } from '../api'
import type { CustomersParams, PurchaseFrequencyParams } from '../types/api'

// 고객 목록 조회 훅
export function useCustomers(params?: CustomersParams) {
  return useQuery({
    queryKey: queryKeys.customers(params),
    queryFn: apiQueryFns.customers(params),
    staleTime: 5 * 60 * 1000,
  })
}

// 특정 고객의 구매 내역 조회 훅
export function useCustomerPurchases(customerId: number) {
  return useQuery({
    queryKey: queryKeys.customerPurchases(customerId),
    queryFn: apiQueryFns.customerPurchases(customerId),
    staleTime: 5 * 60 * 1000,
    enabled: !!customerId,
  })
}

// 구매 빈도 조회 훅
export function usePurchaseFrequency(params?: PurchaseFrequencyParams) {
  return useQuery({
    queryKey: queryKeys.purchaseFrequency(params),
    queryFn: apiQueryFns.purchaseFrequency(params),
    staleTime: 10 * 60 * 1000,
  })
}
