import { WebResource } from "./webResource";
/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `parsedBody` property when the response body is received in JSON or XML.
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
     * The raw response. Please use the response directly when the response body is a ReadableStream.
     */
    response: Response;
    /**
     * The response body as text (string format)
     */
    bodyAsText?: string | null;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody?: {
        [key: string]: any;
    } | Array<any> | string | number | boolean | null | void;
    constructor(request: WebResource, response: Response);
}
