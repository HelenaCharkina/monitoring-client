import ApiService from "../api/ApiService";
import Agent from "../models/agent";

export default class AgentService extends ApiService {
    public static getAll(): Promise<Agent[]> {
        return this.get("/api/agents/")
    }

    public static add(agent: Agent): Promise<void> {
        return this.post("/api/agents/", agent)
    }

    public static update(agent: Agent): Promise<void> {
        return this.put("/api/agents/", agent)
    }

    public static drop(id:string): Promise<void> {
        return this.delete("/api/agents/"+id)
    }

    public static start(id:string): Promise<void> {
        return this.get("/api/agents/start/"+id)
    }

    public static stop(id:string): Promise<void> {
        return this.get("/api/agents/stop/"+id)
    }
}