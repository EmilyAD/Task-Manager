import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Search, Trophy } from "lucide-react";

const EMOJI_MAP = {
  "🌱": "seedling",
  "🌿": "herb",
  "🍀": "herb",
  "🪴": "potted_plant",
  "🌸": "cherry_blossom",
  "🌺": "hibiscus",
  "🌻": "sunflower",
  "🌹": "rose",
  "🥀": "rose",
  "🌷": "tulip",
  "🌼": "daisy",
  "🌾": "rice_plant",
};

const TEXT_PATTERNS = [
  ["cherry",       "cherry_blossom"],
  ["blossom",      "cherry_blossom"],
  ["hibiscus",     "hibiscus"],
  ["sunflower",    "sunflower"],
  ["rose",         "rose"],
  ["tulip",        "tulip"],
  ["daisy",        "daisy"],
  ["potted",       "potted_plant"],
  ["rice",         "rice_plant"],
  ["herb",         "herb"],
  ["seedling",     "seedling"],
  ["sprout",       "seedling"],
];

function getPlantKey(plantType) {
  if (!plantType) return "seedling";
  const raw = String(plantType).trim();

  if (EMOJI_MAP[raw]) return EMOJI_MAP[raw];

  for (const [emoji, key] of Object.entries(EMOJI_MAP)) {
    if (raw.includes(emoji)) return key;
  }

  const lower = raw.toLowerCase().replace(/[_\-]/g, " ");
  for (const [pattern, key] of TEXT_PATTERNS) {
    if (lower.includes(pattern)) return key;
  }

  return "seedling"; 
}

function swayStyle(index, speed = 3.2) {
  return {
    animationDelay: `${((index * 0.41) % speed).toFixed(2)}s`,
    transformOrigin: "50% 100%",
  };
}

function PlantSeedling({ index = 0 }) {
  return (
    <svg width="50" height="100" viewBox="0 0 50 100" className="flower-sway" style={swayStyle(index)}>
      <ellipse cx="25" cy="88" rx="18" ry="7" fill="#8B5E3C" opacity="0.5"/>
      <path d="M25 88 C25 72 25 60 25 50" stroke="#5a9e4a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M25 54 C16 46 12 36 20 32 C24 42 25 48 25 54Z" fill="#78c850"/>
      <path d="M25 54 C34 46 38 36 30 32 C26 42 25 48 25 54Z" fill="#5aaa38"/>
      <circle cx="25" cy="32" r="3" fill="#a0e060"/>
    </svg>
  );
}

function PlantHerb({ index = 0 }) {
  return (
    <svg width="54" height="110" viewBox="0 0 54 110" className="flower-sway" style={swayStyle(index, 2.8)}>
      <path d="M27 108 C27 85 26 68 27 50" stroke="#4a8c3a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M27 72 C18 64 14 54 20 50 C22 60 24 66 27 72Z" fill="#6abf4a"/>
      <path d="M27 62 C36 54 40 44 34 40 C32 50 29 56 27 62Z" fill="#82d45c"/>
      <path d="M27 58 C18 50 15 40 21 36 C23 46 25 52 27 58Z" fill="#6abf4a" opacity="0.85"/>
      <path d="M25 50 C20 42 20 32 25 28 C30 32 30 42 25 50Z" fill="#4da838"/>
      <path d="M27 48 C32 40 38 36 36 28 C30 32 28 40 27 48Z" fill="#5ec840" opacity="0.8"/>
    </svg>
  );
}

function PlantCherryBlossom({ index = 0 }) {
  const petals = 5;
  return (
    <svg width="62" height="115" viewBox="0 0 62 115" className="flower-sway" style={swayStyle(index, 3.5)}>
      <path d="M31 113 C31 88 29 70 31 48" stroke="#4a7c3f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M29 82 C18 74 14 60 23 56 C25 68 27 75 29 82Z" fill="#5a9e4a"/>
      <path d="M33 70 C44 62 46 48 37 44 C35 56 34 63 33 70Z" fill="#6ab554" opacity="0.8"/>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i * 360) / petals - 90;
        const rad = a * Math.PI / 180;
        const cx = 31 + 13 * Math.cos(rad);
        const cy = 30 + 13 * Math.sin(rad);
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="7" ry="9"
            fill={i % 2 === 0 ? "#f48fb1" : "#f06292"} opacity="0.9"
            transform={`rotate(${a + 90} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx="31" cy="30" r="6" fill="#fce4ec"/>
      <circle cx="31" cy="30" r="3.5" fill="#f48fb1"/>
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <line key={i} x1="31" y1="30"
          x2={31 + 6 * Math.cos(a * Math.PI / 180)}
          y2={30 + 6 * Math.sin(a * Math.PI / 180)}
          stroke="#e91e8c" strokeWidth="0.8" opacity="0.6"/>
      ))}
    </svg>
  );
}

function PlantSunflower({ index = 0 }) {
  return (
    <svg width="70" height="130" viewBox="0 0 70 130" className="flower-sway" style={swayStyle(index, 4)}>
      <path d="M35 128 C35 96 33 74 35 48" stroke="#3d6e32" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M32 96 C17 86 11 68 23 62 C26 76 29 86 32 96Z" fill="#4a8040"/>
      <path d="M38 80 C53 70 57 52 45 46 C42 60 40 70 38 80Z" fill="#5a9e4a" opacity="0.85"/>
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={i} cx="35" cy="32" rx="5.5" ry="14"
          fill={i % 2 === 0 ? "#fdd835" : "#f9a825"} opacity="0.92"
          transform={`rotate(${i * 360 / 14} 35 32) translate(0 -16)`}
        />
      ))}
      <circle cx="35" cy="32" r="12" fill="#3e2005"/>
      <circle cx="35" cy="32" r="9" fill="#4e2c07"/>
      {[0,40,80,120,160,200,240,280,320].map((a, i) => (
        <circle key={i}
          cx={35 + 5 * Math.cos(a * Math.PI / 180)}
          cy={32 + 5 * Math.sin(a * Math.PI / 180)}
          r="1.2" fill="#1a0d00" opacity="0.8"
        />
      ))}
    </svg>
  );
}

function PlantHibiscus({ index = 0 }) {
  return (
    <svg width="64" height="115" viewBox="0 0 64 115" className="flower-sway" style={swayStyle(index, 3.1)}>
      <path d="M32 113 C32 88 30 70 32 48" stroke="#4a7c3f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M30 84 C19 76 15 62 24 58 C26 70 28 77 30 84Z" fill="#5a9e4a"/>
      <path d="M34 72 C45 64 47 50 38 46 C36 58 35 65 34 72Z" fill="#6ab554" opacity="0.8"/>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 360) / 5 - 90;
        const rad = a * Math.PI / 180;
        return (
          <ellipse key={i} cx={32 + 14 * Math.cos(rad)} cy={30 + 14 * Math.sin(rad)}
            rx="10" ry="13"
            fill={i % 2 === 0 ? "#c2185b" : "#e91e8c"} opacity="0.88"
            transform={`rotate(${a + 90} ${32 + 14 * Math.cos(rad)} ${30 + 14 * Math.sin(rad)})`}
          />
        );
      })}
      <line x1="32" y1="30" x2="32" y2="18" stroke="#fbc02d" strokeWidth="2.5" strokeLinecap="round"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <circle key={i}
          cx={32 + 3 * Math.cos(a * Math.PI / 180)}
          cy={18 + 3 * Math.sin(a * Math.PI / 180)}
          r="1.5" fill="#f9a825"
        />
      ))}
      <circle cx="32" cy="30" r="5" fill="#880e4f" opacity="0.6"/>
    </svg>
  );
}

function PlantRose({ index = 0 }) {
  return (
    <svg width="58" height="115" viewBox="0 0 58 115" className="flower-sway" style={swayStyle(index, 3.3)}>
      <path d="M29 113 C29 88 27 70 29 48" stroke="#4a7c3f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M27 84 C16 76 12 62 21 58 C23 70 25 77 27 84Z" fill="#5a9e4a"/>
      <path d="M28 75 L22 70 L28 72Z" fill="#3d6e32"/>
      <path d="M30 65 L36 60 L30 63Z" fill="#3d6e32"/>
      <path d="M22 52 C18 44 20 36 29 36 C38 36 40 44 36 52 C33 46 29 44 29 44 C29 44 25 46 22 52Z" fill="#4a8040"/>
      <path d="M29 44 C19 40 15 28 22 22 C25 32 27 38 29 44Z" fill="#e53935" opacity="0.85"/>
      <path d="M29 44 C39 40 43 28 36 22 C33 32 31 38 29 44Z" fill="#b71c1c" opacity="0.85"/>
      <path d="M29 44 C24 34 24 20 29 16 C34 20 34 34 29 44Z" fill="#ef5350" opacity="0.75"/>
      <path d="M29 38 C23 34 22 24 28 20 C30 28 30 33 29 38Z" fill="#ff8a80" opacity="0.7"/>
      <path d="M29 38 C35 34 36 24 30 20 C28 28 28 33 29 38Z" fill="#d32f2f" opacity="0.7"/>
      <ellipse cx="29" cy="22" rx="5" ry="6" fill="#e53935" opacity="0.85"/>
      <ellipse cx="29" cy="21" rx="3" ry="3.5" fill="#ff8a80" opacity="0.5"/>
    </svg>
  );
}

function PlantTulip({ index = 0 }) {
  return (
    <svg width="52" height="112" viewBox="0 0 52 112" className="flower-sway" style={swayStyle(index, 2.9)}>
      <path d="M26 110 C26 86 24 68 26 48" stroke="#4a7c3f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M24 78 C14 70 10 58 18 54 C20 66 22 72 24 78Z" fill="#5a9e4a" opacity="0.85"/>
      <path d="M28 68 C38 60 42 48 34 44 C32 56 30 62 28 68Z" fill="#6ab554" opacity="0.75"/>
      <path d="M26 18 C18 26 16 42 26 48 C36 42 34 26 26 18Z" fill="#ce93d8"/>
      <path d="M26 20 C18 30 18 44 26 48 C22 42 20 30 26 20Z" fill="#e1bee7" opacity="0.55"/>
      <path d="M26 18 C34 26 34 42 26 48 C30 42 30 28 26 18Z" fill="#ab47bc" opacity="0.5"/>
      <ellipse cx="26" cy="34" rx="4" ry="8" fill="#f3e5f5" opacity="0.3"/>
    </svg>
  );
}

function PlantDaisy({ index = 0 }) {
  return (
    <svg width="60" height="112" viewBox="0 0 60 112" className="flower-sway" style={swayStyle(index, 3.0)}>
      <path d="M30 110 C30 84 28 66 30 42" stroke="#4a7c3f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M28 78 C18 70 14 58 22 54 C24 66 26 72 28 78Z" fill="#5a9e4a" opacity="0.85"/>
      <path d="M32 67 C42 59 44 45 36 41 C34 53 33 61 32 67Z" fill="#6ab554" opacity="0.75"/>
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="30" cy="28" rx="4.5" ry="11"
          fill="white" opacity="0.94"
          transform={`rotate(${i * 36} 30 28) translate(0 -12)`}
        />
      ))}
      <circle cx="30" cy="28" r="8" fill="#fdd835"/>
      <circle cx="30" cy="28" r="5.5" fill="#f9a825"/>
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle key={i}
          cx={30 + 2.5 * Math.cos(a * Math.PI / 180)}
          cy={28 + 2.5 * Math.sin(a * Math.PI / 180)}
          r="1" fill="#e65100" opacity="0.65"
        />
      ))}
    </svg>
  );
}

function PlantPottedPlant({ index = 0 }) {
  return (
    <svg width="60" height="112" viewBox="0 0 60 112" className="flower-sway" style={swayStyle(index, 2.6)}>
      <path d="M18 108 L20 90 L40 90 L42 108Z" fill="#bf5722"/>
      <rect x="16" y="86" width="28" height="6" rx="2" fill="#d84315"/>
      <ellipse cx="30" cy="87" rx="12" ry="3" fill="#5d4037" opacity="0.8"/>
      <path d="M30 87 C30 72 28 58 30 44" stroke="#388e3c" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M28 68 C18 60 14 48 22 44 C24 56 26 62 28 68Z" fill="#66bb6a"/>
      <path d="M32 58 C42 50 44 38 36 34 C34 46 33 52 32 58Z" fill="#81c784" opacity="0.85"/>
      <path d="M28 54 C20 46 18 36 24 32 C26 42 27 48 28 54Z" fill="#4caf50" opacity="0.8"/>
      <path d="M28 44 C22 38 22 28 28 24 C34 28 34 38 28 44Z" fill="#43a047"/>
      <path d="M30 42 C36 36 42 34 40 26 C34 30 32 36 30 42Z" fill="#66bb6a" opacity="0.75"/>
    </svg>
  );
}

function PlantRicePlant({ index = 0 }) {
  return (
    <svg width="50" height="125" viewBox="0 0 50 125" className="flower-sway" style={swayStyle(index, 2.5)}>
      <path d="M25 123 C25 90 24 68 25 44" stroke="#8d9e3a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M23 80 C12 70 8 55 16 50 C19 63 21 72 23 80Z" fill="#aab840" opacity="0.9"/>
      <path d="M27 68 C38 58 40 43 32 39 C30 52 28 60 27 68Z" fill="#c5cc50" opacity="0.8"/>
      <path d="M24 62 C14 52 12 38 20 34 C22 46 23 54 24 62Z" fill="#9aad3c" opacity="0.75"/>
      <path d="M25 44 C25 34 28 24 30 16" stroke="#c8b400" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 16 + i * 4.5;
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <g key={i}>
            <line x1={30 + i * 0.3} y1={y} x2={30 + side * 6 + i * 0.3} y2={y + 2} stroke="#c8b400" strokeWidth="1" opacity="0.7"/>
            <ellipse cx={30 + side * 7 + i * 0.3} cy={y + 2} rx="3.5" ry="2" fill="#ddc816" opacity="0.9"
              transform={`rotate(${side * 20} ${30 + side * 7 + i * 0.3} ${y + 2})`}/>
          </g>
        );
      })}
    </svg>
  );
}

function SeedUnderground({ index = 0, taskTitle = "" }) {
  const delay = ((index * 0.53) % 2.4).toFixed(2);
  return (
    <div className="flex flex-col items-center group" style={{ position: "relative" }}>
      <svg width="54" height="72" viewBox="0 0 54 72" style={{ display: "block" }}>
        {/* soil surface */}
        <path d="M2 32 Q14 26 27 30 Q40 34 52 28 L52 72 L2 72Z" fill="#7a5230" opacity="0.55"/>
        <rect x="2" y="42" width="50" height="30" rx="0" fill="#5c3a1e" opacity="0.35"/>
        {/* roots */}
        <path d="M27 50 C22 56 18 60 20 66" stroke="#8d5524" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M27 50 C32 58 34 62 30 68" stroke="#8d5524" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M27 50 C27 56 26 62 27 68" stroke="#8d5524" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
        {/* seed */}
        <ellipse cx="27" cy="46" rx="9" ry="6.5" fill="#c8a060"
          style={{ animation: `seedPulse 2.8s ease-in-out ${delay}s infinite` }}
        />
        <path d="M20 46 C24 42 30 42 34 46 C30 50 24 50 20 46Z" fill="#a07840" opacity="0.5"/>
        {/* tiny sprout breaking surface */}
        <path d="M27 30 C27 26 26 22 27 18" stroke="#5aaa38" strokeWidth="1.8" strokeLinecap="round" fill="none"
          style={{ animation: `sproutGrow 2.8s ease-in-out ${delay}s infinite` }}
        />
        <path d="M27 20 C23 16 20 10 24 8 C25 13 26 16 27 20Z" fill="#78c850" opacity="0.85"
          style={{ animation: `sproutGrow 2.8s ease-in-out ${delay}s infinite` }}
        />
        {/* soil crumbles */}
        <circle cx="18" cy="33" r="1.5" fill="#8d6030" opacity="0.45"/>
        <circle cx="34" cy="31" r="1" fill="#8d6030" opacity="0.35"/>
        <circle cx="22" cy="35" r="1" fill="#6b4820" opacity="0.4"/>
      </svg>
      {/* hover tooltip */}
      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
        bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300
        text-xs rounded-lg px-2 py-1 whitespace-nowrap shadow
        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
        border border-gray-100 dark:border-gray-700"
        style={{ fontSize: 10 }}
      >
        🌱 {taskTitle}
      </div>
    </div>
  );
}

function PlantFlower({ plantType, index }) {
  const key = getPlantKey(plantType);
  const props = { index };
  switch (key) {
    case "seedling":       return <PlantSeedling {...props}/>;
    case "herb":           return <PlantHerb {...props}/>;
    case "cherry_blossom": return <PlantCherryBlossom {...props}/>;
    case "sunflower":      return <PlantSunflower {...props}/>;
    case "hibiscus":       return <PlantHibiscus {...props}/>;
    case "rose":           return <PlantRose {...props}/>;
    case "tulip":          return <PlantTulip {...props}/>;
    case "daisy":          return <PlantDaisy {...props}/>;
    case "potted_plant":   return <PlantPottedPlant {...props}/>;
    case "rice_plant":     return <PlantRicePlant {...props}/>;
    default:               return <PlantSeedling {...props}/>;
  }
}
function GrassBlade({ x, h = 20, lean = 0 }) {
  return (
    <path
      d={`M${x} 100 C${x + lean} ${100 - h * 0.55} ${x + lean * 1.6} ${100 - h * 0.85} ${x + lean * 2.2} ${100 - h}`}
      stroke="#4a8040" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.65"
    />
  );
}

export default function AllTasks() {
  const { tasks, completeTask } = useApp();

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks   = tasks.filter(t => !t.completed);

  const plantsByCategory = completedTasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {});

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(tasks.map(t => t.category));
    return ["all", ...Array.from(cats)];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "active")    filtered = filtered.filter(t => !t.completed);
    if (filter === "completed") filtered = filtered.filter(t => t.completed);
    if (selectedCategory !== "all") filtered = filtered.filter(t => t.category === selectedCategory);
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name")   return a.title.localeCompare(b.title);
      if (sortBy === "growth") return b.growthStage - a.growthStage;
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
    return filtered;
  }, [tasks, filter, selectedCategory, searchQuery, sortBy]);

  const allGardenTasks = [...completedTasks, ...pendingTasks];

  return (
    <>
      <style>{`
        @keyframes sway {
          0%   { transform: rotate(-2.5deg); }
          50%  { transform: rotate(2.5deg); }
          100% { transform: rotate(-2.5deg); }
        }
        .flower-sway { animation: sway 3.2s ease-in-out infinite; display: block; }
        @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
        }
        @keyframes seedPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.08); }
        }
        @keyframes sproutGrow {
          0%, 100% { opacity: 0.7; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold">All Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track all your growing tasks
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input type="text" placeholder="Search tasks..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <option value="date">Due Date</option>
                <option value="name">Name</option>
                <option value="growth">Growth</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTasks.length} tasks
          </p>

          {/* TASK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onComplete={() => completeTask(task.id)}/>
            ))}
          </div>

          <div className="space-y-6 mt-16">

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Garden</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  A beautiful collection of your completed tasks
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-lg">
                <Trophy className="w-5 h-5 text-emerald-600"/>
                <span className="font-semibold text-emerald-900">
                  {completedTasks.length} Plants
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-5 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"/>
                Bloomed ({completedTasks.length})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-300"/>
                Seeds in soil ({pendingTasks.length})
              </span>
            </div>

            {/* GARDEN SCENE */}
            <div
           className="relative rounded-2xl overflow-hidden border border-emerald-100"
          style={{
          minHeight: 340,
          background: "linear-gradient(to bottom, #b3e5fc 0%, #c8f0d8 52%, #8bc34a 100%)",
          }}
        >

        {/* 🌙 NIGHT OVERLAY */}
        <div className="absolute inset-0 hidden dark:block"
        style={{
         background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #14532d 100%)"
        }}
        />

        {/* 🌙 MOON */}
        <div className="hidden dark:block absolute top-5 right-8">
        <div className="w-12 h-12 rounded-full bg-gray-200 relative shadow-lg">
      <div className="absolute left-3 w-12 h-12 rounded-full bg-gray-900" />
    </div>
  </div>

        {/* ☀️ SUN */}
      <div className="block dark:hidden absolute top-5 right-8 rounded-full"
      style={{
      width: 52,
      height: 52,
      background: "radial-gradient(circle at 38% 38%, #fff176, #fdd835)",
      boxShadow: "0 0 40px 12px #fdd83555",
    }}
  />

      {/* ⭐ STARS */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${Math.random() * 60}%`,
          left: `${Math.random() * 100}%`,
          width: 2,
          height: 2,
          background: "white",
          borderRadius: "50%",
          animation: `twinkle 2s infinite ${i * 0.1}s`,
        }}
      />
    ))}
  </div>

              {/* Clouds */}
              <div className="block dark:hidden">
              <div className="absolute top-8 left-16 opacity-70">
                <svg width="90" height="36" viewBox="0 0 90 36">
                  <ellipse cx="45" cy="24" rx="40" ry="14" fill="white"/>
                  <ellipse cx="30" cy="22" rx="22" ry="16" fill="white"/>
                  <ellipse cx="58" cy="20" rx="20" ry="15" fill="white"/>
                </svg>
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-45">
                <svg width="68" height="28" viewBox="0 0 68 28">
                  <ellipse cx="34" cy="18" rx="30" ry="11" fill="white"/>
                  <ellipse cx="22" cy="16" rx="16" ry="12" fill="white"/>
                  <ellipse cx="46" cy="15" rx="15" ry="11" fill="white"/>
                </svg>
              </div>
              </div>

              {/* Rolling hills + grass */}
              <svg viewBox="0 0 800 160" preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full" style={{ height: 160 }}>
                <path d="M0 110 Q200 50 400 90 Q600 130 800 70 L800 160 L0 160Z" fill="#7cb342" opacity="0.4"/>
                <path d="M0 128 Q150 94 360 112 Q560 130 800 100 L800 160 L0 160Z" fill="#558b2f"/>
                {Array.from({ length: 44 }).map((_, i) => (
                  <GrassBlade key={i} x={i * 19 + 4} h={12 + (i % 5) * 3} lean={(i % 3) - 1}/>
                ))}
              </svg>

              {/* Empty state */}
              {allGardenTasks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-emerald-700 text-sm font-medium opacity-70">
                    Add tasks to start your garden 🌱
                  </p>
                </div>
              )}

              {/* PLANTS + SEEDS ROW */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end px-6"
                style={{ paddingBottom: 24, gap: 0, flexWrap: "wrap" }}
              >
                {allGardenTasks.map((task, i) => (
                  <div
                    key={task.id}
                    className="flex flex-col items-center group"
                    style={{
                      flex: "0 0 auto",
                      marginRight: i < allGardenTasks.length - 1 ? "clamp(6px, 2.5vw, 28px)" : 0,
                      position: "relative",
                    }}
                  >
                    {task.completed ? (
                      <>
                        <PlantFlower plantType={task.plantType} index={i}/>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                          bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200
                          text-xs rounded-lg px-2 py-1 whitespace-nowrap shadow-md
                          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                          border border-gray-100 dark:border-gray-700"
                          style={{ backdropFilter: "blur(4px)", fontSize: 10 }}
                        >
                          ✅ {task.title} <span className="text-gray-400">({String(task.plantType)})</span>
                        </div>
                      </>
                    ) : (
                      <SeedUnderground index={i} taskTitle={task.title}/>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(plantsByCategory).map(([category, plants]) => (
                <div key={category}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-3">{category}</h3>
                  <div className="flex gap-1 mb-3 items-end" style={{ height: 56 }}>
                    {plants.map((p, i) => (
                      <div key={p.id} style={{ transform: "scale(0.5)", transformOrigin: "bottom left", marginRight: -20 }}>
                        <PlantFlower plantType={p.plantType} index={i}/>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {plants.length} plant{plants.length !== 1 ? "s" : ""} grown
                  </p>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">Garden Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Plants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(plantsByCategory).length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {new Set(completedTasks.map(t => t.plantType)).size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plant Types</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}