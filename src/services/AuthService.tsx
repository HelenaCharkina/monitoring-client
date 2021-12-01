import AuthRequest from "../api/request/AuthRequest";
import AuthResponse from "../api/response/AuthResponse";
import ApiService from "../api/ApiService";

export default class AuthService extends ApiService {
    public static async login(request: AuthRequest): Promise<AuthResponse> {
        const response = await this.post('/auth/login', request)
        const json = await response.json()

        return json as AuthResponse
    }

    public static async logout(): Promise<void> {
        await this.get('/auth/logout')

        return
    }

    public static async refresh(): Promise<AuthResponse> {
        const response = await this.get(`/auth/refresh/${parseJwt(localStorage.getItem('access_token')).user_id}`)
        const json = await response.json()

        return json as AuthResponse
    }
}

function parseJwt(token: string): any {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};