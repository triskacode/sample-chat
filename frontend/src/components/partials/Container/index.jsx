import React, { useContext } from "react";
import { GlobalContext } from "../../../context";
import "./index.css";

const Container = ({ children }) => {
    const {
        global: { darkMode },
    } = useContext(GlobalContext);

    return (
        <div className={`w-screen h-screen transition duration-200 ease-in-out ${darkMode ? "dark" : ""}`}>
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 dark:text-white">
                {children}
            </div>
        </div>
    );
};

export default Container;
