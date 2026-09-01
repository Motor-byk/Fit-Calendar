import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { listProfiles } from "../data/auth";

// The only file that assumes sign-in is passwordless. When real authentication lands this
// becomes a username/password form; nothing else in the app has to change, because every
// other file only ever asks the auth context for a user with an id.
export default function SignInPage(){
    const { user, status, signIn } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let cancelled = false;
        listProfiles().then((loaded) => {
            if (!cancelled) setProfiles(loaded);
        });
        return () => { cancelled = true; };
    }, []);

    // Already signed in — usually from hitting /signin directly, or from a refresh that
    // restored the session. RequireUser stashes where they were headed.
    if (status === "ready" && user !== null) {
        return <Navigate to={location.state?.from?.pathname ?? "/calendar/month"} replace/>;
    }

    async function choose(userId) {
        await signIn(userId);
        navigate(location.state?.from?.pathname ?? "/calendar/month", { replace: true });
    }

    return(
        <div className="mx-auto max-w-md p-4">
            <h1 className="text-lg">Who&apos;s planning today?</h1>

            <div className="mt-4 flex flex-col gap-2">
                {profiles.map((profile) => (
                    <button
                        key={profile.id}
                        onClick={() => choose(profile.id)}
                        className="flex items-center gap-3 border border-solid border-[#ccc] p-2 text-left hover:bg-neutral-50"
                    >
                        <img
                            src={profile.avatarUrl}
                            alt=""
                            className="h-10 w-10 rounded-full bg-neutral-200 object-cover"
                        />
                        <span>{profile.displayName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
