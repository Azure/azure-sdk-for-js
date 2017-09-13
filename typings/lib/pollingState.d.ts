import * as msRest from "ms-rest-js";
/**
 * @class
 * Initializes a new instance of the PollingState class.
 */
export default class PollingState {
    /**
     * @param {msRest.HttpOperationResponse} [response] - Response of the initial request that was made as a part of the asynchronous operation.
     */
    resultOfInitialRequest: msRest.HttpOperationResponse;
    /**
     * @param {msRest.RequestOptionsBase} [optionsOfInitialRequest] - Request options that were provided as a part of the initial request.
     */
    optionsOfInitialRequest: msRest.RequestOptionsBase;
    /**
     * @param {msRest.WebResource} [request] - provides information about the request made for polling.
     */
    request: msRest.WebResource;
    /**
     * @param {Response} [response] - The response object to extract longrunning operation status.
     */
    response: Response;
    /**
     * @param {any} [resource] - Provides information about the response body received in the polling request. Particularly useful when polling via provisioningState.
     */
    resource: any;
    /**
     * @param {number} [retryTimeout] - The timeout in seconds to retry on intermediate operation results. Default Value is 30.
     */
    retryTimeout: number;
    /**
     * @param {string} [azureAsyncOperationHeaderLink] - The url that is present in "azure-asyncoperation" response header.
     */
    azureAsyncOperationHeaderLink?: string;
    /**
     * @param {string} [locationHeaderLink] - The url that is present in "Location" response header.
     */
    locationHeaderLink?: string;
    /**
     * @param {string} [status] - The status of polling. "Succeeded, Failed, Cancelled, Updating, Creating, etc."
     */
    status?: string;
    /**
     * @param {msRest.RestError} [error] - Provides information about the error that happened while polling.
     */
    error?: msRest.RestError;
    constructor(resultOfInitialRequest: msRest.HttpOperationResponse, retryTimeout?: number);
    /**
     * Update cached data using the provided response object
     * @param {Response} [response] - provider response object.
     */
    updateResponse(response: Response): void;
    /**
     * Gets timeout in milliseconds.
     * @returns {number} timeout
     */
    getTimeout(): number;
    /**
     * Returns long running operation result.
     * @returns {msRest.HttpOperationResponse} HttpOperationResponse
     */
    getOperationResponse(): msRest.HttpOperationResponse;
    /**
     * Returns an Error on operation failure.
     * @param {Error} err - The error object.
     * @returns {msRest.RestError} The RestError defined in the runtime.
     */
    getRestError(err?: Error): msRest.RestError;
}
