import React, { useState } from "react";
// import "./App.css";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`w-screen h-screen ${darkMode ? "dark" : ""}`}>
            <div className="relative w-full h-full bg-gray-100 dark:bg-gray-700 dark:text-white">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="flex-none h-14 w-full flex justify-end items-center">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
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
                        <span className="text-2xl text-gray-500 dark:text-gray-400">500 | Internal Server Error</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
