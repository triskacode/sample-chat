import React, { createContext, useEffect, useReducer } from "react";

export const rtcStateType = {
    free: "free",
    offer: "offer",
    answer: "answer",
    stream: "stream",
};
const initialState = {
    state: rtcStateType.free,
    message: null,
    initiator: false,
    otherUser: {},
    otherConstraints: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set":
            return { ...state, ...action.payload };
        case "set_state":
            return { ...state, state: action.payload };
        case "set_message":
            return { ...state, message: action.payload };
        case "set_initiator":
            return { ...state, initiator: action.payload };
        case "set_other_user":
            return { ...state, otherUser: action.payload };
        case "set_other_constraints":
            return { ...state, otherConstraints: action.payload };
        case "reset":
            return initialState;
        default:
            throw new Error("bad request type.");
    }
};

export const RTCContext = createContext();

export const RTCProvider = ({ children }) => {
    const [rtc, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const oldRTC = JSON.parse(localStorage.getItem("rtc"));

        if (oldRTC && Object.keys(oldRTC).length !== 0) {
            dispatch({ type: "set", payload: oldRTC });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("rtc", JSON.stringify(rtc));
    }, [rtc]);

    return (
        <RTCContext.Provider value={{ rtc, dispatch }}>
            {children}
        </RTCContext.Provider>
    );
};
