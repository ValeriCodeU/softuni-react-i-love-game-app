import { Route, Routes } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import GameEdit from "./components/game-edit/GameEdit"
import UserContext from "./contexts/UserContext"
import { useContext } from "react"


function App() {

    const { user } = useContext(UserContext);

    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

    return (
        <>
            <Header user={user} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/games" element={<Catalog />} />
                <Route path="/games/:gameId/details/" element={< Details user={user} />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />

            </Routes>

            <Footer />
        </>
    )
}

export default App
