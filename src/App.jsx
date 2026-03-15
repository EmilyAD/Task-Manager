import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import LogIn from "./pages/LogIn";

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

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;