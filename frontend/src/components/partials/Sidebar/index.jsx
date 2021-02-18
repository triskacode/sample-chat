import React, { useContext } from "react";
import { GlobalContext } from "../../../context";
import "./index.css"

const Sidebar = () => {
    const {
        global: { sidebarShow },
    } = useContext(GlobalContext);

    return (
        <div
            className={`flex-none flex flex-col h-screen transition-sizing duration-200 ease-in-out bg-gray-100 dark:bg-gray-700 ${
                sidebarShow ? "w-72" : "w-0"
            }`}
        >
            <div className="flex flex-none justify-between items-center mx-4 my-2 text-gray-500 dark:text-gray-300">
                <h2 className="font-bold text-2xl mt-2 font-sans">Inbox</h2>
            </div>
            <div className="mt-4 overflow-y-auto overflow-x-hidden">
                <div className="flex-1 flex flex-col space-y-3 px-4 items-center">
                    <div className="group cursor-pointer w-full h-16">
                        <div className="flex items-center w-full h-full px-2 py-2 transition duration-200 ease-in-out rounded-md shadow bg-gray-300 dark:bg-gray-600 group-hover:bg-violet-700">
                            <div className="flex-none w-12 h-12 mr-2 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                            <div className="flex flex-col justify-center overflow-hidden text-gray-600 dark:text-gray-200 group-hover:text-gray-100">
                                <div className="flex justify-between items-center">
                                    <h3 className="truncate font-semibold">
                                        Triska Mahfud K
                                    </h3>
                                    <div className="px-1 text-sm rounded font-semibold text-gray-100 bg-gradient-to-br from-pink-500 to-rose-500">
                                        100
                                    </div>
                                </div>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-300">
                                    Haloo nama aku triska, aku tinggal di tunge
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group cursor-pointer w-full h-16">
                        <div className="flex items-center w-full h-full px-2 py-2 transition duration-200 ease-in-out rounded-md shadow bg-gray-300 dark:bg-gray-600 group-hover:bg-violet-700">
                            <div className="flex-none w-12 h-12 mr-2 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                            <div className="flex flex-col justify-center overflow-hidden text-gray-600 dark:text-gray-200 group-hover:text-gray-100">
                                <div className="flex justify-between items-center">
                                    <h3 className="truncate font-semibold">
                                        Triska Mahfud K
                                    </h3>
                                </div>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-300">
                                    Haloo nama aku triska, aku tinggal di tunge
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
