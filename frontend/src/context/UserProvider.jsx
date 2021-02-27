import React, { createContext, useContext, useEffect, useReducer } from "react";
import { UserApi, UserApiCancelToken } from "../services";
import { GlobalContext } from "./GlobalProvider";

const reducer = (state, action) => {
    switch (action.type) {
        case "set":
            return action.payload;
        case "set_user":
            return { ...state, user: action.payload };
        default:
            throw new Error("bad request type.");
    }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { dispatch: dispatchGlobal } = useContext(GlobalContext);
    const [user, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        dispatchGlobal({ type: "set_loading", payload: true });

        UserApi.detail()
            .then(({ data }) => {
                dispatch({ type: "set", payload: data });
            })
            .catch((error) => {
                dispatchGlobal({ type: "set_error", payload: error });
            })
            .then(() => {
                dispatchGlobal({ type: "set_loading", payload: false });
            });

        return () => {
            UserApiCancelToken[UserApi.detail.name]?.cancelToken?.cancel();
            dispatchGlobal({ type: "set_loading", payload: false });
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
