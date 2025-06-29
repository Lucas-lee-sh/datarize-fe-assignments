export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Datarize Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
