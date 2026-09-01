import { Navigate, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function RequireUser({ children }){
    const { user, status } = useAuth();
    const location = useLocation();

    // Wait for the session check. Redirecting on `user === null` alone would send every
    // refresh to /signin for a frame before landing back where it started.
    if (status === "loading") return <div className="p-4 text-sm text-neutral-600">Loading…</div>;

    // `state` remembers where they were headed so signing in can return them there rather
    // than always dumping them on the home page.
    if (user === null) return <Navigate to="/signin" replace state={{ from: location }}/>;

    return children;
}
