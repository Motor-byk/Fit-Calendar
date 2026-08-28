import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage";
import MonthViewPage from "./pages/MonthViewPage";
import DayViewPage from "./pages/DayViewPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <div>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="calendar/month" element={<MonthViewPage/>}/>
            <Route path="calendar/day/:date" element={<DayViewPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
  );
}

export default App
