import AuthRequest from "../api/request/AuthRequest";
import AuthResponse from "../api/response/AuthResponse";
import ApiService from "../api/ApiService";

export default class AuthService extends ApiService {
    public static login(request: AuthRequest): Promise<AuthResponse> {
        return this.post('/auth/login', request)
    }

    public static logout(token: string): Promise<void> {
        return this.get(`/auth/logout/${parseJwt(token).user_id}`)
    }

    public static refresh(token: string): Promise<AuthResponse> {
        return this.get(`/auth/refresh/${parseJwt(token).user_id}`)
    }
}

function parseJwt(token: string): any {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};