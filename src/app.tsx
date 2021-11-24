import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import Login from "./components/login/login";
import "./styles/style.scss";

class App extends React.Component<{}> {
    render() {
        return (
            <div>
                <div className="header">
                    <img className="logo" src="/img/comp2.svg" alt=""/>
                    <div className="name">Monitoring System</div>
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
