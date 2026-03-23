import { useApp } from '../context/AppContext';
import { useMemo } from 'react';
import { Home, CheckSquare, User,TrendingUp, Award, Target, Zap } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export default function TaskProgress() {
  const { tasks } = useApp();
  const stats = useMemo(() => {
    // 1. Safety check for empty tasks
    if (!tasks || tasks.length === 0) {
      return {
        completed: 0,
        active: 0,
        total: 0,
        categoryStats: {},
        avgGrowth: 0,
        completionRate: 0,
      };
    }

    const completed = tasks.filter(t => t.completed);
    const active = tasks.filter(t => !t.completed);
    
    // 2. Fixed Category logic (added the {} at the end)
    const categoryStats = tasks.reduce((acc, task) => {
      const cat = task.category || 'General';
      if (!acc[cat]) {
        acc[cat] = { total: 0, completed: 0 };
      }
      acc[cat].total++;
      if (task.completed) {
        acc[cat].completed++;
      }
      return acc;
    }, {});

    // 3. Growth calculation
    const avgGrowth = Math.round(
      tasks.reduce((sum, t) => sum + (t.growthStage || 0), 0) / tasks.length
    );

    return {
      completed: completed.length,
      active: active.length,
      total: tasks.length,
      categoryStats,
      avgGrowth,
      completionRate: Math.round((completed.length / tasks.length) * 100),
    };
  }, [tasks]); 


  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress & Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your productivity and garden growth
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={Target}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={Award}
          color="green"
        />
        <StatCard
          title="In Progress"
          value={stats.active}
          icon={Zap}
          color="yellow"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overall Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Task Completion</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats.completed}/{stats.total}
              </span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Average Growth</span>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.avgGrowth}%</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ width: `${stats.avgGrowth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h2>
        <div className="space-y-4">
          {Object.entries(stats.categoryStats).map(([category, data]) => {
            const percentage = Math.round((data.completed / data.total) * 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {data.completed}/{data.total} tasks
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">First Seed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Created your first task</p>
          </div>

          <div className={`p-4 rounded-lg border ${stats.completed >= 5 ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'}`}>
            <div className="text-3xl mb-2">🌿</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Growing Strong</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete 5 tasks</p>
          </div>

          <div className={`p-4 rounded-lg border ${stats.completed >= 10 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'}`}>
            <div className="text-3xl mb-2">🌸</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">In Full Bloom</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete 10 tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}