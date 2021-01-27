
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import configure from "./store/configure";

const store = configure();

const Root = () => {
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                </Switch>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Root;
