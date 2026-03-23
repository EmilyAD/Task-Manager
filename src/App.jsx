import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import AddEditTask from "./pages/AddEditTask";
import TasksByCategory from "./pages/TasksByCategory";
import  {Profile}  from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public (NO sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-task" element={<AddEditTask/>}/>
        <Route path="/category" element={<TasksByCategory/>}/>

             

        {/* With sidebar toggle */}
        <Route element={<DashboardLayout />}>
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/profile" element={<Profile />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  );

}

export default App;