import React, { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import {
    GlobalContext,
    GlobalProvider,
    SocketProvider,
    UserProvider,
} from "../context";
import { isEmpty } from "lodash";
import { AuthRoute, GuestRoute } from "../Routes";
import { Dashboard, Error, Loading, Login } from "../components/pages";
import { Container } from "../components/partials";

const RenderContent = () => {
    const { global } = useContext(GlobalContext);

    if (!isEmpty(global.error)) {
        return <Error></Error>;
    }

    return (
        <>
            {global.loading === true ? <Loading></Loading> : ""}
            <Switch>
                <GuestRoute path="/" exact>
                    <Login></Login>
                </GuestRoute>
                <AuthRoute path="/dashboard">
                    <SocketProvider>
                        <Dashboard></Dashboard>
                    </SocketProvider>
                </AuthRoute>
            </Switch>
        </>
    );
};

export const App = () => {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <UserProvider>
                    <Container>
                        <RenderContent></RenderContent>
                    </Container>
                </UserProvider>
            </GlobalProvider>
        </BrowserRouter>
    );
};
