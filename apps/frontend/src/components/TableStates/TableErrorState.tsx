import ErrorIcon from '@/assets/icons/error.svg?react'

interface TableErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export default function TableErrorState({ title = '데이터 로딩 오류', message, onRetry }: TableErrorStateProps) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <ErrorIcon className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
