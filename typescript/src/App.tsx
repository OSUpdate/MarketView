import React,{Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

const home = React.lazy(()=>import("./pages/Home"))
const signUp = React.lazy(()=>import("./pages/SignUp"))
const signIn = React.lazy(()=>import("./pages/SignIn"))

class App extends Component {
  render() {
    return(
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/signin" component={signIn}/>
          <Route exact path="/signup" component={signUp}/>
        </Switch>
    );
  }
}

export default App;
