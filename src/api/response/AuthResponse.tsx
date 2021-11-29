import User from "../../models/user";

export default interface AuthResponse {
    access_token: string
    refresh_token: string
    user: User
}