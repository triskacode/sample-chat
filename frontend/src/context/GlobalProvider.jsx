import React, { createContext, useEffect, useReducer } from "react";

const initialState = {
    error: {},
    darkMode: false,
    sidebarShow: true,
    loading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set_error":
            return { ...state, error: action.payload };
        case "set_dark_mode":
            return { ...state, darkMode: action.payload };
        case "set_sidebar_show":
            return { ...state, sidebarShow: action.payload };
        case "set_loading":
            return { ...state, loading: action.payload };
        default:
            throw new Error("bad request type.");
    }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [global, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const darkMode = localStorage.getItem("dark_mode") === "true";
        if (darkMode !== null) {
            dispatch({ type: "set_dark_mode", payload: darkMode });
        }

        const sidebarShow = localStorage.getItem("sidebar_show") === "true";
        if (sidebarShow !== null) {
            dispatch({ type: "set_sidebar_show", payload: sidebarShow });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("dark_mode", global.darkMode);
    }, [global.darkMode]);

    useEffect(() => {
        localStorage.setItem("sidebar_show", global.sidebarShow);
    }, [global.sidebarShow]);

    return (
        <GlobalContext.Provider value={{ global, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
