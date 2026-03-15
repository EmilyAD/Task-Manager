import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

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

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        completeTask,
        addTask
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}