export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export interface PurchaseFrequency {
  range: string
  count: number
}

export interface ApiError {
  error: string
}

export interface CustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
}

export interface PurchaseFrequencyParams {
  from?: string
  to?: string
}
