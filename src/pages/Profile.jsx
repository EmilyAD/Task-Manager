import { useApp } from '../context/AppContext';
import { Mail, Calendar, Award, Settings, Moon, Sun, LogOut, Edit2, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

// --- HELPER LOGIC: STREAK CALCULATION ---
const calculateStreak = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const completedDates = [...new Set(tasks
    .filter(t => t.completed && t.completedAt)
    .map(t => new Date(t.completedAt).toISOString().split('T')[0])
  )].sort((a, b) => new Date(b) - new Date(a));

  if (completedDates.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastCompletedDate = new Date(completedDates[0]);
  lastCompletedDate.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor((today - lastCompletedDate) / (1000 * 60 * 60 * 24));
  if (diffInDays > 1) return 0;

  for (let i = 0; i < completedDates.length; i++) {
    const currentEntry = new Date(completedDates[i]);
    currentEntry.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(lastCompletedDate);
    expectedDate.setDate(lastCompletedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (currentEntry.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break; 
    }
  }
  return streak;
};

export function Profile() {
  const { tasks, theme, toggleTheme, user, updateProfile } = useApp();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
    joinDate: ""
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
        joinDate: user.joinDate || ""
      });
    }
  }, [user]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const currentStreak = calculateStreak(tasks);
  const streakGoal = 30;

  const tasksThisWeek = tasks.filter(task => {
    if (!task.completed || !task.completedAt) return false;
    const taskDate = new Date(task.completedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return taskDate > sevenDaysAgo;
  });

  const isPerfectWeek = tasksThisWeek.length >= 7;

  const handleSave = () => {
    if (!userData.name.trim()) return alert("Name is a required field!");
    updateProfile(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    /* Removed transition-colors to ensure background swaps instantly */
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 p-2">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
              <div className="min-h-[160px] md:h-44 py-6 md:py-0 relative overflow-hidden flex flex-col items-center justify-center text-center">
                {userData.profilePicture ? (
                  <div 
                    /* Reduced blur and scale to lower GPU load during theme shifts */
                    className="absolute inset-0 w-full h-full scale-110 blur-xl opacity-50"
                    style={{
                      backgroundImage: `url(${userData.profilePicture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-900" />
                )}

                <div className="absolute top-4 left-6 text-2xl opacity-40 select-none">🌸</div>
                <div className="absolute top-4 right-6 text-2xl opacity-40 select-none">🌻</div>
                
                <h2 className="text-xl md:text-3xl font-black text-white tracking-tight relative z-10 drop-shadow-md px-4">
                   Ready to Start Growing?
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full shadow-lg border border-white/30"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="relative z-30 -mt-24 cursor-pointer shadow-2xl rounded-full flex-shrink-0 group"
                    style={{ width: '9rem', height: '9rem' }} 
                  >
                    {/* Removed duration-300 from border/bg for instant theme swap */}
                    <div className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                      {userData.profilePicture ? (
                        <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-8xl select-none mb-2">👤</span>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <Camera className="w-8 h-8 text-white mb-1" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                      </div>
                    </div>
                  </div>

                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                  <div className="flex-1 mt-8 text-center md:text-left w-full overflow-hidden">
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg border border-emerald-500/30 w-full outline-none"
                      />
                    ) : (
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight break-words">
                        {userData.name || "Anonymous User"}
                      </h2>
                    )}
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 mt-3 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                        <span className="truncate">{userData.email || "No email set"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                        <span>Joined {new Date(userData.joinDate || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Bio</h4>
                  {isEditing ? (
                    <textarea
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {userData.bio || "No bio set yet. Tell us about your journey! 🌱"}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium">Save</button>
                    <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">Cancel</button>
                  </div>
                )}
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatItem label="Tasks Done" value={completedTasks} color="emerald" icon={<Award className="w-4 h-4 text-white" />} />
              <StatItem label="Plants Grown" value={completedTasks} color="purple" icon="🌱" />
              <StatItem label="Day Streak" value={currentStreak} color="amber" icon="🔥" />
              <StatItem label="Success Rate" value={`${completionRate}%`} color="blue" icon="📊" />
            </div>
          </div>

          <div className="lg:col-span-4 mx-auto space-y-2 mt-[-10px]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-600" /> Preferences
              </h3>
              <button 
                onClick={toggleTheme} 
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 transition-none"
              >
                <span className="flex items-center gap-3 dark:text-white font-medium">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} 
                  Appearance
                </span>
                <div className={`w-10 h-5 rounded-full relative transition-none ${theme === 'dark' ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                  {/* Reduced transition duration for snappier toggle ball */}
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform duration-75 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 font-bold rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats to keep the main code clean
function StatItem({ label, value, color, icon }) {
  const colors = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 icon-bg-emerald-600',
    purple: 'bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/30 icon-bg-purple-600',
    amber: 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30 icon-bg-amber-500',
    blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30 icon-bg-blue-600'
  };

  return (
    <div className={`${colors[color].split('icon-bg')[0]} p-4 rounded-2xl border`}>
      <div className={`w-8 h-8 ${color === 'emerald' ? 'bg-emerald-600' : color === 'purple' ? 'bg-purple-600' : color === 'amber' ? 'bg-amber-500' : 'bg-blue-600'} rounded-lg flex items-center justify-center mb-3 text-white text-sm`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">{label}</p>
    </div>
  );
}