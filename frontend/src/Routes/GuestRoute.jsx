import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context";

export const GuestRoute = ({ children, ...rest }) => {
    const {
        user: { isAuthenticated },
    } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated === true ? (
                    <Redirect to="/dashboard"></Redirect>
                ) : (
                    children
                )
                // children
            }
        />
    );
};
