import React from "react";
import { Route, Switch } from "react-router-dom";
import { Conversations, Profile } from "../../layouts";
import { Menu, Sidebar } from "../../partials";
import "./index.css";

const Dashboard = () => {
    return (
        <div className="flex w-full h-full">
            <Menu></Menu>
            <Sidebar></Sidebar>
            <Switch>
                <Route path="/dashboard" exact>
                    <Profile></Profile>
                </Route>
                <Route path="/dashboard/conversations">
                    <Conversations></Conversations>
                </Route>
            </Switch>
        </div>
    );
};

export default Dashboard;
