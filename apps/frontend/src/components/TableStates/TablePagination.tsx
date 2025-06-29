import { type Table } from '@tanstack/react-table'
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'

interface TablePaginationProps<T> {
  table: Table<T>
  totalCount: number
  displayedCount?: number
  storageKey: string
}

export default function TablePagination<T>({ table, totalCount, displayedCount, storageKey }: TablePaginationProps<T>) {
  const handlePageSizeChange = (newPageSize: number) => {
    table.setPageSize(newPageSize)
    localStorage.setItem(storageKey, newPageSize.toString())
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                페이지 {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <span className="text-sm text-gray-500">
                {displayedCount !== undefined ? `(${displayedCount}건 표시 중)` : `(총 ${totalCount}개 항목)`}
              </span>
            </div>
            <div className="relative">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="appearance-none px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
              >
                {[10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}개씩 보기
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              title="이전 페이지"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              title="다음 페이지"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
