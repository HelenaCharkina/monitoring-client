import * as React from "react";
import {FC, useContext, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import "./styles/style.scss";
import Agents from "./components/agents/agents";
import LoginForm from "./components/LoginForm/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Header from "./components/Header";

const App: FC = () => {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <Header/>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                    <Route exact path="/agents">
                        <Agents/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);
