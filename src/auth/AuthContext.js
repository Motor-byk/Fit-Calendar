import { createContext, useContext } from "react";

// Split from AuthProvider.jsx so neither file exports a mix of components and hooks —
// react-refresh's lint rule rejects that pairing.
export const AuthContext = createContext(null);

export function useAuth() {
    const value = useContext(AuthContext);
    if (value === null) throw new Error("useAuth must be used inside <AuthProvider>");
    return value;
}

// Most callers only want to know who is signed in. Reading the user through this rather
// than from src/data keeps pages unaware of how the session is stored, which is what lets
// the passwordless picker be swapped for real login without touching them.
export function useCurrentUser() {
    return useAuth().user;
}
