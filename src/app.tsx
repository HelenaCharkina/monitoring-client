import * as React from "react";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import _loginForm from "./components/LoginForm/_loginForm";
import "./styles/style.scss";
import Agents from "./components/agents/agents";
import LoginForm from "./components/LoginForm/LoginForm";

class App extends React.Component<{}> {
    render() {
        return (
            <div>
                <div className="header">
                    <img className="logo" src="/img/comp2.svg" alt=""/>
                    <div className="name">Monitoring System</div>
                    <div className="userName">Пользователь:</div>
                    <div className="logoutButton">Выйти</div>
                </div>
                <BrowserRouter  >
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/login">
                            <LoginForm/>
                        </Route>
                        <Route exact path="/agents">
                            <Agents/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
