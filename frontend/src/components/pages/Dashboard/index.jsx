import React, { useContext, useEffect } from "react";
import { Switch } from "react-router-dom";
import { SocketContext, UserContext } from "../../../context";
import { AuthRoute } from "../../../Routes";
import { Conversations, MyProfile, Profile } from "../../layouts";
import { Menu, Search, Sidebar } from "../../partials";
import "./index.css";

export const Dashboard = () => {
    const { user, dispatch } = useContext(UserContext);
    const socket = useContext(SocketContext);

    useEffect(() => {
        const handleMessageEvent = (user) => {
            dispatch({ type: "set_user", payload: user });
        };
        socket.on("message", handleMessageEvent);

        return () => {
            socket.off("message", handleMessageEvent);
        };
    }, [user]);

    return (
        <div className="flex w-full h-full">
            <Menu></Menu>
            <Switch>
                <AuthRoute
                    path={["/dashboard/search", "/dashboard/profile/:_id"]}
                    exact
                >
                    <Search></Search>
                </AuthRoute>
                <AuthRoute path="/dashboard">
                    <Sidebar></Sidebar>
                </AuthRoute>
            </Switch>
            <Switch>
                <AuthRoute
                    path={[
                        "/dashboard",
                        "/dashboard/search",
                        "/dashboard/conversations",
                    ]}
                    exact
                >
                    <MyProfile></MyProfile>
                </AuthRoute>
                <AuthRoute path="/dashboard/conversations/:_id" exact>
                    <Conversations></Conversations>
                </AuthRoute>
                <AuthRoute path="/dashboard/profile/:_id" exact>
                    <Profile></Profile>
                </AuthRoute>
            </Switch>
        </div>
    );
};
