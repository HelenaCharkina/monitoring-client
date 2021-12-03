import {DISPATCHER_ADDRESS} from "../settings";

interface Params {
    url: string
    data?: any
    method: string
}

interface ResponseError {
    error: Error
    json: any
}

export default class ApiService {
    private static readonly error: {
        unauthorized: Error
        internalServer: Error
        notFound: Error
    } = {
        unauthorized: Error('401 Unauthorized'),
        internalServer: Error('500 Internal Server Error'),
        notFound: Error('404 Not Found'),
    }


    protected static get(url: string): Promise<any> {
        return this.ajax({
            url,
            method: 'GET',
        })
    }

    protected static post(url: string, data: any): Promise<any> {
        return this.ajax({
            url,
            data,
            method: 'POST',
        })
    }

    private static async ajax({url, data, method}: Params): Promise<any> {
        let headers
        if (data !== undefined) {
            data = JSON.stringify(data)
        }

        url = DISPATCHER_ADDRESS + url
        headers = {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}

        return fetch(url, {method, headers, credentials: 'include', body: data})
            .then((r: Response) => {
                if (r.status === 401) {
                    throw {
                        error: this.error.unauthorized,
                        json: r.json(),
                    }
                } else if (r.status === 404) {
                    throw {
                        error: this.error.notFound,
                        json: r,
                    }
                } else if (r.status === 500) {
                    throw {
                        error: this.error.internalServer,
                        json: r,
                    }
                }
                return r
            })
            .then((r: Response) => {
                    return r.json()
                }
            )
            .catch((r: ResponseError) => {
                switch (r.error) {
                    case this.error.unauthorized:
                        r.json.then((json: any) => {
                            console.log("ERROR unauthorized: ", json.message)
                        })
                        throw r.error.message
                    default:
                        r.json.then((json: any) => {
                            console.log("ERROR: ", json.message)
                        })
                        throw r.error.message
                }
            })
    }
}



