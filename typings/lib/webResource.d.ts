import { Mapper } from "./serializer";
export declare type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";
/**
 * Creates a new WebResource object.
 *
 * This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
 * properties to initiate a request.
 *
 * @constructor
 */
export declare class WebResource {
    url: string;
    method: HttpMethods;
    body?: any;
    headers: {
        [key: string]: any;
    };
    rawResponse?: boolean;
    formData?: any;
    query?: {
        [key: string]: any;
    };
    constructor(url?: string, method?: HttpMethods, body?: any, query?: {
        [key: string]: any;
    }, headers?: {
        [key: string]: any;
    }, rawResponse?: boolean);
    /**
     * Validates that the required properties such as method, url, headers["Content-Type"],
     * headers["accept-language"] are defined. It will throw an error if one of the above
     * mentioned properties are not defined.
     */
    validateRequestProperties(): void;
    /**
     * Prepares the request.
     * @param {RequestPrepareOptions} options - Options to provide for preparing the request.
     * @returns {object} WebResource Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
     */
    prepare(options: RequestPrepareOptions): this;
}
/**
 * Prepares the request.
 * @param {object} options The request options that should be provided to send a request successfully
 * @param {string} options.method The HTTP request method. Valid values are "GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH".
 * @param {string} [options.url] The request url. It may or may not have query parameters in it.
 * Either provide the "url" or provide the "pathTemplate" in the options object. Both the options are mutually exclusive.
 * @param {object} [options.queryParameters] A dictionary of query parameters to be appended to the url, where
 * the "key" is the "query-parameter-name" and the "value" is the "query-parameter-value".
 * The "query-parameter-value" can be of type "string" or it can be of type "object".
 * The "object" format should be used when you want to skip url encoding. While using the object format,
 * the object must have a property named value which provides the "query-parameter-value".
 * Example:
 *    - query-parameter-value in "object" format: { "query-parameter-name": { value: "query-parameter-value", skipUrlEncoding: true } }
 *    - query-parameter-value in "string" format: { "query-parameter-name": "query-parameter-value"}.
 * Note: "If options.url already has some query parameters, then the value provided in options.queryParameters will be appended to the url.
 * @param {string} [options.pathTemplate] The path template of the request url. Either provide the "url" or provide the "pathTemplate"
 * in the options object. Both the options are mutually exclusive.
 * Example: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}"
 * @param {string} [options.baseUrl] The base url of the request. Default value is: "https://management.azure.com". This is applicable only with
 * options.pathTemplate. If you are providing options.url then it is expected that you provide the complete url.
 * @param {object} [options.pathParameters] A dictionary of path parameters that need to be replaced with actual values in the pathTemplate.
 * Here the key is the "path-parameter-name" and the value is the "path-parameter-value".
 * The "path-parameter-value" can be of type "string"  or it can be of type "object".
 * The "object" format should be used when you want to skip url encoding. While using the object format,
 * the object must have a property named value which provides the "path-parameter-value".
 * Example:
 *    - path-parameter-value in "object" format: { "path-parameter-name": { value: "path-parameter-value", skipUrlEncoding: true } }
 *    - path-parameter-value in "string" format: { "path-parameter-name": "path-parameter-value" }.
 * @param {object} [options.headers] A dictionary of request headers that need to be applied to the request.
 * Here the key is the "header-name" and the value is the "header-value". The header-value MUST be of type string.
 *  - ContentType must be provided with the key name as "Content-Type". Default value "application/json; charset=utf-8".
 *  - "Transfer-Encoding" is set to "chunked" by default if "options.bodyIsStream" is set to true.
 *  - "Content-Type" is set to "application/octet-stream" by default if "options.bodyIsStream" is set to true.
 *  - "accept-language" by default is set to "en-US"
 *  - "x-ms-client-request-id" by default is set to a new Guid. To not generate a guid for the request, please set options.disableClientRequestId to true
 * @param {boolean} [options.disableClientRequestId] When set to true, instructs the client to not set "x-ms-client-request-id" header to a new Guid().
 * @param {object|string|boolean|array|number|null|undefined} [options.body] - The request body. It can be of any type. This method will JSON.stringify() the request body.
 * @param {object} [options.serializationMapper] - Provides information on how to serialize the request body.
 * @param {object} [options.mappers] - A dictionary of mappers that may be used while [de]serialization.
 * @param {object} [options.deserializationMapper] - Provides information on how to deserialize the response body.
 * @param {boolean} [options.disableJsonStringifyOnBody] - Indicates whether this method should JSON.stringify() the request body. Default value: false.
 * @param {boolean} [options.bodyIsStream] - Indicates whether the request body is a stream (useful for file upload scenarios).
 * @returns {object} WebResource Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
 */
export interface RequestPrepareOptions {
    method: HttpMethods;
    url?: string;
    queryParameters?: {
        [key: string]: any;
    } | ParameterValue;
    pathTemplate?: string;
    baseUrl?: string;
    pathParameters?: {
        [key: string]: any;
    } | ParameterValue;
    headers?: {
        [key: string]: any;
    };
    disableClientRequestId?: boolean;
    body?: any;
    serializationMapper?: Mapper;
    mappers?: {
        [x: string]: any;
    };
    deserializationMapper?: object;
    disableJsonStringifyOnBody?: boolean;
    bodyIsStream?: boolean;
}
/**
 * The Parameter value provided for path or query parameters in RequestPrepareOptions
 */
export interface ParameterValue {
    value: any;
    skipUrlEncoding: boolean;
    [key: string]: any;
}
/**
 * Describes the base structure of the options object that will be used in every operation.
 */
export interface RequestOptionsBase {
    /**
     * @property {object} [customHeaders] - User defined custom request headers that
     * will be applied before the request is sent.
     */
    customHeaders?: {
        [key: string]: string;
    };
    [key: string]: any;
}
