const pad = (n) => String(n).padStart(2, "0");

// Local date parts, not toISOString(): toISOString converts to UTC, which shifts the
// date back a day for timezones behind UTC.
export function toDateKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toMonthKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

// Returns the day, or null if the string is missing or malformed so the caller can show
// a not-found state instead of rendering a garbage date.
export function parseDateKey(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
    if (!match) return null;

    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));

    // new Date(2026, 1, 31) silently rolls forward to March 3 rather than failing, so
    // range-checking the parts isn't enough. The round trip is what rejects "2026-02-31".
    return toDateKey(date) === value ? date : null;
}

// Returns the first of the month, or null if the string is missing or malformed so the
// caller can fall back to today.
export function parseMonthKey(value) {
    const match = /^(\d{4})-(\d{2})$/.exec(value ?? "");
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    if (month < 0 || month > 11) return null;

    return new Date(year, month, 1);
}

export function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// New Date, count may be negative. Reading the parts back out drops any time-of-day, so
// this also serves as "local midnight of". Day 0 and 32 roll the month over on their own.
export function addDays(date, count) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
}

// Flat list of grid cells: null for the blanks before the 1st and after the last day,
// a Date for every real day. Length is always a multiple of 7.
export function buildMonthCells(year, month) {
    const leadingBlanks = new Date(year, month, 1).getDay();
    const dayCount = new Date(year, month + 1, 0).getDate();

    const cells = Array(leadingBlanks).fill(null);
    for (let day = 1; day <= dayCount; day++) {
        cells.push(new Date(year, month, day));
    }
    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    return cells;
}

// Comparing date keys rather than Dates: the keys are fixed-width, so a string compare is
// exact, and it sidesteps time-of-day entirely — no need to zero out hours on either side.
export function isToday(date) {
    return toDateKey(date) === toDateKey(new Date());
}

export function isPast(date) {
    return toDateKey(date) < toDateKey(new Date());
}

export function monthLabel(date) {
    return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function dayLabel(date) {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}
