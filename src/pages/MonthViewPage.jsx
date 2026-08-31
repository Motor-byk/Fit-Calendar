import { useEffect } from "react";
import { Link, useSearchParams } from "react-router"
import {
    buildMonthCells,
    monthLabel,
    parseMonthKey,
    toDateKey,
    toMonthKey,
} from "../utils/calendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfThisMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
}

export default function MonthViewPage(){
    const [params, setParams] = useSearchParams();
    const monthKey = params.get("m");
    const viewMonth = parseMonthKey(monthKey) ?? startOfThisMonth();

    // Arriving without a usable ?m= still renders the current month, so write that month
    // back into the URL — otherwise the address bar says nothing until you page months,
    // and it can't be copied or bookmarked.
    useEffect(() => {
        if (parseMonthKey(monthKey)) return;
        setParams({ m: toMonthKey(startOfThisMonth()) }, { replace: true });
    }, [monthKey, setParams]);

    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const cells = buildMonthCells(year, month);

    // replace: true so paging months doesn't stack up history entries. Month -1 and 12
    // roll the year over on their own.
    function goToMonth(offset) {
        const target = new Date(year, month + offset, 1);
        setParams({ m: toMonthKey(target) }, { replace: true });
    }

    // Written out rather than cleared: dropping the param would just be refilled by the
    // effect above, costing an extra render and a flicker in the URL.
    function goToToday() {
        setParams({ m: toMonthKey(startOfThisMonth()) }, { replace: true });
    }

    const cellStyles = "h-24 overflow-hidden border border-solid border-[#ccc]"
    return(
        <div>
            <div className="flex items-center gap-4">
                <Link to="/">Home</Link>
                <button onClick={() => goToMonth(-1)} aria-label="Previous month">‹</button>
                <span className="min-w-48">{monthLabel(viewMonth)}</span>
                <button onClick={() => goToMonth(1)} aria-label="Next month">›</button>
                <button onClick={goToToday}>Today</button>
            </div>

            <div className="grid grid-cols-7">
                {WEEKDAYS.map((weekday) => (
                    <div key={weekday} className="p-1 border border-solid border-[#ccc]">{weekday}</div>
                ))}

                {cells.map((date, index) =>
                    date === null ? (
                        <div key={`blank-${index}`} className={cellStyles}/>
                    ) : (
                        <div key={toDateKey(date)} className={cellStyles}>
                            <Link to={`/calendar/day/${toDateKey(date)}`} className="block h-full p-1">
                                {date.getDate()}
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
