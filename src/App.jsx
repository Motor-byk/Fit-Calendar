import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage";
import MonthViewPage from "./pages/MonthViewPage";
import WeekViewPage from "./pages/WeekViewPage";
import DayViewPage from "./pages/DayViewPage";

function App() {

  return (
    <div>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="calendar/month" element={<MonthViewPage/>}/>
            <Route path="calendar/week" element={<WeekViewPage/>}/>
            <Route path="calendar/day" element={<DayViewPage/>}/>
        </Routes>
    </div>
  );
}

export default App
