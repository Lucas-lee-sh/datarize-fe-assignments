import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { useCustomerPurchases } from '../../hooks/useApi'
import { customerPurchasesColumns } from './columns'
import ShoppingBagIcon from '@/assets/icons/shopping-bag.svg?react'
import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react'
import SortIcon from '@/assets/icons/sort.svg?react'
import { TableLoadingState, TableErrorState, TableEmptyState, TablePagination } from '@/components/TableStates'
import CustomerPurchasesTableHeader from './CustomerPurchasesTableHeader'

interface CustomerPurchasesTableProps {
  customerId: number
  customerName?: string
}

export default function CustomerPurchasesTable({ customerId, customerName }: CustomerPurchasesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const { data: purchases = [], isLoading, error } = useCustomerPurchases(customerId)

  // localStorage에서 페이지 크기 불러오기
  const getStoredPageSize = () => {
    const stored = localStorage.getItem('purchasesTable-pageSize')
    return stored ? parseInt(stored, 10) : 10
  }

  const table = useReactTable({
    data: purchases,
    columns: customerPurchasesColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: getStoredPageSize(),
      },
    },
  })

  if (isLoading) {
    return <TableLoadingState message="구매 내역을 불러오는 중..." />
  }

  if (error) {
    return <TableErrorState title="구매 내역 로딩 오류" message={error.message} />
  }

  const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.quantity * purchase.price, 0)

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <CustomerPurchasesTableHeader
        customerId={customerId}
        customerName={customerName}
        totalPurchases={purchases.length}
        totalAmount={totalAmount}
        searchValue={globalFilter ?? ''}
        onSearchChange={setGlobalFilter}
      />

      {/* 테이블 */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
        {purchases.length === 0 ? (
          <TableEmptyState
            icon={<ShoppingBagIcon className="w-8 h-8 text-gray-400" />}
            title="구매 내역이 없습니다"
            description="아직 이 고객의 구매 기록이 없습니다."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 transition-none">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-purple-100 select-none"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center justify-between group">
                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            {header.column.getCanSort() && (
                              <div className="flex items-center ml-2">
                                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                  {header.column.getIsSorted() === 'desc' ? (
                                    <ArrowDownIcon className="w-4 h-4 text-purple-600" />
                                  ) : header.column.getIsSorted() === 'asc' ? (
                                    <ArrowUpIcon className="w-4 h-4 text-purple-600" />
                                  ) : (
                                    <SortIcon className="w-4 h-4" />
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </th>
                      )),
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 transition-none">
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`
                        hover:bg-purple-50
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}
                        group transition-none
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <TablePagination
              table={table}
              totalCount={purchases.length}
              displayedCount={table.getFilteredRowModel().rows.length}
              storageKey="purchasesTable-pageSize"
            />
          </>
        )}
      </div>
    </div>
  )
}
