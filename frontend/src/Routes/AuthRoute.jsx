import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context";

export const AuthRoute = ({ children, ...rest }) => {
    const {
        user: { isAuthenticated },
    } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated === false ? (
                    <Redirect to="/"></Redirect>
                ) : (
                    children
                )
                // children
            }
        />
    );
};
