export enum TabId {
  CUSTOMERS = 'customers',
  PURCHASES = 'purchases',
  FREQUENCY = 'frequency',
}

export interface Tab {
  id: TabId
  label: string
  icon: string
}

export const TABS: Tab[] = [
  { id: TabId.CUSTOMERS, label: '고객 관리', icon: '👥' },
  { id: TabId.PURCHASES, label: '구매 내역', icon: '🛍️' },
  { id: TabId.FREQUENCY, label: '구매 빈도 분석', icon: '📊' },
]
