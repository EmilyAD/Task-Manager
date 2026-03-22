import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import TasksByCategory from "./pages/TaskByCategory";
import AddEditTask from "./pages/AddEditTask";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages WITH sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/categories" element={<TasksByCategory />} />
          <Route path="/add-task" element={<AddEditTask />} />
          <Route path="/edit-task/:id" element={<AddEditTask />} />
        </Route>

        {/* Pages WITHOUT sidebar (auth pages) */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;