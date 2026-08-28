import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage";
import MonthViewPage from "./pages/MonthViewPage";
import DayViewPage from "./pages/DayViewPage";

function App() {

  return (
    <div>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="calendar" element={<MonthViewPage/>}/>
            <Route path="calendar/day" element={<DayViewPage/>}/>
        </Routes>
    </div>
  );
}

export default App
