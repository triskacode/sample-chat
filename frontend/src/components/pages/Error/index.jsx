import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../context";
import "./index.css";

export const Error = () => {
    const {
        global: { darkMode, error: globalError },
        dispatch,
    } = useContext(GlobalContext);
    const history = useHistory();
    const [error, setError] = useState({});

    const toggleDarkMode = () => {
        return dispatch({ type: "set_dark_mode", payload: !darkMode });
    };

    const redirectHome = () => {
        dispatch({ type: "set_error", payload: {} });
        return history.push("/");
    };

    useEffect(() => {
        if (!globalError.code) {
            setError({
                code: 408,
                status: "Request Time Out",
                message: "You are offline.",
            });
        } else {
            setError(globalError);
        }

        console.log(globalError)
    }, [globalError]);

    if (!globalError || Object.keys(globalError).length === 0) {
        return;
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex-none h-14 w-full flex justify-between items-center text-violet-700 dark:text-violet-500">
                <button
                    onClick={redirectHome}
                    className="group w-12 h-12 mb-2 flex justify-center items-center appearance-none focus:outline-none cursor-pointer"
                >
                    <svg
                        className="w-6 h-6 fill-current transition duration-200 transform group-hover:scale-125"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 35 32"
                    >
                        <path d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z" />
                        <path d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z" />
                    </svg>
                </button>
                <button
                    onClick={toggleDarkMode}
                    className="group w-12 h-12 flex justify-center items-center appearance-none focus:outline-none cursor-pointer"
                >
                    {darkMode ? (
                        <svg
                            className="w-6 h-6 transition duration-200 transform group-hover:scale-125"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 transition duration-200 transform group-hover:scale-125"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className="flex-1 w-full flex flex-col justify-center items-center">
                <span className="text-2xl text-gray-500 dark:text-gray-400">
                    {`${error.code} | ${error.status}`}
                </span>
            </div>
        </div>
    );
};
