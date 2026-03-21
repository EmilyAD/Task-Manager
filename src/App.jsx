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

<<<<<<< HEAD
        {/* With sidebar toggle */}
        <Route element={<DashboardLayout />}>
          <Route path="/tasks" element={<AllTasks />} />
        </Route>
=======
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 p-6">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<AllTasks />} />
           <Route path="/login" element={<LogIn />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />



          </Routes>

        </div>

      </div>
>>>>>>> a5e72579c0da19fd760db88c6393a3ea1ebae5dd

      </Routes>
    </BrowserRouter>
  );
}

export default App;