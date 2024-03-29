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
        const oldGlobal = JSON.parse(localStorage.getItem("global"));

        if (oldGlobal?.darkMode) {
            dispatch({ type: "set_dark_mode", payload: oldGlobal.darkMode });
        }

        if (oldGlobal?.sidebarShow) {
            dispatch({ type: "set_sidebar_show", payload: oldGlobal.sidebarShow });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("global", JSON.stringify(global));
    }, [global]);

    return (
        <GlobalContext.Provider value={{ global, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
