import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

const home = React.lazy(()=>import("./pages/Home"))
const signUp = React.lazy(()=>import("./pages/SignUp"))
const signIn = React.lazy(()=>import("./pages/SignIn"))

class App extends Component {
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/signin" component={signIn}/>
          <Route exact path="/signup" component={signUp}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;
