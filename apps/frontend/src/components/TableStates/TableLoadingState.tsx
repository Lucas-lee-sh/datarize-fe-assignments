interface TableLoadingStateProps {
  message?: string
}

export default function TableLoadingState({ message = '데이터를 불러오는 중...' }: TableLoadingStateProps) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}
