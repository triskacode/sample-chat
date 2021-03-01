import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context";
import { UserApi, UserApiCancelToken } from "../../../services";
import "./index.css";

const RenderContent = ({ users, input, loading }) => {
    if (loading === true) {
        return (
            <span className="text-center text-gray-500 dark:text-gray-400">
                <svg
                    class="animate-spin h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </span>
        );
    } else if (
        users.length === 0 &&
        (input?.value === undefined || input?.value === "")
    ) {
        return (
            <span className="text-center text-gray-500 dark:text-gray-400">
                Start chating with search another user.
            </span>
        );
    } else if (users.length === 0 && input?.value !== "") {
        return (
            <span className="text-center text-gray-500 dark:text-gray-400">
                User not found.
            </span>
        );
    } else {
        return users.map((user) => (
            <Link
                to={`/dashboard/profile/${user?._id}`}
                key={user?._id}
                className="group cursor-pointer w-full h-16"
            >
                <div className="flex items-center w-full h-full px-2 py-3 transition duration-200 ease-in-out rounded-md shadow bg-gray-300 dark:bg-gray-600 group-hover:bg-violet-700">
                    <div className="flex-none w-12 h-12 overflow-hidden mr-2 rounded-full bg-gray-100 dark:bg-gray-700">
                        {user?.photo ? (
                            <img className="w-full h-full" src={user.photo} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden text-gray-600 dark:text-gray-200 group-hover:text-gray-100">
                        <div className="flex justify-between items-center">
                            <h3 className="truncate font-semibold">
                                {user?.name || ""}
                            </h3>
                        </div>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-300">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>
            </Link>
        ));
    }
};

export const Search = () => {
    const {
        global: { sidebarShow },
        dispatch,
    } = useContext(GlobalContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const input = useRef();

    useEffect(() => {
        return () => {
            UserApiCancelToken[UserApi.search.name]?.cancelToken?.cancel();
            setLoading(false);
        };
    }, []);

    const handleChange = (event) => {
        const email = event.target.value.toString().trim();
        setLoading(true);

        if (email !== "") {
            UserApi.search({ email })
                .then(({ data: users }) => {
                    setUsers(users);
                })
                .catch((error) => {
                    dispatch({ type: "set_error", payload: error });
                })
                .then(() => {
                    setLoading(false);
                });
        } else {
            UserApiCancelToken[UserApi.search.name]?.cancelToken?.cancel();
            setLoading(false);
            setUsers([]);
        }
    };

    return (
        <div
            className={`flex-none flex flex-col w-full h-screen transition-sizing duration-200 ease-in-out bg-gray-100 dark:bg-gray-700 ${
                sidebarShow ? "sm:w-72" : "sm:w-0"
            }`}
        >
            <div className="flex flex-none justify-between items-center mx-4 my-2 text-gray-500 dark:text-gray-300">
                <h2 className="font-bold text-2xl mt-2 font-sans">Search</h2>
            </div>
            <div className="relative flex flex-none overflow-hidden justify-center items-center mx-4 my-2 text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    ref={input}
                    onChange={handleChange}
                    className="py-3 px-4 overflow-hidden bg-gray-300 dark:bg-gray-600 placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-full shadow appearance-none w-full block pl-12 focus:outline-none"
                    placeholder="Search user here ..."
                />
            </div>
            <div className="mt-4 overflow-y-auto overflow-x-hidden">
                <div className="flex-1 flex flex-col space-y-3 px-4 items-center justify-center">
                    <RenderContent
                        users={users}
                        input={input.current}
                        loading={loading}
                    ></RenderContent>
                </div>
            </div>
        </div>
    );
};
