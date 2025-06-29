import { useMemo, useState } from 'react'
import { usePurchaseFrequency } from '../../hooks/useApi'
import type { PurchaseFrequencyParams } from '../../types/api'
import { TableLoadingState, TableErrorState } from '@/components/TableStates'
import PurchaseFrequencyChartHeader from './PurchaseFrequencyChartHeader'
import PurchaseFrequencyCharts from './PurchaseFrequencyCharts'

interface PurchaseFrequencyChartContainerProps {
  startDate?: string
  endDate?: string
}

// 바 차트 색상 그라데이션
const barColors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#84CC16']

export default function PurchaseFrequencyChartContainer({
  startDate: initialStartDate,
  endDate: initialEndDate,
}: PurchaseFrequencyChartContainerProps) {
  // 날짜 선택 상태 관리
  const [startDate, setStartDate] = useState<string>(initialStartDate || '')
  const [endDate, setEndDate] = useState<string>(initialEndDate || '')

  // 날짜 유효성 검사
  const isDateRangeValid = useMemo(() => {
    if (!startDate || !endDate) return null
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
    return <TableLoadingState message="차트 데이터를 불러오는 중..." />
  }

  if (error) {
    return <TableErrorState title="차트 데이터 로딩 오류" message={error.message} />
  }

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <PurchaseFrequencyChartHeader
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onReset={handleReset}
        isDateRangeValid={isDateRangeValid}
        totalCount={totalCount}
        averageCount={averageCount}
        maxCount={maxCount}
      />

      {/* 바 차트 */}
      <PurchaseFrequencyCharts chartData={chartData} />
    </div>
  )
}
