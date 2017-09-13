import { WebResource } from "./webResource";
export declare class RestError extends Error {
    code?: string;
    statusCode?: number;
    request?: WebResource;
    response?: Response;
    body?: any;
    constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: Response, body?: any);
}
