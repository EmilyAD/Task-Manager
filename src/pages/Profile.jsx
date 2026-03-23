import { useApp } from '../context/AppContext';
import { Mail, Calendar, Award, Settings, Moon, Sun, LogOut, Edit2, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

export function Profile() {
  const { tasks, theme, toggleTheme, user, updateProfile } = useApp();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  // Synchronizes local form with global user data (your real email/name)
  useEffect(() => {
    setUserData(user);
  }, [user]);

  // --- LOGIC CALCULATIONS ---
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Safe calculation for Perfect Week
  const tasksThisWeek = tasks.filter(task => {
    if (!task.completed || !task.completedAt) return false;
    
    const taskDate = new Date(task.completedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return taskDate > sevenDaysAgo;
  });

  // It stays 'false' until you actually have 7 tasks finished this week
  const isPerfectWeek = tasksThisWeek.length >= 7;
  
  const currentStreak = 7; 
  const longestStreak = 14;

  const handleSave = () => {
    updateProfile(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear any local session if needed, then navigate
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT CONTENT AREA (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* MAIN PROFILE CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
              
              {/* UPDATED DYNAMIC BANNER */}
              <div className="h-44 relative overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500">
                {/* 1. DYNAMIC BACKGROUND: Uses picture if exists, otherwise Bloomly Gradient */}
                {userData.profilePicture ? (
                  <div 
                    className="absolute inset-0 w-full h-full scale-150 blur-2xl opacity-70 transition-all duration-500"
                    style={{
                      backgroundImage: `url(${userData.profilePicture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-900" />
                )}

                {/* 2. FLOATING FLOWERS (Always on top) */}
                <div className="absolute top-4 left-6 text-2xl opacity-40 select-none">🌸</div>
                <div className="absolute top-4 right-6 text-2xl opacity-40 select-none">🌻</div>
                <div className="absolute bottom-4 left-10 text-2xl opacity-30 select-none">🌿</div>
                <div className="absolute bottom-4 right-10 text-2xl opacity-30 select-none">🌷</div>

                {/* 3. BANNER TEXT */}
                <h2 className="text-3xl font-black text-white tracking-tight relative z-10 drop-shadow-md">
                  Ready to Start Growing?
                </h2>
                <p className="text-xs text-green-50 opacity-90 relative z-10 max-w-xs px-4 drop-shadow-sm">
                  Join thousands of users who transformed their productivity with Bloomly.
                </p>
                
                {/* EDIT TOGGLE BUTTON */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all border border-white/30"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-6 relative">
                  
                  {/* INSTAGRAM-STYLE PROFILE PICTURE CIRCLE */}
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="relative z-30 -mt-20 cursor-pointer shadow-2xl rounded-full flex-shrink-0 group"
                    style={{ width: '9rem', height: '9rem' }} 
                  >
                    {/* FIXED: White in light mode, Black in dark mode */}
                    <div className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-black flex items-center justify-center transition-colors duration-300">
                      {userData.profilePicture ? (
                        <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        /* FIXED: Big Icon for Insta look */
                        <span className="text-8xl select-none mb-2">👤</span>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <Camera className="w-8 h-8 text-white mb-1" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                      </div>
                    </div>
                  </div>

                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                  {/* NAME AREA */}
                  <div className="flex-1 mt-6">
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg border border-emerald-500/30 w-full outline-none"
                      />
                    ) : (
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        {userData.name}
                      </h2>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="w-4 h-4" />
                        {isEditing ? (
                          <input 
                            className="bg-gray-100 dark:bg-gray-700 px-1 rounded border dark:text-white" 
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                          />
                        ) : (
                          <span>{userData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(userData.joinDate || '2026-03-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BIO SECTION */}
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

                {/* SAVE/CANCEL BUTTONS */}
                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-all font-medium">
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Tasks Done</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mb-3 text-white text-sm">🌱</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Plants Grown</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mb-3 text-white text-sm">🔥</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStreak}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Day Streak</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3 text-white text-sm">📊</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Success Rate</p>
              </div>
            </div>

            {/* ACHIEVEMENTS CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <Award className="w-5 h-5 text-emerald-600" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { emoji: '🏆', label: 'First Task', earned: completedTasks >= 1 },
                  { emoji: '⭐', label: '10 Tasks', earned: completedTasks >= 10 },
                  { emoji: '🔥', label: '7 Day Streak', earned: currentStreak >= 7 },
                  { emoji: '🎯', label: 'Perfect Week', earned: isPerfectWeek },
                ].map((ach, i) => (
                  <div key={i} className={`p-4 rounded-xl border text-center transition-all ${ach.earned ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 shadow-sm' : 'opacity-40 grayscale border-dashed bg-gray-50'}`}>
                    <div className="text-3xl mb-2">{ach.emoji}</div>
                    <p className="text-[11px] font-bold uppercase text-gray-600 dark:text-gray-400">{ach.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* PREFERENCES CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-emerald-600" /> Preferences</h3>
              <div className="space-y-4">
                <button onClick={toggleTheme} className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="flex items-center gap-3 dark:text-white font-medium">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} 
                    Appearance
                  </span>
                  <div className={`w-10 h-5 rounded-full relative ${theme === 'dark' ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* JOURNEY CARD */}
            <div className="bg-gradient-to-br from-emerald-50 to-purple-50 dark:from-emerald-900/10 dark:to-purple-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Journey</h3>
              <div className="space-y-4">
                <div className="flex justify-between dark:text-white"><span className="text-gray-500">Current Streak</span><span className="font-bold">{currentStreak} days</span></div>
                <div className="h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-purple-500" style={{ width: `${(currentStreak / longestStreak) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 italic text-center italic">"Consistency is the key to growth!"</p>
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button 
              onClick={handleLogout}
              className="w-full group flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 font-bold rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Logout Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}