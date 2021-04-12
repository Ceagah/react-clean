export enum HttpStatusCode {
    unathorized = 401,
    noContent = 204
}

export type HttpReponse = {
    statusCode: HttpStatusCode
    body?: any
}