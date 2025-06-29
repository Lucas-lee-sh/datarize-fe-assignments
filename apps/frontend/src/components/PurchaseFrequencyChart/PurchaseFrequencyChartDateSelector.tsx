import CalendarIcon from '@/assets/icons/calendar.svg?react'

interface PurchaseFrequencyChartDateSelectorProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onReset: () => void
  isDateRangeValid: boolean | null
}

export default function PurchaseFrequencyChartDateSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
  isDateRangeValid,
}: PurchaseFrequencyChartDateSelectorProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm mb-4">
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">기간 선택</span>
        </div>

        <div className="flex flex-row items-center gap-3 flex-1">
          <div className="flex items-center space-x-2">
            <label htmlFor="startDate" className="text-sm text-gray-600 whitespace-nowrap">
              시작일:
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="endDate" className="text-sm text-gray-600 whitespace-nowrap">
              종료일:
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {(startDate || endDate) && (
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
            >
              초기화
            </button>
          )}
        </div>

        {startDate && endDate && isDateRangeValid && (
          <div className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {`${startDate} ~ ${endDate}`}
          </div>
        )}

        {(startDate || endDate) && !(startDate && endDate) && (
          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            시작일과 종료일을 모두 선택해주세요
          </div>
        )}

        {startDate && endDate && isDateRangeValid === false && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
            시작일이 종료일보다 늦을 수 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
