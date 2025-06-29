import { useMemo, useState } from 'react'
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
import { useCustomers } from '../../hooks/useApi'
import type { Customer, CustomersParams } from '../../types/api'
import { customersColumns } from './columns'
import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react'
import SortIcon from '@/assets/icons/sort.svg?react'
import { TableLoadingState, TableErrorState, TablePagination } from '@/components/TableStates'
import CustomersTableHeader from './CustomersTableHeader'

interface CustomersTableProps {
  onCustomerSelect?: (customer: Customer) => void
}

export default function CustomersTable({ onCustomerSelect }: CustomersTableProps) {
  // 기본 정렬: ID 기준 오름차순
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // API 파라미터 구성
  const apiParams: CustomersParams = useMemo(() => {
    const params: CustomersParams = {}

    // 정렬 설정 (기본값: id 기준 오름차순)
    if (sorting.length > 0) {
      params.sortBy = sorting[0]?.desc ? 'desc' : 'asc'
    } else {
      params.sortBy = 'asc'
    }

    // 이름 필터 설정
    const nameFilter = columnFilters.find((filter) => filter.id === 'name')
    if (nameFilter?.value) {
      params.name = nameFilter.value as string
    }

    return params
  }, [sorting, columnFilters])

  // 고객 데이터 조회
  const { data: customers = [], isLoading, error } = useCustomers(apiParams)

  // localStorage에서 페이지 크기 불러오기
  const getStoredPageSize = () => {
    const stored = localStorage.getItem('customersTable-pageSize')
    return stored ? parseInt(stored, 10) : 10
  }

  // 테이블 설정
  const table = useReactTable({
    data: customers,
    columns: customersColumns,
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
    return <TableLoadingState message="고객 데이터를 불러오는 중..." />
  }

  if (error) {
    return <TableErrorState title="고객 데이터 로딩 오류" message={error.message} />
  }

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <CustomersTableHeader
        totalCount={customers.length}
        searchValue={globalFilter ?? ''}
        onSearchChange={setGlobalFilter}
      />

      {/* 테이블 */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 transition-none">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between group">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getCanSort() && (
                          <div className="flex items-center ml-2">
                            <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                              {header.column.getIsSorted() === 'desc' ? (
                                <ArrowDownIcon className="w-4 h-4 text-blue-600" />
                              ) : header.column.getIsSorted() === 'asc' ? (
                                <ArrowUpIcon className="w-4 h-4 text-blue-600" />
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
                    ${onCustomerSelect ? 'cursor-pointer hover:bg-blue-50' : 'hover:bg-gray-50'} 
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}
                    group transition-none
                  `}
                  onClick={() => onCustomerSelect?.(row.original)}
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
        <TablePagination table={table} totalCount={customers.length} storageKey="customersTable-pageSize" />
      </div>
    </div>
  )
}
