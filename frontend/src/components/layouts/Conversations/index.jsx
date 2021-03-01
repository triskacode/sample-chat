import { find, isEmpty } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Config } from "../../../config";
import { GlobalContext, SocketContext, UserContext } from "../../../context";
import { Dropdown } from "../../commons";
import "./index.css";

const ButtonDropdown = ({ trigger, ...rest }) => {
    return (
        <div
            className={`flex-none w-12 h-12 rounded-full hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700 ${
                trigger ? "bg-gray-100 shadow dark:bg-gray-700" : ""
            }`}
        >
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
        <>
            <a className="block w-full px-4 py-2 hover:text-gray-100 hover:font-semibold hover:bg-violet-700 dark:hover:bg-violet-500">
                Delete chat
            </a>
            <a className="block w-full px-4 py-2 hover:text-gray-100 hover:font-semibold hover:bg-violet-700 dark:hover:bg-violet-500">
                Clear messages
            </a>
        </>
    );
};

export const Conversations = () => {
    const {
        global: { sidebarShow },
        dispatch,
    } = useContext(GlobalContext);
    const {
        user: { user, chats },
    } = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [chat, setChat] = useState({});
    const { _id } = useParams();
    const input = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = input.current.value.trim();

        if (message !== "") {
            socket.emit(
                "message",
                { to: chat?.user?._id, content: message },
                (error) => {
                    dispatch({ type: "set_error", payload: error });
                }
            );
        }

        input.current.value = "";
    };

    useEffect(() => {
        if (!isEmpty(user?.chats)) {
            const filterChats = find(user.chats, { _id });
            if (isEmpty(filterChats)) {
                const error = {
                    code: 404,
                    status: "Not Found",
                    message: "Cannot find ref id in chats.",
                };
                dispatch({ type: "set_error", payload: { data: error } });
            } else {
                setChat(filterChats);
            }
        }

        input.current?.focus();
    }, [user]);

    return (
        <div
            className={`flex-1 flex flex-col h-full w-full overflow-hidden shadow ${
                sidebarShow ? "rounded-l-lg" : ""
            }`}
        >
            <div className="flex-none flex justify-between items-center px-4 py-2 bg-gray-300 dark:bg-gray-900">
                <Link
                    to="/dashboard/conversations"
                    className="flex-none flex justify-center items-center px-1 h-12 mr-2 rounded-full hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <svg
                        className="w-6 h-6 mr-2 text-violet-700 dark:text-violet-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <div className="flex-none w-10 h-10 mr-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                        {chat?.user?.photo ? (
                            <img
                                className="w-full h-full"
                                src={chat.user.photo}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </Link>
                <div className="flex-1 ml-2 overflow-hidden justify-center h-full">
                    <h3 className="truncate font-semibold text-violet-700 dark:text-violet-500">
                        {chat?.user?.name}
                    </h3>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Online
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
                    <Dropdown
                        button={ButtonDropdown}
                        content={ContentDropdown}
                    ></Dropdown>
                </div>
            </div>
            <div className="flex-1 pt-2 overflow-y-auto bg-gray-300 dark:bg-gray-900">
                <div className="flex flex-col px-4 py-2 space-y-3">
                    {chat?.messages?.map((chat) => {
                        if (chat.type === Config.messageType.send)
                            return (
                                <div className="relative self-end px-4 pt-2 pb-6 overflow-hidden rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 text-gray-200">
                                    <p>{chat.content || ""}</p>
                                    <div className="absolute right-2 truncate bottom-1 text-xs text-gray-300">
                                        {chat.date
                                            ? `${(
                                                  "0" +
                                                  new Date(chat.date).getHours()
                                              ).slice(-2)}.${(
                                                  "0" +
                                                  new Date(
                                                      chat.date
                                                  ).getMinutes()
                                              ).slice(-2)}`
                                            : ""}
                                    </div>
                                </div>
                            );
                        else if (chat.type === Config.messageType.receive)
                            return (
                                <div className="relative self-start px-4 pt-2 pb-6 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200">
                                    <p>{chat.content || ""}</p>
                                    <div className="absolute right-2 bottom-1 text-xs truncate text-gray-400">
                                        {chat.date
                                            ? `${(
                                                  "0" +
                                                  new Date(chat.date).getHours()
                                              ).slice(-2)}.${(
                                                  "0" +
                                                  new Date(
                                                      chat.date
                                                  ).getMinutes()
                                              ).slice(-2)}`
                                            : ""}
                                    </div>
                                </div>
                            );
                    })}
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex-none flex justify-between space-x-3 shadow-md items-center px-4 py-2 bg-gray-300 dark:bg-gray-900"
            >
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
                            ref={input}
                            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-full shadow-md appearance-none w-full block pl-12 focus:outline-none"
                            placeholder="Type a message here ..."
                        />
                    </div>
                </div>
                <div className="flex-none w-12 relative flex items-center h-full">
                    <button
                        className="flex-shrink-0 absolute flex justify-center items-center font-semibold w-12 h-12 focus:outline-none rounded-full text-violet-700 dark:text-violet-500"
                        type="submit"
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
