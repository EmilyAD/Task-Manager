import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      description: "Write and submit the Q2 project proposal document",
      category: "Work",
      dueDate: "Mar 20",
      growthStage: 75,
      completed: false,
      plantType: "🌱",
      completedAt: null
    },
    {
      id: 2,
      title: "Team meeting preparation",
      description: "Prepare slides for weekly team meeting",
      category: "Work",
      dueDate: "Mar 17",
      growthStage: 50,
      completed: false,
      plantType: "🌿",
      completedAt: null
    },
    {
      id: 3,
      title: "Grocery shopping",
      description: "Buy ingredients for meal prep",
      category: "Personal",
      dueDate: "Mar 16",
      growthStage: 25,
      completed: false,
      plantType: "🌻",
      completedAt: null
    },
    {
      id: 4,
      title: "Morning meditation",
      description: "Daily 15-minute meditation session",
      category: "Personal",
      dueDate: "Mar 15",
      growthStage: 100,
      completed: true,
      plantType: "🌸",
      completedAt: new Date()
    },
    {
      id: 5,
      title: "Read 30 pages",
      description: 'Continue reading "Atomic Habits"',
      category: "Learning",
      dueDate: "Mar 14",
      growthStage: 100,
      completed: true,
      plantType: "🌺",
      completedAt: new Date()
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const completeTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed: true,
            growthStage: 100,
            completedAt: new Date()
          }
        : task
    ));
  };

  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        growthStage: 0,
        completed: false,
        plantType: "🌱",
        completedAt: null
      }
    ]);
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('app_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'New User',
      email: 'user@example.com',
      profilePicture: null,
      joinDate: new Date().toISOString(),
      bio: ''
    };
  });

  const updateProfile = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('app_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        completeTask,
        addTask,
        user,
        updateProfile,
        theme,        
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}