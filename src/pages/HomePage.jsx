import { Link } from "react-router"
import { useCurrentUser } from "../auth/AuthContext";

export default function HomePage(){
    const user = useCurrentUser();

    return(
        <div className="p-4">
            <h1 className="text-lg">Hey {user.displayName}</h1>
            <Link to="/calendar/month" className="mt-2 inline-block underline">To Month View</Link>
        </div>
    );
}
