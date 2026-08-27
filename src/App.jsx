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
            <Route path="/Calendar/Month" element={<MonthViewPage/>}/>
            <Route path="/Calendar/Week" element={<WeekViewPage/>}/>
            <Route path="/Calendar/Day" element={<DayViewPage/>}/>
        </Routes>
    </div>
  );
}

export default App
