
import * as React from "react";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import configure from "./store/configure";

const notFound = React.lazy(()=> import("./pages/NotFound"))
const app = React.lazy(()=>import("./App"))
const store = configure();

function Root(){
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Route exact={true}  path="/" component={app}/>
                    <Route component={notFound}/>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Root;
