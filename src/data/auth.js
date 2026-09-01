import { USERS, findUser } from "./users";

// The session is the one thing that outlives a refresh. Everything else in src/data is
// in-memory on purpose; a session id survives because real auth persists a token too, so
// this line stays roughly as-is once there is a backend.
const SESSION_KEY = "fit-calendar.currentUserId";

// localStorage throws outright in some privacy modes, so every access is guarded — a
// browser that refuses to store just means you sign in again.
function readStoredId() {
    try {
        return window.localStorage.getItem(SESSION_KEY);
    } catch {
        return null;
    }
}

function writeStoredId(userId) {
    try {
        if (userId === null) window.localStorage.removeItem(SESSION_KEY);
        else window.localStorage.setItem(SESSION_KEY, userId);
    } catch {
        // Ignored: the session just won't survive the next refresh.
    }
}

// Async because every accessor in src/data is, so swapping in fetch() later is a change
// of body rather than a change of signature at the call site.
export async function listProfiles() {
    return USERS;
}

// Resolves the stored id against the seed rather than trusting it. A profile that no
// longer exists reads as signed out instead of blowing up on user.displayName later.
export async function getCurrentUser() {
    return findUser(readStoredId());
}

export async function signIn(userId) {
    const user = findUser(userId);
    if (user === null) throw new Error(`No such profile: ${userId}`);

    writeStoredId(user.id);
    return user;
}

export async function signOut() {
    writeStoredId(null);
}
