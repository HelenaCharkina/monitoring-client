import User from "src/models/user";
import ApiService from "../api/ApiService";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    public User: User
    public isAuth: boolean

    constructor() {
        makeAutoObservable(this)
    }

    public setAuth(bool:boolean):void{
        this.isAuth = bool
    }
    public setUser(user:User):void{
        this.User = user
    }

    public async login(login: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login({login, password})
            localStorage.setItem('access_token', response.access_token)
            this.setAuth(true)
            this.setUser(response.user)
        } catch (e) {
            console.log("error: ", e)
        }
    }

    public async logout(): Promise<void> {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('access_token')
            this.setAuth(false)
            this.setUser({} as User)
        } catch (e) {
            console.log("error: ", e)
        }
    }

    public async refresh(): Promise<void> {
        try {
            const response = await AuthService.refresh()
            localStorage.setItem('access_token', response.access_token)
            this.setAuth(true)
            this.setUser(response.user)
        } catch (e) {
            console.log("error: ", e)
        }
    }
}
