import { Link } from "react-router";

export default function Header({
    user
}) {
    return (

        <header>
            {/* <!-- Navigation --> */}
            <nav>
                <Link className="home" to="/"> <img src="./images/logo.png" alt="logo" /> </Link>
                <Link to="/games">Catalog</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to="/games/create">Add Game</Link>
                    <Link to="logout">Logout</Link>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>

            </nav>
            <div>
                <p style={{ color: 'white', textAlign: 'end' }}>{user?.email}</p>
            </div>
        </header>
    );
}