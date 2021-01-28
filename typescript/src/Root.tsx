
import * as React from "react";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import configure from "./store/configure";

const notFound = React.lazy(()=> import("./pages/NotFound"))
const store = configure();

const Root :React.FC<{}> = () => {
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <Route exact={true}  path="/" component={App}/>
                <Route component={notFound}/>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Root;
