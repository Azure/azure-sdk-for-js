import { WebResource } from "./webResource";
/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `body` property.
 * @class
 * Initializes a new instance of the HttpOperationResponse class.
 * @constructor
 */
export declare class HttpOperationResponse {
    /**
     * The raw request
     */
    request: WebResource;
    /**
     * The raw response
     */
    response: Response;
    /**
     * The response body as a readable stream
     */
    bodyAsStream: ReadableStream | null;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string | null;
    /**
     * The response body as parsed JSON
     */
    bodyAsJson: {
        [key: string]: any;
    } | Array<any> | string | number | boolean | null | void;
    constructor(request: WebResource, response: Response, body: ReadableStream | null);
}
