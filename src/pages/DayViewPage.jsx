import { Link, useParams } from "react-router"
import {
    addDays,
    dayLabel,
    parseDateKey,
    toDateKey,
    toMonthKey,
} from "../utils/calendar";

export default function DayViewPage(){
    const { date: dateKey } = useParams();
    const date = parseDateKey(dateKey);

    // The month grid only ever links to valid keys, so this catches typed, edited and
    // bookmarked URLs — "2026-02-31" parses as a real Date without it.
    if (date === null) {
        return(
            <div className="p-4">
                <h1 className="text-lg">That date doesn&apos;t exist</h1>
                <p className="mt-1 text-sm text-neutral-600">
                    <span className="font-mono">{dateKey}</span> isn&apos;t a day on the calendar.
                </p>
                <Link to="/calendar/month" className="mt-4 inline-block underline">
                    Back to the calendar
                </Link>
            </div>
        );
    }

    const previousDay = toDateKey(addDays(date, -1));
    const nextDay = toDateKey(addDays(date, 1));

    return(
        <div className="p-4">
            {/* Back to the month being viewed, not the current one — otherwise browsing
                last March and clicking a day strands you in today's month. */}
            <div className="flex items-center gap-4">
                <Link to={`/calendar/month?m=${toMonthKey(date)}`}>Back to month</Link>
                <Link to={`/calendar/day/${previousDay}`} aria-label="Previous day">‹</Link>
                <Link to={`/calendar/day/${nextDay}`} aria-label="Next day">›</Link>
            </div>

            <h1 className="mt-4 text-lg">{dayLabel(date)}</h1>
        </div>
    );
}
