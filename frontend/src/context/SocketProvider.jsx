import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { GlobalContext } from "./GlobalProvider";
import { UserContext } from "./UserProvider";

const socket = io("/");
// const socket = {
//     on() {},
//     off() {},
//     emit() {},
// };

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { dispatch: dispatchGlobal } = useContext(GlobalContext);
    const { dispatch: dispatchUser } = useContext(UserContext);

    useEffect(() => {
        const errorHandler = (error) => {
            console.log(error);
        };
        const connectionEstablishedHandler = (user) => {
            dispatchUser({ type: "set_user", payload: user });
        };
        const connectHandler = () => {
            socket.emit("init", (error) => {
                dispatchGlobal({ type: "set_error", payload: error });
            });
        };

        socket.on("connect", connectHandler);
        socket.on("error", errorHandler);
        socket.on("connection established", connectionEstablishedHandler);

        return () => {
            socket.off("connect", connectHandler);
            socket.off("error", errorHandler);
            socket.off("connection established", connectionEstablishedHandler);
        };
    }, [dispatchGlobal, dispatchUser]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
