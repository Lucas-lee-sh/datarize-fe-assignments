import { createColumnHelper } from '@tanstack/react-table'
import type { Customer } from '@/types/api'

const columnHelper = createColumnHelper<Customer>()

export const customersColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        #{info.getValue()}
      </span>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('name', {
    header: '고객명',
    cell: (info) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r  from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{info.getValue().charAt(0)}</span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{info.getValue()}</p>
        </div>
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('count', {
    header: '구매 횟수',
    cell: (info) => (
      <div className="text-sm">
        <span className="font-semibold text-gray-900">{info.getValue().toLocaleString()}</span>
        <span className="text-gray-500 ml-1">회</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('totalAmount', {
    header: '총 구매 금액',
    cell: (info) => (
      <div className="text-sm">
        <span className="font-semibold text-green-600">₩{info.getValue().toLocaleString()}</span>
      </div>
    ),
    enableSorting: true,
  }),
]
