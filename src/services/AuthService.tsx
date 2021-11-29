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
        const response = await this.get('/auth/refresh')
        const json = await response.json()

        return json as AuthResponse
    }
}