import React, { useContext } from "react";
import { Redirect, Switch } from "react-router-dom";
import { Answer, Offer, Stream } from "../components/layouts";
import { Error } from "../components/pages";
import { RTCContext, rtcStateType } from "../context";
import { AuthRoute } from "./AuthRoute";

export const VideoConverenceRoute = () => {
    const { rtc } = useContext(RTCContext);

    const renderContent = () => {
        if (rtc.state === rtcStateType.offer) {
            return (
                <AuthRoute path="/dashboard/video_converence/offer/:_id" exact>
                    <Offer></Offer>
                </AuthRoute>
            );
        } else if (rtc.state === rtcStateType.answer) {
            return (
                <AuthRoute path="/dashboard/video_converence/answer/:_id" exact>
                    <Answer></Answer>
                </AuthRoute>
            );
        } else if (rtc.state === rtcStateType.stream) {
            return (
                <AuthRoute path="/dashboard/video_converence/stream/:_id" exact>
                    <Stream></Stream>
                </AuthRoute>
            );
        } else {
            return <Redirect to="/dashboard/conversations"></Redirect>;
        }
    };

    if (!rtc.otherUser || Object.keys(rtc.otherUser).length === 0) {
        return (
            <Error
                error={{
                    code: 404,
                    status: "Page Not Found",
                    message: "Request page not found.",
                }}
            ></Error>
        );
    }

    return <Switch>{renderContent()}</Switch>;
};
