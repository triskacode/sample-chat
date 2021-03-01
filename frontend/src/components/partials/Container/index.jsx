import React, { useContext } from "react";
import { GlobalContext } from "../../../context";
import "./index.css";

export const Container = ({ children }) => {
    const {
        global: { darkMode },
    } = useContext(GlobalContext);

    return (
        <div
            className={`w-screen h-screen transition duration-200 overflow-hidden ease-in-out ${
                darkMode === true ? "dark" : ""
            }`}
        >
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 dark:text-white">
                {children}
            </div>
        </div>
    );
};
