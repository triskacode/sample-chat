import React, { useContext } from "react";
import { GlobalContext, UserContext } from "../../../context";
import { Dropdown } from "../../commons";
import "./index.css";

const ButtonDropdown = ({ trigger, ...rest }) => {
    return (
        <div className={`flex-none w-12 h-12 rounded-full hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700 ${trigger ? "bg-gray-100 shadow dark:bg-gray-700" : ""}`}>
            <button
                {...rest}
                className="w-full h-12 flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
            >
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
    );
};

const ContentDropdown = () => {
    return (
        <a
            href="/auth/logout"
            className="block w-full px-4 py-2 hover:text-gray-100 hover:font-semibold hover:bg-violet-700 dark:hover:bg-violet-500"
        >
            Logout
        </a>
    );
};

export const MyProfile = () => {
    const {
        global: { sidebarShow },
    } = useContext(GlobalContext);
    const {
        user: { user },
    } = useContext(UserContext);

    return (
        <div
            className={`flex-1 flex flex-col h-full w-full overflow-hidden shadow bg-gray-300 dark:bg-gray-900 ${
                sidebarShow ? "sm:rounded-l-lg" : ""
            }`}
        >
            <div className="flex-none flex justify-end items-center px-4 py-2">
                <div className="flex-none flex items-center pl-4 space-x-2 h-full text-violet-700 dark:text-violet-500">
                    <Dropdown button={ButtonDropdown} content={ContentDropdown}></Dropdown>
                </div>
            </div>
            <div className="flex-1 pt-2 flex flex-col justify-center items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {user?.photo ? (
                        <img className="w-full h-full" src={user.photo} />
                    ) : (
                        ""
                    )}
                </div>
                <div className="text-center overflow-x-hidden mt-4">
                    <h3 className="truncate text-lg font-semibold text-violet-700 dark:text-violet-500">
                        {user?.name || ""}
                    </h3>
                    <p className="truncate text-base text-gray-500 dark:text-gray-400">
                        {user?.email || ""}
                    </p>
                </div>
            </div>
        </div>
    );
};
