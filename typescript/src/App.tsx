import React,{Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

const home = React.lazy(()=>import("./pages/Home"))
const register = React.lazy(()=>import("./pages/Register"))
const login = React.lazy(()=>import("./pages/Login"))

class App extends Component {
  render() {
    return(
        <Switch>
          <Route exact={true} path="/" component={home}/>
          <Route exact={true} path="/login" component={login}/>
          <Route exact={true} path="/register" component={register}/>
        </Switch>
    );
  }
}

export default App;
