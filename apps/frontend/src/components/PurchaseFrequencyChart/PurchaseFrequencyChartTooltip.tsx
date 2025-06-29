// 커스텀 툴팁 컴포넌트
interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: {
      count: number
      totalCount: number
      range: string
    }
  }>
  label?: string
}

export default function PurchaseFrequencyChartTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const totalCount = payload[0].payload.totalCount || 0
    const percentage = totalCount > 0 ? ((data.count / totalCount) * 100).toFixed(1) : '0.0'

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-blue-600">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            구매 건수: <span className="font-semibold">{data.count.toLocaleString()}건</span>
          </p>
          <p className="text-sm text-gray-600">
            전체 대비: <span className="font-semibold">{percentage}%</span>
          </p>
        </div>
      </div>
    )
  }
  return null
}
