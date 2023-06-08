import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Acceuil</Link>
            <Link to="/SignUp">sign up</Link>
        </nav>
    )
}