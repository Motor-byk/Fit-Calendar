import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function ProfileBar(){
    const { user, signOut } = useAuth();
    if (user === null) return null;

    return(
        <div className="flex items-center gap-3 border-b border-solid border-[#ccc] p-2">
            <img
                src={user.avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full bg-neutral-200 object-cover"
            />
            <span className="text-sm">{user.displayName}</span>

            <nav className="ml-auto flex items-center gap-4 text-sm">
                <Link to="/calendar/month">Calendar</Link>
                <button onClick={signOut} className="underline">Sign out</button>
            </nav>
        </div>
    );
}
