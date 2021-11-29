import * as React from "react";
import "./style.scss";
import Store from "../../store/Store";
import {createBrowserHistory} from "history";

interface FormData {
    login: string,
    password: string
}

class _loginForm extends React.Component<{}, FormData> {

    state: FormData = {
        login: "",
        password: ""
    }

    private signIn = async (event: any) => {
        // event.preventDefault()
        // let history = createBrowserHistory()
        // try {
        //     await Store.signIn(this.state.login, this.state.password)
        //     history.push("/agents")
        // } catch(error) {
        //     console.error(error)
        // }

    }

    render() {
        return (
            <div className="home">
                <div id="login-form">
                    <h1>Вход</h1>
                    <fieldset>
                        <form onSubmit={this.signIn}>
                            <input type="text" value={this.state.login} onChange={(event) => {
                                this.setState({login: event.target.value})
                            }} required placeholder="Логин"/>
                            <input value={this.state.password} onChange={(event) => {
                                this.setState({password: event.target.value})
                            }} type="password" required placeholder="Пароль"/>
                            <input type="submit" value="ВОЙТИ"/>
                        </form>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default _loginForm;
