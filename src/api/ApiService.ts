import {DISPATCHER_ADDRESS} from "../settings";

interface Params {
    url: string
    data?: any
    method: string
}

export default class ApiService {

    protected static get(url: string): Promise<Response> {
        return this.ajax({
            url,
            method: 'GET',
        })
    }

    protected static post(url: string, data: any): Promise<Response> {
        return this.ajax({
            url,
            data,
            method: 'POST',
        })
    }

    private static async ajax({url, data, method}: Params): Promise<Response> {
        let headers
        if (data !== undefined) {
            data = JSON.stringify(data)
        }

        url = DISPATCHER_ADDRESS + url
        headers = {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}

        return fetch(url, {method, headers, credentials: 'include', body: data})
    }
}



