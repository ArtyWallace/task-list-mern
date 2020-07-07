import { createContext } from "react";

const dummy = () => {};

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: dummy,
    logout: dummy,
    isAuth: false
});