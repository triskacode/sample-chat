import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import {
    GlobalContext,
    GlobalProvider,
    SocketProvider,
    UserProvider,
} from "../context";
import { AuthRoute, GuestRoute } from "../Routes";
import { Dashboard, Error, Loading, Login } from "../components/pages";
import { Container } from "../components/partials";

const RenderContent = () => {
    const { global } = useContext(GlobalContext);

    useEffect(() => {
        console.log(global.error)
    }, [global.error])

    if (global.error && Object.keys(global.error).length !== 0) {
        return <Error></Error>;
    }

    if (global.loading === true) {
        return <Loading></Loading>;
    }

    return (
        <>
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
