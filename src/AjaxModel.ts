import {DISPATCHER_ADDRESS} from "./settings";

export default class AjaxModel {
    protected get(url: string): Promise<any> {
        return this.ajax({
            url,
            method: 'GET',
        })
    }

    protected post(url: string, data: any): Promise<any> {
        return this.ajax({
            url,
            data,
            method: 'POST',
        })
    }

    private async ajax({url, data, method}: Params): Promise<any> {
        let headers
        if (data !== undefined) {
            data = JSON.stringify(data)
        }

        url = DISPATCHER_ADDRESS + url
        console.log(url)
        return fetch(url, {method, body: data, credentials: 'same-origin', headers, mode:"no-cors"})
            .then(response => {
                console.log("resp ", response)
                response.json()
            })
            .catch(response => console.log("ERROR: ", response))
    }
}

interface Params {
    url: string
    data?: any
    method: string
}

