
import * as React from "react";
import {Provider} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import configure from "./store/configure";

const NotFound = React.lazy(()=> import("./pages/NotFound"))
const App = React.lazy(()=>import("./App"))
const store = configure();

function Root(){
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/login" component={App}/>
                        <Route exact path="/register" component={App}/>
                        <Route component={NotFound}/>
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Root;
