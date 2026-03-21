import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";

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

        {/* With sidebar toggle */}
        <Route element={<DashboardLayout />}>
          <Route path="/tasks" element={<AllTasks />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;