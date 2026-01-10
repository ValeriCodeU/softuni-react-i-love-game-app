import { createContext } from "react";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToker: ''
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandlerm() { },
});

export default UserContext;