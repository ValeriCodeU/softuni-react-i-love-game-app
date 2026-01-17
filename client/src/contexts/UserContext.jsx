import { createContext, useContext, useState } from "react";
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

        setUser(result);
    }

    const logoutHandler = () => {

        const token = user.accessToken;

        // if(!token){
        //     setUser(null);
        //     return Promise.resolve();
        // }

        return request('/users/logout', null, null, { accessToken: token })
            .finally(() => setUser(null));

        // await request('/users/logout', { accessToken: user.accessToken });
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
            {props.children}
        </UserContext.Provider>

    );
}

// export const useUserContext = () => {

//     const contextData = useContext(UserContext);

//     return contextData;
// }

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;