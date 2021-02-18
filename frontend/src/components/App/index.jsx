import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../../context";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Container from "../partials/Container";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <Container>
                    <Switch>
                        <Route path="/" exact>
                            <Login></Login>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard></Dashboard>
                        </Route>
                    </Switch>
                </Container>
            </GlobalProvider>
        </BrowserRouter>
    );
};

export default App;
