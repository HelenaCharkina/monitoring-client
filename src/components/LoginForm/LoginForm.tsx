import React, {FC, useContext, useEffect, useState} from "react";
import "./style.scss";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const handleLogin = (e: any) => {
        e.preventDefault()
        store.login(login, password)
    }

    return (
            <div className="home">
                <div id="login-form">
                    <h1>Вход</h1>
                    <fieldset>
                        <form>
                            <input type="text" value={login} onChange={e => setLogin(e.target.value)} required
                                   placeholder="Логин"/>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                                   placeholder="Пароль"/>
                            <input type="submit" value="ВОЙТИ" readOnly onClick={handleLogin}/>
                        </form>
                    </fieldset>
                </div>
            </div>
    )
}

export default observer(LoginForm)