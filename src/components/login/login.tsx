import * as React from "react";
import "./style.scss";
import loginModel from "./LoginModel";

interface FormData {
    login:string,
    password:string
}

class Login extends React.Component<{}, FormData> {

    state: FormData = {
        login:"",
        password:""
    }

    componentDidMount() {

    }

    private signIn = (event:any) => {
        event.preventDefault()
        console.log("sign in!")
        loginModel.signIn(this.state.login, this.state.password)
            .then(data => console.log("response ", data))
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

export default Login;
