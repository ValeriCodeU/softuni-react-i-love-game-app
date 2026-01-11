import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: ''
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
});

export function UserProvider(props) {

    const [user, setUser] = useState(null);
    const { request } = useRequest();



    const registerHandler = async (email, password) => {
        console.log(email);

        const newUser = { email, password };

        const result = await request('/users/register', 'POST', newUser);


        setUser(result);

        console.log(result);
    }

    const loginHandler = async (email, password) => {


        const result = await request('/users/login', 'POST', { email, password });

        console.log(user);

        setUser(result);
    }

    const logoutHandler = async () => {

        await request('/users/logout');
        // setUser(null);

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
            {props.children }
        </UserContext.Provider>

    );
}

export default UserContext;