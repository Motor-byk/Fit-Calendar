import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage";
import MonthViewPage from "./pages/MonthViewPage";
import DayViewPage from "./pages/DayViewPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireUser from "./components/RequireUser";
import ProfileBar from "./components/ProfileBar";

function App() {

  return (
    <div>
        {/* Renders nothing while signed out, so /signin and the 404 stay bare. */}
        <ProfileBar/>

        <Routes>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route index element={<RequireUser><HomePage/></RequireUser>}/>
            <Route path="/calendar/month" element={<RequireUser><MonthViewPage/></RequireUser>}/>
            <Route path="/calendar/day/:date" element={<RequireUser><DayViewPage/></RequireUser>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
  );
}

export default App
