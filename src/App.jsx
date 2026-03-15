import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/tasks" element={<AllTasks />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;