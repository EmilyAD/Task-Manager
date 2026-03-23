export function StatCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}