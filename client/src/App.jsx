import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import { useState } from "react"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import GameEdit from "./components/game-edit/GameEdit"
import UserContext from "./contexts/UserContext"

function App() {

    const [user, setUser] = useState(null);

    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

    const registerHandler = async (email, password) => {
        console.log(email);

        const newUser = { email, password };


        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        const result = await response.json();

        setUser(result);

        console.log(result);
    }

    const loginHandler = (email, password) => {

        if (!user) {
            throw new Error('Invalid email or password!');
        }
        setUser(user);
    }

    const logoutHandler = () => {
        setUser(null);
    }

    const userContextValue = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,

    }


    return (
        <UserContext.Provider value={userContextValue}>

            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
                <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details/" element={< Details user={user} />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />

            </Routes>

            <Footer />
        </UserContext.Provider>
    )
}

export default App
