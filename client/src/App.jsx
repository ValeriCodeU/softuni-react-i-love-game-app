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
import useRequest from "./hooks/useRequest"


function App() {

    const [user, setUser] = useState(null);
    const { request } = useRequest();

    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

    const registerHandler = async (email, password) => {
        console.log(email);

        const newUser = { email, password };


        // const response = await fetch('http://localhost:3030/users/register', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newUser)
        // });

        // const result = await response.json();



        const result = await request('/users/register', 'POST', newUser);


        setUser(result);

        console.log(result);
    }

    const loginHandler = async (email, password) => {

        // if (!user) {
        //     throw new Error('Invalid email or password!');
        // }


        const result = await request('/users/login', 'POST', { email, password });

        console.log(user);

        setUser(result);
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
                <Route path="/login" element={<Login />} />
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
