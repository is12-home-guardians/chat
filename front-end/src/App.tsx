import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatPage from "src/components/pages/ChatPage";
import SignInPage from "src/components/pages/SignInPage";
import Root from "src/Root";

export default () => (
    <BrowserRouter>
        <Root>
            <Switch>
                <Route
                    path="/"
                    component={ChatPage}
                    exact={true}
                />
                <Route
                    path="/sign-in"
                    component={SignInPage}
                    exact={true}
                />
            </Switch>
        </Root>
    </BrowserRouter>
);
