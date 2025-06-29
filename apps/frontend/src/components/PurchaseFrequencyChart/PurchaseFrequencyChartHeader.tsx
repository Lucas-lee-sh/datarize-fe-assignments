import CalendarIcon from '@/assets/icons/calendar.svg?react'
import ChartBarIcon from '@/assets/icons/chart-bar.svg?react'
import TrendingUpIcon from '@/assets/icons/trending-up.svg?react'
import StarIcon from '@/assets/icons/star.svg?react'

interface PurchaseFrequencyChartHeaderProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onReset: () => void
  isDateRangeValid: boolean | null
  totalCount: number
  averageCount: number
  maxCount: number
}

export default function PurchaseFrequencyChartHeader({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
  isDateRangeValid,
  totalCount,
  averageCount,
  maxCount,
}: PurchaseFrequencyChartHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 rounded-xl p-6 border border-indigo-100">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-600 flex items-center justify-center">
          <ChartBarIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">구매 빈도 바 차트</h2>
          <p className="text-sm text-gray-600">기간별 구매 패턴을 한눈에 확인하세요</p>
        </div>
      </div>

      {/* 날짜 선택 영역 */}
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

      {/* 통계 요약 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalCount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">총 구매 건수</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{averageCount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">평균 구매 건수</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{maxCount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">최대 구매 건수</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
