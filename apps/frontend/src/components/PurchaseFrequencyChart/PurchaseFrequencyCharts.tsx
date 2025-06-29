import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import ChartBarIcon from '@/assets/icons/chart-bar.svg?react'
import PurchaseFrequencyChartTooltip from './PurchaseFrequencyChartTooltip'

interface ChartData {
  count: number
  range: string
  totalCount: number
  percentage: string
  fill: string
}

interface PurchaseFrequencyChartsProps {
  chartData: ChartData[]
}

export default function PurchaseFrequencyCharts({ chartData }: PurchaseFrequencyChartsProps) {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
      {chartData.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ChartBarIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">차트 데이터가 없습니다</h3>
          <p className="text-gray-500">지정된 기간에 대한 구매 빈도 데이터가 없습니다.</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">기간별 구매 빈도</h3>
            <p className="text-sm text-gray-600">각 기간의 구매 건수를 시각적으로 확인할 수 있습니다.</p>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip content={<PurchaseFrequencyChartTooltip />} />
                <Legend />
                <Bar dataKey="count" name="구매 건수" radius={[4, 4, 0, 0]} stroke="#e5e7eb" strokeWidth={1}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 범례 정보 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"></div>
                <span>구매 건수는 각 기간별 총 구매 횟수를 나타냅니다</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
