import React, { useContext, useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";
import {
    RTCContext,
    rtcStateType,
    SocketContext,
    UserContext,
} from "../../../context";
import { AuthRoute, VideoConverenceRoute } from "../../../Routes";
import { Conversations, MyProfile, Profile } from "../../layouts";
import { Menu, Search, Sidebar } from "../../partials";
import "./index.css";

export const Dashboard = () => {
    const { user, dispatch: dispatchUser } = useContext(UserContext);
    const { rtc, dispatch: dispatchRTC } = useContext(RTCContext);
    const socket = useContext(SocketContext);
    const history = useHistory();

    useEffect(() => {
        const handleMessageEvent = (user) => {
            dispatchUser({ type: "set_user", payload: user });
        };
        socket.on("message", handleMessageEvent);

        return () => {
            socket.off("message", handleMessageEvent);
        };
    }, [user]);

    useEffect(() => {
        const handleOfferEvent = ({ from }) => {
            dispatchRTC({ type: "set_other_user", payload: from });
            dispatchRTC({ type: "set_initiator", payload: false });
            dispatchRTC({ type: "set_state", payload: rtcStateType.answer });

            history.push(`/dashboard/video_converence/answer/${from._id}`);
        };

        socket.on("offer", handleOfferEvent);

        return () => {
            socket.off("offer", handleOfferEvent);
        };
    }, [rtc]);

    return (
        <div className="flex flex-col sm:flex-row w-full h-full">
            <Switch>
                <AuthRoute path="/dashboard/video_converence/">
                    <VideoConverenceRoute></VideoConverenceRoute>
                </AuthRoute>

                <AuthRoute path="/dashboard">
                    {/* menu */}
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

                    {/* sidebar */}
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

                    {/* content */}
                    <Switch>
                        <AuthRoute path={"/dashboard"} exact>
                            <MyProfile></MyProfile>
                        </AuthRoute>
                        <AuthRoute
                            path={[
                                "/dashboard/search",
                                "/dashboard/conversations",
                            ]}
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
                </AuthRoute>
            </Switch>
        </div>
    );
};
