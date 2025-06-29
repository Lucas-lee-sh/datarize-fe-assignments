import ChartBarIcon from '@/assets/icons/chart-bar.svg?react'
import TrendingUpIcon from '@/assets/icons/trending-up.svg?react'
import StarIcon from '@/assets/icons/star.svg?react'

interface PurchaseFrequencyChartStatisticsProps {
  totalCount: number
  averageCount: number
  maxCount: number
}

export default function PurchaseFrequencyChartStatistics({
  totalCount,
  averageCount,
  maxCount,
}: PurchaseFrequencyChartStatisticsProps) {
  return (
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
  )
}
