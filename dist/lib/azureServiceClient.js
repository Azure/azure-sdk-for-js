"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const msRest = require("ms-rest-js");
const constants_1 = require("./util/constants");
const pollingState_1 = require("./pollingState");
const LroStates = constants_1.default.LongRunningOperationStates;
/**
 * @class
 * Initializes a new instance of the AzureServiceClient class.
 * @constructor
 *
 * @param {msRest.ServiceClientCredentilas} credentials - ApplicationTokenCredentials or
 * UserTokenCredentials object used for authentication.
 * @param {AzureServiceClientOptions} options - The parameter options used by AzureServiceClient
 */
class AzureServiceClient extends msRest.ServiceClient {
    constructor(credentials, options) {
        super(credentials, options);
        this.acceptLanguage = constants_1.default.DEFAULT_LANGUAGE;
        this.generateClientRequestId = true;
        this.longRunningOperationRetryTimeout = 30;
        this.rpRegistrationRetryTimeout = 30;
        this.acceptLanguage = constants_1.default.DEFAULT_LANGUAGE;
        this.generateClientRequestId = true;
        this.longRunningOperationRetryTimeout = 30;
        if (!options)
            options = {};
        if (options.acceptLanguage !== null && options.acceptLanguage !== undefined) {
            this.acceptLanguage = options.acceptLanguage;
        }
        if (options.generateClientRequestId !== null && options.generateClientRequestId !== undefined) {
            this.generateClientRequestId = options.generateClientRequestId;
        }
        if (options.longRunningOperationRetryTimeout !== null && options.longRunningOperationRetryTimeout !== undefined) {
            this.longRunningOperationRetryTimeout = options.longRunningOperationRetryTimeout;
        }
        if (options.rpRegistrationRetryTimeout !== null && options.rpRegistrationRetryTimeout !== undefined) {
            this.rpRegistrationRetryTimeout = options.rpRegistrationRetryTimeout;
        }
        try {
            const moduleName = "ms-rest-azure";
            const moduleVersion = constants_1.default.msRestAzureVersion;
            this.addUserAgentInfo(`${moduleName}/${moduleVersion}`);
        }
        catch (err) {
            // do nothing
        }
    }
    /**
     * Provides a mechanism to make a request that will poll and provide the final result.
     * @param {msRest.RequestPrepareOptions|msRest.WebResource} request - The request object
     * @param {msRest.RequestOptionsBase} [options] Additional options to be sent while making the request
     * @returns {Promise<msRest.HttpOperationResponse>} The HttpOperationResponse containing the final polling request, response and the responseBody.
     */
    sendLongRunningRequest(request, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            let initialResponse;
            try {
                initialResponse = yield self.sendRequest(request);
            }
            catch (err) {
                return Promise.reject(err);
            }
            let finalResponse;
            try {
                finalResponse = yield self.getLongRunningOperationResult(initialResponse, options);
            }
            catch (err) {
                return Promise.reject(err);
            }
            return Promise.resolve(finalResponse);
        });
    }
    /**
     * Verified whether an unexpected polling status code for long running operation was received for the response of the initial request.
     * @param {msRest.HttpOperationResponse} initialResponse - Response to the initial request that was sent as a part of the asynchronous operation.
     */
    checkResponseStatusCodeFailed(initialResponse) {
        const statusCode = initialResponse.response.status;
        const method = initialResponse.request.method;
        if (statusCode === 200 || statusCode === 202 ||
            (statusCode === 201 && method === "PUT") ||
            (statusCode === 204 && (method === "DELETE" || method === "POST"))) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Poll Azure long running PUT, PATCH, POST or DELETE operations.
     * @param {msRest.HttpOperationResponse} resultOfInitialRequest - result/response of the initial request which is a part of the asynchronous polling operation.
     * @param {msRest.RequestOptionsBase} [options] - custom request options.
     * @returns {Promise<msRest.HttpOperationResponse>} result - The final response after polling is complete.
     */
    getLongRunningOperationResult(resultOfInitialRequest, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const initialRequestMethod = resultOfInitialRequest.request.method;
            if (self.checkResponseStatusCodeFailed(resultOfInitialRequest)) {
                return Promise.reject(`Unexpected polling status code from long running operation ` +
                    `"${resultOfInitialRequest.response.status}" for method "${initialRequestMethod}".`);
            }
            let pollingState;
            try {
                pollingState = new pollingState_1.default(resultOfInitialRequest, self.longRunningOperationRetryTimeout);
                pollingState.optionsOfInitialRequest = options;
            }
            catch (error) {
                return Promise.reject(error);
            }
            const resourceUrl = resultOfInitialRequest.request.url;
            while (![LroStates.Succeeded, LroStates.Failed, LroStates.Canceled].some((e) => { return e === pollingState.status; })) {
                yield msRest.delay(pollingState.getTimeout());
                if (pollingState.azureAsyncOperationHeaderLink) {
                    yield self.updateStateFromAzureAsyncOperationHeader(pollingState, true);
                }
                else if (pollingState.locationHeaderLink) {
                    yield self.updateStateFromLocationHeader(initialRequestMethod, pollingState);
                }
                else if (initialRequestMethod === "PUT") {
                    yield self.updateStateFromGetResourceOperation(resourceUrl, pollingState);
                }
                else {
                    return Promise.reject(new Error("Location header is missing from long running operation."));
                }
            }
            if (pollingState.status === LroStates.Succeeded) {
                if ((pollingState.azureAsyncOperationHeaderLink || !pollingState.resource) &&
                    (initialRequestMethod === "PUT" || initialRequestMethod === "PATCH")) {
                    yield self.updateStateFromGetResourceOperation(resourceUrl, pollingState);
                    return Promise.resolve(pollingState.getOperationResponse());
                }
                else {
                    return Promise.resolve(pollingState.getOperationResponse());
                }
            }
            else {
                return Promise.reject(pollingState.getRestError());
            }
        });
    }
    /**
     * Retrieve operation status by polling from "azure-asyncoperation" header.
     * @param {PollingState} pollingState - The object to persist current operation state.
     * @param {boolean} inPostOrDelete - Invoked by Post Or Delete operation.
     */
    updateStateFromAzureAsyncOperationHeader(pollingState, inPostOrDelete = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getStatus(pollingState.azureAsyncOperationHeaderLink, pollingState.optionsOfInitialRequest);
            }
            catch (err) {
                return Promise.reject(err);
            }
            const parsedResponse = result.bodyAsJson;
            if (!parsedResponse) {
                return Promise.reject(new Error("The response from long running operation does not contain a body."));
            }
            else if (parsedResponse && !parsedResponse.status) {
                return Promise.reject(new Error(`The response "${result.bodyAsText}" from long running operation does not contain the status property.`));
            }
            pollingState.status = parsedResponse.status;
            pollingState.error = parsedResponse.error;
            pollingState.updateResponse(result.response);
            pollingState.request = result.request;
            pollingState.resource = undefined;
            if (inPostOrDelete) {
                pollingState.resource = result.bodyAsJson;
            }
            return Promise.resolve();
        });
    }
    /**
     * Retrieve PUT operation status by polling from "location" header.
     * @param {string} method - The HTTP method.
     * @param {PollingState} pollingState - The object to persist current operation state.
     */
    updateStateFromLocationHeader(method, pollingState) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getStatus(pollingState.locationHeaderLink, pollingState.optionsOfInitialRequest);
            }
            catch (err) {
                return Promise.reject(err);
            }
            const parsedResponse = result.bodyAsJson;
            pollingState.updateResponse(result.response);
            pollingState.request = result.request;
            const statusCode = result.response.status;
            if (statusCode === 202) {
                pollingState.status = LroStates.InProgress;
            }
            else if (statusCode === 200 ||
                (statusCode === 201 && (method === "PUT" || method === "PATCH")) ||
                (statusCode === 204 && (method === "DELETE" || method === "POST"))) {
                pollingState.status = LroStates.Succeeded;
                pollingState.resource = parsedResponse;
                // we might not throw an error, but initialize here just in case.
                pollingState.error = new msRest.RestError(`Long running operation failed with status "${pollingState.status}".`);
                pollingState.error.code = pollingState.status;
            }
            else {
                return Promise.reject(new Error(`The response with status code ${statusCode} from polling for ` +
                    `long running operation url "${pollingState.locationHeaderLink}" is not valid.`));
            }
        });
    }
    /**
     * Polling for resource status.
     * @param {string} resourceUrl - The url of resource.
     * @param {PollingState} pollingState - The object to persist current operation state.
     */
    updateStateFromGetResourceOperation(resourceUrl, pollingState) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getStatus(resourceUrl, pollingState.optionsOfInitialRequest);
            }
            catch (err) {
                return Promise.reject(err);
            }
            if (!result.bodyAsJson) {
                return Promise.reject(new Error("The response from long running operation does not contain a body."));
            }
            const parsedResponse = result.bodyAsJson;
            pollingState.status = LroStates.Succeeded;
            if (parsedResponse && parsedResponse.properties && parsedResponse.properties.provisioningState) {
                pollingState.status = parsedResponse.properties.provisioningState;
            }
            pollingState.updateResponse(result.response);
            pollingState.request = result.request;
            pollingState.resource = parsedResponse;
            // we might not throw an error, but initialize here just in case.
            pollingState.error = new msRest.RestError(`Long running operation failed with status "${pollingState.status}".`);
            pollingState.error.code = pollingState.status;
            return Promise.resolve();
        });
    }
    /**
     * Retrieves operation status by querying the operation URL.
     * @param {string} operationUrl - URL used to poll operation result.
     * @param {object} options - Options that can be set on the request object
     */
    getStatus(operationUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            // Construct URL
            const requestUrl = operationUrl.replace(" ", "%20");
            // Create HTTP request object
            const httpRequest = {
                method: "GET",
                url: requestUrl,
                headers: {}
            };
            if (options) {
                const customHeaders = options.customHeaders;
                for (const headerName in customHeaders) {
                    if (customHeaders.hasOwnProperty(headerName)) {
                        httpRequest.headers[headerName] = customHeaders[headerName];
                    }
                }
            }
            let operationResponse;
            try {
                operationResponse = yield self.sendRequest(httpRequest);
            }
            catch (err) {
                return Promise.reject(err);
            }
            const statusCode = operationResponse.response.status;
            const responseBody = operationResponse.bodyAsJson;
            if (statusCode !== 200 && statusCode !== 201 && statusCode !== 202 && statusCode !== 204) {
                const error = new msRest.RestError(`Invalid status code with response body "${operationResponse.bodyAsText}" occurred ` +
                    `when polling for operation status.`);
                error.statusCode = statusCode;
                error.request = msRest.stripRequest(operationResponse.request);
                error.response = operationResponse.response;
                try {
                    error.body = responseBody;
                }
                catch (badResponse) {
                    error.message += ` Error "${badResponse}" occured while deserializing the response body - "${operationResponse.bodyAsText}".`;
                    error.body = operationResponse.bodyAsText;
                }
                return Promise.reject(error);
            }
            return Promise.resolve(operationResponse);
        });
    }
}
exports.AzureServiceClient = AzureServiceClient;
//# sourceMappingURL=azureServiceClient.js.map