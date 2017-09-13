import * as msRest from "ms-rest-js";
/**
 * Options to be provided while creating the client.
 */
export interface AzureServiceClientOptions extends msRest.ServiceClientOptions {
    /**
     * @property {string} [options.acceptLanguage] - Gets or sets the preferred language for the response. Default value is: "en-US".
     */
    acceptLanguage?: string;
    /**
     * @property {boolean} [options.generateClientRequestId] - When set to true a unique x-ms-client-request-id value
     * is generated and included in each request. Default is true.
     */
    generateClientRequestId?: boolean;
    /**
     * @property {number} [options.longRunningOperationRetryTimeout] - Gets or sets the retry timeout in seconds for
     * Long Running Operations. Default value is 30.
     */
    longRunningOperationRetryTimeout?: number;
    /**
     * @property {number} [rpRegistrationRetryTimeout] - Gets or sets the retry timeout in seconds for
     * AutomaticRPRegistration. Default value is 30 seconds.
     */
    rpRegistrationRetryTimeout?: number;
}
/**
 * @class
 * Initializes a new instance of the AzureServiceClient class.
 * @constructor
 *
 * @param {msRest.ServiceClientCredentilas} credentials - ApplicationTokenCredentials or
 * UserTokenCredentials object used for authentication.
 * @param {AzureServiceClientOptions} options - The parameter options used by AzureServiceClient
 */
export declare class AzureServiceClient extends msRest.ServiceClient {
    acceptLanguage: string;
    generateClientRequestId: boolean;
    longRunningOperationRetryTimeout: number;
    rpRegistrationRetryTimeout: number;
    constructor(credentials: msRest.ServiceClientCredentials, options?: AzureServiceClientOptions);
    /**
     * Provides a mechanism to make a request that will poll and provide the final result.
     * @param {msRest.RequestPrepareOptions|msRest.WebResource} request - The request object
     * @param {msRest.RequestOptionsBase} [options] Additional options to be sent while making the request
     * @returns {Promise<msRest.HttpOperationResponse>} The HttpOperationResponse containing the final polling request, response and the responseBody.
     */
    sendLongRunningRequest(request: msRest.RequestPrepareOptions | msRest.WebResource, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse>;
    /**
     * Verified whether an unexpected polling status code for long running operation was received for the response of the initial request.
     * @param {msRest.HttpOperationResponse} initialResponse - Response to the initial request that was sent as a part of the asynchronous operation.
     */
    private checkResponseStatusCodeFailed(initialResponse);
    /**
     * Poll Azure long running PUT, PATCH, POST or DELETE operations.
     * @param {msRest.HttpOperationResponse} resultOfInitialRequest - result/response of the initial request which is a part of the asynchronous polling operation.
     * @param {msRest.RequestOptionsBase} [options] - custom request options.
     * @returns {Promise<msRest.HttpOperationResponse>} result - The final response after polling is complete.
     */
    getLongRunningOperationResult(resultOfInitialRequest: msRest.HttpOperationResponse, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse>;
    /**
     * Retrieve operation status by polling from "azure-asyncoperation" header.
     * @param {PollingState} pollingState - The object to persist current operation state.
     * @param {boolean} inPostOrDelete - Invoked by Post Or Delete operation.
     */
    private updateStateFromAzureAsyncOperationHeader(pollingState, inPostOrDelete?);
    /**
     * Retrieve PUT operation status by polling from "location" header.
     * @param {string} method - The HTTP method.
     * @param {PollingState} pollingState - The object to persist current operation state.
     */
    private updateStateFromLocationHeader(method, pollingState);
    /**
     * Polling for resource status.
     * @param {string} resourceUrl - The url of resource.
     * @param {PollingState} pollingState - The object to persist current operation state.
     */
    private updateStateFromGetResourceOperation(resourceUrl, pollingState);
    /**
     * Retrieves operation status by querying the operation URL.
     * @param {string} operationUrl - URL used to poll operation result.
     * @param {object} options - Options that can be set on the request object
     */
    private getStatus(operationUrl, options?);
}
