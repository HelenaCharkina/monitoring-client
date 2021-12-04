import ApiService from "../api/ApiService";
import Agent from "../models/agent";

export default class AgentService extends ApiService {
    public static getAll(): Promise<Agent[]> {
        return this.get("/api/agents/")
    }

    public static add(agent: Agent): Promise<void> {
        return this.post("/api/agents/", agent)
    }
}