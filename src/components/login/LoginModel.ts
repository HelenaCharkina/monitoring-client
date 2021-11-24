import AjaxModel from "../../AjaxModel";

class LoginModel extends AjaxModel {

    public signIn(login:string, password:string): Promise<any> {
        return this.post('/auth/sign-in', {login, password})
    }

}

const loginModel = new LoginModel()
export default loginModel