import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from "./components/students";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Login from "./components/auth/login";
import Profile from "./components/profile";


function App() {
    return <div>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Students}/>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
}

export default App;
