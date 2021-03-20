import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext, RTCContext, rtcStateType, SocketContext } from "../../../../context";
import "./index.css";

export const Answer = () => {
    const { dispatch: dispatchGlobal } = useContext(GlobalContext);
    const { rtc, dispatch: dispatchRTC } = useContext(RTCContext);
    const socket = useContext(SocketContext);
    const [action, setAction] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const handleCancelOfferEvent = ({ message }) => {
            console.log(message);
            alert(message);

            dispatchRTC({ type: "reset" });

            history.goBack();
        };
        socket.on("close rtc", handleCancelOfferEvent);

        return () => {
            socket.off("close rtc", handleCancelOfferEvent);
        };
    }, [rtc]);

    useEffect(() => {
        let timeout;

        if (action === false) {
            timeout = setTimeout(handleReject, 10000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [action]);

    const handleReject = () => {
        setAction(true);

        socket.emit(
            "reject",
            { to: rtc.otherUser._id, message: "rejected" },
            (error) => {
                console.log(error);
                dispatchGlobal({ type: "set_error", payload: error });
            }
        );

        dispatchRTC({ type: "reset" });

        history.goBack();
    };

    const handleAnswer = () => {
        setAction(true);

        socket.emit("answer", { to: rtc.otherUser._id }, (error) => {
            console.log(error);
            dispatchGlobal({ type: "set_error", payload: error });
        });

        dispatchRTC({ type: "set_state", payload: rtcStateType.stream });

        history.push(
            `/dashboard/video_converence/stream/${rtc.otherUser?._id}`
        );
    };

    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 py-16 blur flex flex-col justify-between items-center">
            <div className="flex flex-col items-center">
                <div className="text-center overflow-x-hidden">
                    <h3 className="truncate text-3xl font-semibold text-violet-700 dark:text-violet-500">
                        {rtc.otherUser?.name}
                    </h3>
                </div>
                <div className="w-36 h-36 mt-6 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {rtc.otherUser?.photo ? (
                        <img
                            className="w-full h-full"
                            src={rtc.otherUser.photo}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="flex justify-around w-1/3">
                <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 to-pink-600 shadow transition duration-200 ease-in-out transform hover:scale-125">
                    <button
                        onClick={handleReject}
                        className="w-full h-full flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
                    >
                        <svg
                            className="w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-br from-purple-700 to-fuchsia-600 shadow transition duration-200 ease-in-out transform hover:scale-125">
                    <button
                        onClick={handleAnswer}
                        className="w-full h-full flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
                    >
                        <svg
                            className="w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
