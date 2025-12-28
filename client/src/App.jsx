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

function App() {

    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [user, setUser] = useState(null);

    const registerHandler = (email, password) => {
        console.log(email);

        if (registeredUsers.some(user => user.email === email)) {

            throw new Error('Email is taken!');

        }
        setRegisteredUsers((state) => ([...state, { email, password }]));
    }

    const loginHandler = (email, password) => {

        const user = registeredUsers.find(u => u.email === email && u.password === password)
        if (!user) {
            throw new Error('Invalid email or password!');
        }
        setUser(user);
    }


    return (
        <>

            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register onRegister={registerHandler} />} />
                <Route path="/login" element={<Login onLogin={loginHandler} />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details/" element={< Details />} />
                <Route path="/games/create" element={<GameCreate />} />

            </Routes>

            <Footer />
        </>
    )
}

export default App
