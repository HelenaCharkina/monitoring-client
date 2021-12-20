import ApiService from "../api/ApiService";
import StatisticsRequest from "../api/request/StatisticsRequest";
import Statistics from "../api/response/StatisticsResponse";

export default class StatisticService extends ApiService {
    public static getStatistics(request: StatisticsRequest): Promise<Statistics[]> {
        return this.post("/api/statistics/", request)
    }
}