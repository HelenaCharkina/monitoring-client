import * as React from "react";
import {FC, useContext, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import "./styles/style.scss";
import AgentWindow from "./components/AgentWindow/AgentWindow";
import LoginForm from "./components/LoginForm/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Header from "./components/Header/Header";

const App: FC = () => {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>
            <Header/>
            <div>Загрузка...</div>
        </div>
    }

    if (!store.isAuth) {
        return (
            <div className="window">
                <Header/>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div className="window">
            <Header/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);
