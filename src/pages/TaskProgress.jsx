import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Clock, Target, Zap, Award } from 'lucide-react';

export default function TaskProgress() {
  const { tasks } = useApp();

  // --- Dynamic Logic Helpers ---
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  
  // Overall Garden Growth logic
  const growthRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const overdueTasks = tasks.filter(t => 
    !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  const focusScore = totalTasks > 0 
    ? Math.round(((totalTasks - overdueTasks) / totalTasks) * 100) 
    : 0;

  // --- Dynamic SVG Circle Math ---
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (growthRate / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200  ">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Progress & Stats</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Insights into your productivity and garden growth.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
              Live Sync
            </span>
          </div>
        </header>

        {/* TOP LEVEL: DYNAMIC HERO & PULSE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
              <p className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-widest mb-1">Average Garden Growth</p>
              <h2 className="text-5xl font-bold text-slate-900 dark:text-white">{growthRate}%</h2>
              <p className={`text-sm mt-4 flex items-center justify-center md:justify-start gap-2 font-bold ${growthRate > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                <TrendingUp size={16} /> {growthRate > 0 ? `+${growthRate}% total progress` : 'No growth yet'}
              </p>
            </div>
            
            <div className="relative w-32 h-32 md:w-44 md:h-44">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r={radius} className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="12" />
                <circle 
                  cx="50%" cy="50%" r={radius} 
                  className="stroke-emerald-500 fill-none transition-all duration-1000 ease-in-out" 
                  strokeWidth="12" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                {growthRate >= 100 ? "🌸" : growthRate > 0 ? "🌿" : "🌱"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <StatCard icon={<Target size={18} />} label="Completion Rate" value={`${growthRate}%`} colorClass="text-blue-600 dark:text-blue-400" bgClass="bg-blue-50 dark:bg-slate-900/60" />
            <StatCard icon={<Clock size={18} />} label="Overdue Tasks" value={overdueTasks} colorClass={overdueTasks > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-400"} bgClass="bg-rose-50 dark:bg-slate-900/60" />
            <StatCard icon={<Zap size={18} />} label="Focus Score" value={`${focusScore}%`} colorClass="text-purple-600 dark:text-purple-400" bgClass="bg-purple-50 dark:bg-slate-900/60" />
          </div>
        </div>

        {/* MIDDLE LEVEL: DYNAMIC TASK BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              Individual Task Progress <span className="text-xs font-normal text-slate-500">({tasks.length})</span>
            </h3>
            
            <div className="space-y-6">
              {tasks.length > 0 ? (
                tasks.slice(0, 5).map((task) => {
                  const totalSubtasks = task.subtasks?.length ?? 0;
                  const doneSubtasks = task.subtasks?.filter(st => st.completed ?? st.done).length ?? 0;

                  let displayWidth;
                  if (task.completed) {
                    displayWidth = 100;
                  } else if (totalSubtasks > 0) {
                    displayWidth = Math.round((doneSubtasks / totalSubtasks) * 100);
                  } else {
                    displayWidth = task.growthStage || 0; 
                  }

                  return (
                    <div key={task._id} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-700 dark:text-slate-200">
                          {task.completed ? '✅' : '🌿'} {task.title}
                        </span>
                        <span className="text-slate-400">{displayWidth}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ease-out ${
                            task.completed ? 'bg-emerald-500' : 'bg-emerald-400'
                          }`} 
                          style={{ width: `${displayWidth}%` }} 
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-slate-400 italic">No tasks found.</div>
              )}
            </div>
          </div>

          {/* DYNAMIC MILESTONES */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900/40 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="text-amber-500" size={20} /> Milestones
            </h3>
            <div className="space-y-4">
              <MilestoneItem label="First Seed" desc="Created your first task" active={totalTasks > 0} icon="🌱" />
              <MilestoneItem label="Growing Strong" desc="5 Tasks completed" active={completedTasks >= 5} icon="🌿" />
              <MilestoneItem label="In Full Bloom" desc="10 Tasks completed" active={completedTasks >= 10} icon="🌸" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---
function StatCard({ icon, label, value, colorClass, bgClass }) {
  return (
    <div className={`${bgClass} p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-transform hover:scale-[1.02]`}>
      <div className={`p-3 rounded-xl bg-white dark:bg-slate-800 ${colorClass} shadow-sm`}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
        <p className={`text-xl font-black ${colorClass}`}>{value}</p>
      </div>
    </div>
  );
}

function MilestoneItem({ label, desc, active, icon }) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-500 ${
      active ? 'bg-emerald-500/5 border-emerald-500/10' : 'opacity-20 grayscale border-transparent'
    }`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{label}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}