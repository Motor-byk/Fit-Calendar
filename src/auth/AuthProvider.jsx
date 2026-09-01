import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import * as auth from "../data/auth";

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading");

    // Restoring the session is async, so for one render nobody has checked yet and `user`
    // is null. That is not the same as being signed out, which is why `status` exists —
    // without it RequireUser would bounce every refresh to /signin and straight back.
    useEffect(() => {
        let cancelled = false;
        auth.getCurrentUser().then((restored) => {
            if (cancelled) return;
            setUser(restored);
            setStatus("ready");
        });
        return () => { cancelled = true; };
    }, []);

    const signIn = useCallback(async (userId) => {
        setUser(await auth.signIn(userId));
    }, []);

    const signOut = useCallback(async () => {
        await auth.signOut();
        setUser(null);
    }, []);

    // Memoized so consumers don't re-render on every provider render just because the
    // context object was rebuilt.
    const value = useMemo(
        () => ({ user, status, signIn, signOut }),
        [user, status, signIn, signOut],
    );

    return <AuthContext value={value}>{children}</AuthContext>;
}
