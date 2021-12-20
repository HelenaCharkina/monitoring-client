import { DISPATCHER_ADDRESS } from "../settings";

interface Params {
  url: string;
  data?: any;
  method: string;
}

interface ResponseError {
  error: Error;
  json: any;
}

enum ApiErrors {
  unauthorized = "401 Unauthorized",
  internalServer = "500 Internal Server Error",
  notFound = "404 Not Found",
  badRequest = "400 Bad Request",
}

export default class ApiService {
  protected static get(url: string): Promise<any> {
    return this.ajax({
      url,
      method: "GET",
    });
  }

  protected static post(url: string, data: any): Promise<any> {
    return this.ajax({
      url,
      data,
      method: "POST",
    });
  }

  protected static put(url: string, data: any): Promise<any> {
    return this.ajax({
      url,
      data,
      method: "PUT",
    });
  }

  protected static delete(url: string): Promise<any> {
    return this.ajax({
      url,
      method: "DELETE",
    });
  }

  private static async ajax({ url, data, method }: Params): Promise<any> {
    let headers;
    if (data !== undefined) {
      data = JSON.stringify(data);
    }

    url = "http://" + DISPATCHER_ADDRESS + url;
    headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    return fetch(url, { method, headers, credentials: "include", body: data })
      .then((r: Response) => {
        if (r.status === 401) {
          throw {
            error: ApiErrors.unauthorized,
            json: r.json(),
          };
        } else if (r.status === 400) {
          throw {
            error: ApiErrors.badRequest,
            json: r,
          };
        } else if (r.status === 404) {
          throw {
            error: ApiErrors.notFound,
            json: r,
          };
        } else if (r.status === 500) {
          throw {
            error: ApiErrors.internalServer,
            json: r,
          };
        }
        return r;
      })
      .then((r: Response) => {
        return r.json();
      });
  }
}
