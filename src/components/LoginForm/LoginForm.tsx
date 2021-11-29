import React, {FC, useContext, useState} from "react";
import "./style.scss";
import {Context} from "../../index";

const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const handleLogin = (e:any) => {
        e.preventDefault()
        store.login(login, password)
    }

    const handleRefresh = (e:any) => {
        e.preventDefault()
        store.refresh()
    }

    return (
        <div className="home">
            <div id="login-form">
                <h1>Вход</h1>
                <fieldset>
                    <form>
                        <input type="text" value={login} onChange={e => setLogin(e.target.value)} required placeholder="Логин"/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Пароль"/>
                        <input type="submit" value="ВОЙТИ" readOnly onClick={handleLogin}/>
                        <input type="submit" value="Обновить" readOnly onClick={handleRefresh}/>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}

export default LoginForm