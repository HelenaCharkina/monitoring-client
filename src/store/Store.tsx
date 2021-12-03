import User from "src/models/user";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    public User: User = {} as User
    public isAuth: boolean = false
    public isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    public setAuth(bool: boolean): void {
        this.isAuth = bool
    }

    public setUser(user: User): void {
        this.User = user
    }

    public setLoading(bool: boolean): void {
        this.isLoading = bool;
    }

    public async login(login: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login({login, password})
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('user_name', response.user.name)
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

    public async checkAuth(): Promise<void> {
        this.setLoading(true);
        try {
            let token = localStorage.getItem('access_token')
            if (token === "undefined") {
                return
            }
            const response = await AuthService.refresh(token)
            localStorage.setItem('access_token', response.access_token)
            this.setAuth(true)
            this.setUser({name: localStorage.getItem('user_name')})
        } catch (e) {
            console.log("error: ", e)
        } finally {
            this.setLoading(false);
        }
    }
}
