import React, { useContext } from "react";
import { GlobalContext } from "../../../context";
import "./index.css";

const Profile = () => {
    const {
        global: { sidebarShow },
    } = useContext(GlobalContext);

    return (
        <div
            className={`flex-1 flex flex-col h-full w-0 overflow-hidden shadow bg-gray-300 dark:bg-gray-900 ${
                sidebarShow ? "rounded-l-lg" : ""
            }`}
        >
            <div className="flex-none flex justify-end items-center px-4 py-2">
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
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 pt-2 flex flex-col justify-center items-center">
                <div className="w-36 h-36 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                <div className="text-center overflow-x-hidden mt-4">
                    <h3 className="truncate text-lg font-semibold text-violet-700 dark:text-violet-500">
                        Triska Mahfud K
                    </h3>
                    <p className="truncate text-base text-gray-500 dark:text-gray-400">
                        triska120502@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
