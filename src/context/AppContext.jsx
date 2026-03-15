import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [searchQuery, setSearchQuery] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish React Project",
      description: "Complete the Bloomly UI",
      category: "School",
      growthStage: 1,
      completed: false,
      dueDate: "2026-03-20"
    },
    {
      id: 2,
      title: "Workout",
      description: "30 minutes cardio",
      category: "Health",
      growthStage: 2,
      completed: false,
      dueDate: "2026-03-18"
    }
  ]);

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  return (
    <AppContext.Provider
      value={{
        tasks,
        completeTask,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}