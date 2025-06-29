import ChartBarIcon from '@/assets/icons/chart-bar.svg?react'
import PurchaseFrequencyChartDateSelector from './PurchaseFrequencyChartDateSelector'
import PurchaseFrequencyChartStatistics from './PurchaseFrequencyChartStatistics'

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
      <PurchaseFrequencyChartDateSelector
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onReset={onReset}
        isDateRangeValid={isDateRangeValid}
      />

      {/* 통계 요약 */}
      <PurchaseFrequencyChartStatistics totalCount={totalCount} averageCount={averageCount} maxCount={maxCount} />
    </div>
  )
}
