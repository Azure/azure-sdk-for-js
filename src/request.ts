import { Agent, ClientRequest, ClientResponse, OutgoingHttpHeaders, ServerResponse } from "http"; // TYPES ONLY
import { RequestOptions } from "https"; // TYPES ONLY
import { Socket } from "net";
import * as querystring from "querystring";
import { Stream } from "stream";
import * as url from "url";
import { Constants } from "./common";
import { ConnectionPolicy, MediaReadMode } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { IHeaders } from "./queryExecutionContext";
import { Body, RetryUtility } from "./retry";

export interface ErrorResponse {
    code?: number;
    substatus?: number;
    body?: any;
    headers?: IHeaders;
    activityId?: string;
    retryAfterInMilliseconds?: number;
    [key: string]: any;
}

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

// TODO: :This feels hacky... Maybe just do this in the webpack.config.json?
// Alternatively, we can move to superagent which will handle this for us...
// tslint:disable-next-line:no-var-requires
const https = isBrowser && false ? require("stream-http") : require("https");

// ----------------------------------------------------------------------------
// Utility methods
//

function javaScriptFriendlyJSONStringify(s: object) {
    // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
    // but are needed to be escaped in JavaScript.
    return JSON.stringify(s).
        replace(/\u2028/g, "\\u2028").
        replace(/\u2029/g, "\\u2029");
}

function bodyFromData(data: Stream | Buffer | string | object) {
    if ((data as Stream).pipe) { return data; }
    if (Buffer.isBuffer(data)) { return data; }
    if (typeof data === "string") { return data; }
    if (typeof data === "object") { return javaScriptFriendlyJSONStringify(data); }
    return undefined;
}

function parse(urlString: string) { return url.parse(urlString); }

export interface Response<T> {
    headers?: IHeaders;
    result?: T;
}

function createRequestObject(
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    body: Body): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve, reject) => {
        function onTimeout() {
            httpsRequest.abort();
        }

        const isMedia = (requestOptions.path.indexOf("//media") === 0);

        const httpsRequest: ClientRequest = https.request(requestOptions, (response: ClientResponse) => {
            // In case of media response, return the stream to the user and the user will need
            // to handle reading the stream.
            if (isMedia && connectionPolicy.MediaReadMode === MediaReadMode.Streamed) {
                return resolve({ result: response, headers: response.headers as IHeaders });
            }

            let data = "";

            // if the requested data is text (not attachment/media) set the encoding to UTF-8
            if (!isMedia) {
                response.setEncoding("utf8");
            }

            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                if (response.statusCode >= 400) {
                    return reject(getErrorBody(response, data, response.headers as IHeaders));
                }

                let result;
                try {
                    result = isMedia ? data : data.length > 0 ? JSON.parse(data) : undefined;
                } catch (exception) {
                    return reject(exception);
                }

                resolve({ result, headers: response.headers as IHeaders });
            });
        });

        httpsRequest.once("socket", (socket: Socket) => {
            if (isMedia) {
                socket.setTimeout(connectionPolicy.MediaRequestTimeout);
            } else {
                socket.setTimeout(connectionPolicy.RequestTimeout);
            }

            socket.once("timeout", onTimeout);

            httpsRequest.once("response", () => {
                socket.removeListener("timeout", onTimeout);
            });
        });

        httpsRequest.once("error", reject);

        if (body["stream"] !== null) {
            body["stream"].pipe(httpsRequest);
        } else if (body["buffer"] !== null) {
            (httpsRequest).write(body["buffer"]);
            (httpsRequest).end();
        } else {
            (httpsRequest).end();
        }
    });
}

/**
 *  Constructs the error body from the response and the data returned from the request.
 * @param {object} response - response object returned from the executon of a request.
 * @param {object} data - the data body returned from the executon of a request.
 */
function getErrorBody(response: ClientResponse, data: string, headers: IHeaders): ErrorResponse {
    const errorBody: ErrorResponse = { code: response.statusCode, body: data, headers }; // TODO: any Error

    if (Constants.HttpHeaders.ActivityId in response.headers) {
        errorBody.activityId = response.headers[Constants.HttpHeaders.ActivityId] as string;
    }

    if (Constants.HttpHeaders.SubStatus in response.headers) {
        errorBody.substatus = parseInt(response.headers[Constants.HttpHeaders.SubStatus] as string, 10);
    }

    if (Constants.HttpHeaders.RetryAfterInMilliseconds in response.headers) {
        errorBody.retryAfterInMilliseconds =
            parseInt(response.headers[Constants.HttpHeaders.RetryAfterInMilliseconds] as string, 10);
    }

    return errorBody;
}

export class RequestHandler {
    public static async createRequestObjectStub(
        connectionPolicy: ConnectionPolicy, requestOptions: RequestOptions, body: Body) {
        return createRequestObject(connectionPolicy, requestOptions, body);
    }

    /**
     *  Creates the request object, call the passed callback when the response is retrieved.
     * @param {object} globalEndpointManager - an instance of GlobalEndpointManager class.
     * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
     * @param {object} requestAgent - the https agent used for send request
     * @param {string} method - the http request method ( 'get', 'post', 'put', .. etc ).
     * @param {String} hostname - The base url for the endpoint.
     * @param {string} path - the path of the requesed resource.
     * @param {Object} data - the request body. It can be either string, buffer, stream or undefined.
     * @param {Object} queryParams - query parameters for the request.
     * @param {Object} headers - specific headers for the request.
     * @param {function} callback - the callback that will be called when the response is retrieved and processed.
     */
    public static async request(
        globalEndpointManager: GlobalEndpointManager,
        connectionPolicy: ConnectionPolicy,
        requestAgent: Agent,
        method: string,
        hostname: string,
        request: string | { path: string },
        data: string | Buffer | Stream,
        queryParams: any, // TODO: any query params types
        headers: IHeaders): Promise<Response<any>> { // TODO: any
        const path = (request as { path: string }).path === undefined ? request : (request as { path: string }).path;
        let body: any; // TODO: any

        if (data) {
            body = bodyFromData(data);
            if (!body) {
                return {
                    result: {
                        message: "parameter data must be a javascript object, string, Buffer, or stream",
                    },
                    headers: undefined,
                };
            }
        }

        let buffer;
        let stream: Stream;
        if (body) {
            if (Buffer.isBuffer(body)) {
                buffer = body;
            } else if ((body as Stream).pipe) {
                // it is a stream
                stream = body;
            } else if (typeof body === "string") {
                buffer = new Buffer(body, "utf8");
            } else {
                return {
                    result: {
                        message: "body must be string, Buffer, or stream",
                    },
                    headers: undefined,
                };
            }
        }

        const requestOptions: RequestOptions = parse(hostname);
        requestOptions.method = method;
        requestOptions.path += path;
        requestOptions.headers = headers as OutgoingHttpHeaders;
        requestOptions.agent = requestAgent;
        requestOptions.secureProtocol = "TLSv1_client_method"; // TODO: Should be a constant

        if (connectionPolicy.DisableSSLVerification === true) {
            requestOptions.rejectUnauthorized = false;
        }

        if (queryParams) {
            requestOptions.path += "?" + querystring.stringify(queryParams);
        }

        if (buffer) {
            requestOptions.headers[Constants.HttpHeaders.ContentLength] = buffer.length;
            return RetryUtility.execute(
                globalEndpointManager,
                { buffer, stream: null },
                this.createRequestObjectStub,
                connectionPolicy, requestOptions,
                request);
        } else if (stream) {
            return RetryUtility.execute(globalEndpointManager,
                { buffer: null, stream },
                this.createRequestObjectStub,
                connectionPolicy,
                requestOptions,
                request);
        } else {
            return RetryUtility.execute(
                globalEndpointManager,
                { buffer: null, stream: null },
                this.createRequestObjectStub,
                connectionPolicy,
                requestOptions,
                request);
        }
    }
}
