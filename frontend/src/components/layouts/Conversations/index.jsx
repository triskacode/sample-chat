import React, { useContext } from "react";
import { GlobalContext } from "../../../context";
import "./index.css"

const Conversations = () => {
    const {
        global: { sidebarShow },
    } = useContext(GlobalContext);

    return (
        <div
            className={`flex-1 flex flex-col h-full w-0 overflow-hidden shadow ${
                sidebarShow ? "rounded-l-lg" : ""
            }`}
        >
            <div className="flex-none flex justify-between items-center px-4 py-2 bg-gray-300 dark:bg-gray-900">
                <div className="flex-none w-12 h-12 mr-2 rounded-full shadow bg-gray-100 dark:bg-gray-700"></div>
                <div className="flex-1 ml-2 overflow-hidden justify-center h-full">
                    <h3 className="truncate font-semibold text-violet-700 dark:text-violet-500">
                        Triska Mahfud K
                    </h3>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Nisi magni velit ea iusto ullam qui, ab,
                        consequuntur quis at provident quibusdam non repellat
                        illum, reiciendis blanditiis! Nulla minus magni quia?
                    </p>
                </div>
                <div className="flex-none flex items-center pl-4 space-x-2 h-full text-violet-700 dark:text-violet-500">
                    <div className="flex-none w-12 h-12 rounded-full hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700">
                        <button className="w-full h-12 flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer">
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-none w-12 h-12 rounded-full hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700">
                        <button className="w-full h-12 flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer">
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 pt-2 overflow-y-auto bg-gray-300 dark:bg-gray-900">
                <div className="flex flex-col px-4 py-2 space-y-3">
                    <div className="relative self-start px-4 pt-2 pb-6 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200">
                        <p>haloooo jsaih shausag hsuagsiasn nsa</p>
                        <div className="absolute right-2 bottom-1 text-xs text-gray-400">
                            12.00
                        </div>
                    </div>
                    <div className="relative self-end px-4 pt-2 pb-6 rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 text-gray-200">
                        <p>haloooo jsaih shausag hsuagsiasn nsa</p>
                        <div className="absolute right-2 bottom-1 text-xs text-gray-300">
                            12.00
                        </div>
                    </div>
                </div>
            </div>
            <form className="flex-none flex justify-between space-x-3 shadow-md items-center px-4 py-2 bg-gray-300 dark:bg-gray-900">
                <div className="flex-1 flex justify-center h-full">
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-7 w-7"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-full shadow-md appearance-none w-full block pl-12 focus:outline-none"
                            placeholder="Type a message here ..."
                        />
                    </div>
                </div>
                <div className="flex-none w-12 relative flex items-center h-full">
                    <button
                        className="flex-shrink-0 absolute flex justify-center items-center font-semibold w-12 h-12 focus:outline-none rounded-full text-violet-700 dark:text-violet-500"
                        type="button"
                    >
                        <svg
                            className="h-8 w-8 transition duration-200 transform hover:scale-125"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Conversations;
