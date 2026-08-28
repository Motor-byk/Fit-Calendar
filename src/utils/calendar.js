const pad = (n) => String(n).padStart(2, "0");

// Local date parts, not toISOString(): toISOString converts to UTC, which shifts the
// date back a day for timezones behind UTC.
export function toDateKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toMonthKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
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

export function monthLabel(date) {
    return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}
