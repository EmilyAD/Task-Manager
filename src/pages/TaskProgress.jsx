import { useApp } from '../context/AppContext';
import { useMemo } from 'react';
import { TrendingUp, Award, Target, Zap, Clock, AlertCircle, Calendar } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export default function TaskProgress() {
  const { tasks } = useApp();
const toggleTask = (id) => {
  setTasks(prev => prev.map(task => 
    task.id === id 
      ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null } 
      : task
  ));
};
  const stats = useMemo(() => {
    const initial = {
      completed: 0,
      total: 0,
      overdue: 0,
      growthSum: 0,
      priorityPoints: 0,
      earnedPoints: 0,
      weeklyCount: 0,
      categoryStats: {},
    };

    if (!tasks || tasks.length === 0) {
      return { ...initial, active: 0, avgGrowth: 0, completionRate: 0, weeklyVelocity: 0 };
    }

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    return tasks.reduce((acc, task) => {
      acc.total++;
      const isDone = !!task.completed;
      
      //  Completion & Active logic
      if (isDone) acc.completed++;

      // Overdue Logic
      if (!isDone && task.dueDate && new Date(task.dueDate) < now) {
        acc.overdue++;
      }

      //  Weekly Velocity (Tasks completed in last 7 days)
      if (isDone && task.completedAt && new Date(task.completedAt) > oneWeekAgo) {
        acc.weeklyCount++;
      }

      //  Priority Weighting (High=3, Med=2, Low=1)
      const weight = task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1;
      acc.priorityPoints += weight;
      if (isDone) acc.earnedPoints += weight;

      //  Category Breakdown
      const cat = task.category || 'General';
      if (!acc.categoryStats[cat]) acc.categoryStats[cat] = { total: 0, completed: 0 };
      acc.categoryStats[cat].total++;
      if (isDone) acc.categoryStats[cat].completed++;

      //  Growth Sum
      acc.growthSum += isDone ? 100 : (task.growthStage || 0);

      return acc;
    }, initial);
  }, [tasks]);

  // Derived calculations
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const avgGrowth = stats.total > 0 ? Math.round(stats.growthSum / stats.total) : 0;
  const weightedProgress = stats.priorityPoints > 0 ? Math.round((stats.earnedPoints / stats.priorityPoints) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress & Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Insights into your productivity and garden growth
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Completion Rate" value={`${completionRate}%`} icon={TrendingUp} color="blue" />
        <StatCard title="Weekly Velocity" value={stats.weeklyCount} icon={Calendar} color="green" />
        <StatCard title="Overdue Tasks" value={stats.overdue} icon={AlertCircle} color="red" />
        <StatCard title="Focus Score" value={`${weightedProgress}%`} icon={Zap} color="purple" />
      </div>

      {/* Detailed Progress Bars */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Efficiency Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Task Completion Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Target size={18} /> Task Volume
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.completed}/{stats.total}</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          {/* Weighted Priority Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Award size={18} /> Priority Impact
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">{weightedProgress}%</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500" style={{ width: `${weightedProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Categories and Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Category Health</h2>
          <div className="space-y-5">
            {Object.entries(stats.categoryStats).length > 0 ? (
              Object.entries(stats.categoryStats).map(([category, data]) => {
                const percentage = Math.round((data.completed / data.total) * 100);
                return (
                  <div key={category}>
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{category}</span>
                      <span className="text-gray-500">{data.completed}/{data.total} tasks</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm italic">No categories tracked yet.</p>
            )}
          </div>
        </div>

        {/* Growth Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-center text-center">
            <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                <Clock className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{avgGrowth}%</h2>
            <p className="text-gray-600 dark:text-gray-400">Average Garden Growth</p>
            <div className="mt-6 h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full max-w-xs mx-auto overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${avgGrowth}%` }} />
            </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AchievementCard 
            emoji="🌱" 
            title="First Seed" 
            desc="Created a task" 
            unlocked={stats.total >= 1} 
          />
          <AchievementCard 
            emoji="🌿" 
            title="Growing Strong" 
            desc="Complete 5 tasks" 
            unlocked={stats.completed >= 5} 
          />
          <AchievementCard 
            emoji="🌸" 
            title="In Full Bloom" 
            desc="Complete 10 tasks" 
            unlocked={stats.completed >= 10} 
          />
        </div>
      </div>
    </div>
  );
}


function AchievementCard({ emoji, title, desc, unlocked }) {
  return (
    <div className={`p-4 rounded-lg border transition-all ${
      unlocked 
        ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200 dark:border-green-800 opacity-100' 
        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-40 grayscale'
    }`}>
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
    </div>
  );
}