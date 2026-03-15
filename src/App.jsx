import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>

      <div className="flex">

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

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;