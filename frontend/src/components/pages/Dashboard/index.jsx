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
        <div className="flex flex-col sm:flex-row w-full h-full">
            <Switch>
                <AuthRoute path="/dashboard/conversations/:_id" exact>
                    <div className="hidden sm:block">
                        <Menu></Menu>
                    </div>
                </AuthRoute>
                <AuthRoute path="/dashboard">
                    <Menu></Menu>
                </AuthRoute>
            </Switch>
            <Switch>
                <AuthRoute path="/dashboard" exact>
                    <div className="hidden sm:block">
                        <Sidebar></Sidebar>
                    </div>
                </AuthRoute>
                <AuthRoute path="/dashboard/search" exact>
                    <Search></Search>
                </AuthRoute>
                <AuthRoute path="/dashboard/profile/:_id" exact>
                    <div className="hidden sm:block">
                        <Search></Search>
                    </div>
                </AuthRoute>
                <AuthRoute path="/dashboard/conversations" exact>
                    <Sidebar></Sidebar>
                </AuthRoute>
                <AuthRoute path="/dashboard/conversations/:_id" exact>
                    <div className="hidden sm:block">
                        <Sidebar></Sidebar>
                    </div>
                </AuthRoute>
            </Switch>
            <Switch>
                <AuthRoute path={"/dashboard"} exact>
                    <MyProfile></MyProfile>
                </AuthRoute>
                <AuthRoute
                    path={["/dashboard/search", "/dashboard/conversations"]}
                    exact
                >
                    <div className="hidden sm:flex w-full">
                        <MyProfile></MyProfile>
                    </div>
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
