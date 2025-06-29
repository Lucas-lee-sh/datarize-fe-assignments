import { createColumnHelper } from '@tanstack/react-table'
import type { CustomerPurchase } from '@/types/api'

const columnHelper = createColumnHelper<CustomerPurchase>()

export const customerPurchasesColumns = [
  columnHelper.accessor('date', {
    header: '구매일',
    cell: (info) => {
      const date = new Date(info.getValue())
      return (
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
          </div>
          <div className="text-gray-500 text-xs">{date.getFullYear()}년</div>
        </div>
      )
    },
    enableSorting: true,
  }),
  columnHelper.accessor('product', {
    header: '상품 정보',
    cell: (info) => (
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src={info.row.original.imgSrc}
            alt={info.getValue()}
            className="h-12 w-12 rounded-lg object-cover shadow-sm border border-gray-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/48x48?text=No+Image'
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{info.getValue()}</p>
          <p className="text-xs text-gray-500">상품 ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
        </div>
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('quantity', {
    header: '수량',
    cell: (info) => (
      <div className="flex items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {info.getValue().toLocaleString()}개
        </span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('price', {
    header: '단가',
    cell: (info) => (
      <div className="text-sm">
        <span className="font-semibold text-gray-900">₩{info.getValue().toLocaleString()}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.display({
    id: 'totalPrice',
    header: '총액',
    cell: (info) => {
      const total = info.row.original.quantity * info.row.original.price
      return (
        <div className="text-sm">
          <span className="font-bold text-green-600">₩{total.toLocaleString()}</span>
        </div>
      )
    },
  }),
]
