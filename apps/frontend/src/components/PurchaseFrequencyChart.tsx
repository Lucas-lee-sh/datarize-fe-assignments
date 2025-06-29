import { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { usePurchaseFrequency } from '../hooks/useApi'
import type { PurchaseFrequencyParams } from '../types/api'
import ErrorIcon from '@/assets/icons/error.svg?react'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import ChartBarIcon from '@/assets/icons/chart-bar.svg?react'
import TrendingUpIcon from '@/assets/icons/trending-up.svg?react'
import StarIcon from '@/assets/icons/star.svg?react'

interface PurchaseFrequencyChartProps {
  startDate?: string
  endDate?: string
}

// 바 차트 색상 그라데이션
const barColors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#84CC16']

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

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
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

export default function PurchaseFrequencyChart({
  startDate: initialStartDate,
  endDate: initialEndDate,
}: PurchaseFrequencyChartProps) {
  // 날짜 선택 상태 관리
  const [startDate, setStartDate] = useState<string>(initialStartDate || '')
  const [endDate, setEndDate] = useState<string>(initialEndDate || '')

  // 날짜 유효성 검사
  const isDateRangeValid = useMemo(() => {
    if (!startDate || !endDate) return null // 둘 다 없으면 null
    return new Date(startDate) <= new Date(endDate)
  }, [startDate, endDate])

  // API 파라미터 구성 - 시작일과 종료일이 모두 있고 유효한 범위일 때만 요청
  const apiParams: PurchaseFrequencyParams = useMemo(() => {
    const params: PurchaseFrequencyParams = {}
    if (startDate && endDate && isDateRangeValid) {
      params.from = startDate
      params.to = endDate
    }
    return params
  }, [startDate, endDate, isDateRangeValid])

  // 날짜 초기화 함수
  const handleReset = () => {
    setStartDate('')
    setEndDate('')
  }

  const { data: frequencyData = [], isLoading, error } = usePurchaseFrequency(apiParams)

  // 차트 데이터 준비
  const chartData = useMemo(() => {
    const totalCount = frequencyData.reduce((sum, item) => sum + item.count, 0)

    return frequencyData.map((item, index) => ({
      ...item,
      totalCount,
      percentage: totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : '0.0',
      fill: barColors[index % barColors.length],
    }))
  }, [frequencyData])

  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0)
  const averageCount = chartData.length > 0 ? Math.round(totalCount / chartData.length) : 0
  const maxCount = Math.max(...chartData.map((item) => item.count))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-sm text-gray-600">차트 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <ErrorIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">차트 데이터 로딩 오류</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
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
                  onChange={(e) => setStartDate(e.target.value)}
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
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              {(startDate || endDate) && (
                <button
                  onClick={handleReset}
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

      {/* 바 차트 */}
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
                  <Tooltip content={<CustomTooltip />} />
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
    </div>
  )
}
