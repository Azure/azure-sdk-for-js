import { ServiceClientCredentials } from "./credentials/serviceClientCredentials";
import { BaseFilter } from "./filters/baseFilter";
import { WebResource, RequestPrepareOptions } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
/**
 * Options to be provided while creating the client.
 */
export interface ServiceClientOptions {
    /**
     * @property {RequestInit} [requestOptions] The request options. Detailed info can be found
     * here https://github.github.io/fetch/#Request
     */
    requestOptions?: RequestInit;
    /**
     * @property {Array<BaseFilter>} [filters] An array of filters/interceptors that will
     * be processed in the request pipeline (before and after) sending the request on the wire.
     */
    filters?: BaseFilter[];
    /**
     * @property {bool} [noRetryPolicy] - If set to true, turn off the default retry policy.
     */
    noRetryPolicy?: boolean;
    /**
     * @property {number} [rpRegistrationRetryTimeout] - Gets or sets the retry timeout
     * in seconds for AutomaticRPRegistration. Default value is 30.
     */
    rpRegistrationRetryTimeout?: number;
}
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
export declare class ServiceClient {
    /**
     * The string to be appended to the User-Agent header while sending the request.
     * This will be applicable only for node.js environment as the fetch library in browser does not allow setting custom UA.
     * @property {Array<string>} value - An array of string that need to be appended to the User-Agent request header.
     */
    userAgentInfo: {
        value: Array<string>;
    };
    /**
     * The request pipeline that provides hooks for adding custom filters.
     * The before filters get executed before sending the request and the after filters get executed after receiving the response.
     */
    pipeline: Function;
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    constructor(credentials?: ServiceClientCredentials, options?: ServiceClientOptions);
    /**
     * Adds custom information to user agent header
     * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
     */
    addUserAgentInfo(additionalUserAgentInfo: string): void;
    sendRequest(options: RequestPrepareOptions | WebResource): Promise<HttpOperationResponse>;
}
