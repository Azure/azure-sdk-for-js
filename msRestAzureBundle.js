var msRestAzure =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = msRest;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = {
    /**
     * Defines constants for long running operation states.
     *
     * @const
     * @type {string}
     */
    LongRunningOperationStates: {
        InProgress: "InProgress",
        Succeeded: "Succeeded",
        Failed: "Failed",
        Canceled: "Canceled"
    },
    /**
     * The default language in the request header.
     *
     * @const
     * @type {string}
     */
    DEFAULT_LANGUAGE: "en-us",
    /**
     * The ms-rest-azure version.
     * @const
     * @type {string}
     */
    msRestAzureVersion: "0.1.0"
};
exports.default = Constants;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const azureServiceClient_1 = __webpack_require__(3);
exports.AzureServiceClient = azureServiceClient_1.AzureServiceClient;
const constants_1 = __webpack_require__(1);
exports.Constants = constants_1.default;
const cloudError_1 = __webpack_require__(5);
exports.CloudErrorMapper = cloudError_1.CloudErrorMapper;
const baseResource_1 = __webpack_require__(6);
exports.BaseResourceMapper = baseResource_1.BaseResourceMapper;
const cognitiveServicesCredentials_1 = __webpack_require__(7);
exports.CognitiveServicesCredentials = cognitiveServicesCredentials_1.CognitiveServicesCredentials;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
const msRest = __webpack_require__(0);
const constants_1 = __webpack_require__(1);
const pollingState_1 = __webpack_require__(4);
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
            const parsedResponse = result.parsedBody;
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
                pollingState.resource = result.parsedBody;
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
            const parsedResponse = result.parsedBody;
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
            if (!result.parsedBody) {
                return Promise.reject(new Error("The response from long running operation does not contain a body."));
            }
            const parsedResponse = result.parsedBody;
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
            const responseBody = operationResponse.parsedBody;
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(1);
const msRest = __webpack_require__(0);
const LroStates = constants_1.default.LongRunningOperationStates;
/**
 * @class
 * Initializes a new instance of the PollingState class.
 */
class PollingState {
    constructor(resultOfInitialRequest, retryTimeout = 30) {
        /**
         * @param {number} [retryTimeout] - The timeout in seconds to retry on intermediate operation results. Default Value is 30.
         */
        this.retryTimeout = 30;
        this.resultOfInitialRequest = resultOfInitialRequest;
        this.retryTimeout = retryTimeout;
        this.updateResponse(resultOfInitialRequest.response);
        this.request = resultOfInitialRequest.request;
        // Parse response.body & assign it as the resource.
        try {
            if (resultOfInitialRequest.bodyAsText && resultOfInitialRequest.bodyAsText.length > 0) {
                this.resource = JSON.parse(resultOfInitialRequest.bodyAsText);
            }
            else {
                this.resource = resultOfInitialRequest.parsedBody;
            }
        }
        catch (error) {
            const deserializationError = new msRest.RestError(`Error "${error}" occurred in parsing the responseBody " +
        "while creating the PollingState for Long Running Operation- "${resultOfInitialRequest.bodyAsText}"`);
            deserializationError.request = resultOfInitialRequest.request;
            deserializationError.response = resultOfInitialRequest.response;
            throw deserializationError;
        }
        switch (this.response.status) {
            case 202:
                this.status = LroStates.InProgress;
                break;
            case 204:
                this.status = LroStates.Succeeded;
                break;
            case 201:
                if (this.resource && this.resource.properties && this.resource.properties.provisioningState) {
                    this.status = this.resource.properties.provisioningState;
                }
                else {
                    this.status = LroStates.InProgress;
                }
                break;
            case 200:
                if (this.resource && this.resource.properties && this.resource.properties.provisioningState) {
                    this.status = this.resource.properties.provisioningState;
                }
                else {
                    this.status = LroStates.Succeeded;
                }
                break;
            default:
                this.status = LroStates.Failed;
                break;
        }
    }
    /**
     * Update cached data using the provided response object
     * @param {Response} [response] - provider response object.
     */
    updateResponse(response) {
        this.response = response;
        if (response && response.headers) {
            const asyncOperationHeader = response.headers.get("azure-asyncoperation");
            const locationHeader = response.headers.get("location");
            if (asyncOperationHeader) {
                this.azureAsyncOperationHeaderLink = asyncOperationHeader;
            }
            if (locationHeader) {
                this.locationHeaderLink = locationHeader;
            }
        }
    }
    /**
     * Gets timeout in milliseconds.
     * @returns {number} timeout
     */
    getTimeout() {
        if (this.retryTimeout || this.retryTimeout === 0) {
            return this.retryTimeout * 1000;
        }
        if (this.response) {
            const retryAfter = this.response.headers.get("retry-after");
            if (retryAfter) {
                return parseInt(retryAfter) * 1000;
            }
        }
        return 30 * 1000;
    }
    /**
     * Returns long running operation result.
     * @returns {msRest.HttpOperationResponse} HttpOperationResponse
     */
    getOperationResponse() {
        const result = new msRest.HttpOperationResponse(this.request, this.response);
        if (this.resource && typeof this.resource.valueOf() === "string") {
            result.bodyAsText = this.resource;
            result.parsedBody = JSON.parse(this.resource);
        }
        else {
            result.parsedBody = this.resource;
            result.bodyAsText = JSON.stringify(this.resource);
        }
        return result;
    }
    /**
     * Returns an Error on operation failure.
     * @param {Error} err - The error object.
     * @returns {msRest.RestError} The RestError defined in the runtime.
     */
    getRestError(err) {
        let errMsg;
        let errCode = undefined;
        const error = new msRest.RestError("");
        error.request = msRest.stripRequest(this.request);
        error.response = this.response;
        const parsedResponse = this.resource;
        if (err && err.message) {
            errMsg = `Long running operation failed with error: "${err.message}".`;
        }
        else {
            errMsg = `Long running operation failed with status: "${this.status}".`;
        }
        if (parsedResponse) {
            if (parsedResponse.error && parsedResponse.error.message) {
                errMsg = `Long running operation failed with error: "${parsedResponse.error.message}".`;
            }
            if (parsedResponse.error && parsedResponse.error.code) {
                errCode = parsedResponse.error.code;
            }
        }
        error.message = errMsg;
        if (errCode)
            error.code = errCode;
        error.body = parsedResponse;
        return error;
    }
}
exports.default = PollingState;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudErrorMapper = {
    required: false,
    serializedName: "CloudError",
    type: {
        name: "Composite",
        className: "CloudError",
        modelProperties: {
            code: {
                required: true,
                serializedName: "code",
                type: {
                    name: "String"
                }
            },
            message: {
                required: true,
                serializedName: "message",
                type: {
                    name: "String"
                }
            },
            target: {
                required: false,
                serializedName: "target",
                type: {
                    name: "String"
                }
            },
            details: {
                required: false,
                serializedName: "details",
                type: {
                    name: "Sequence",
                    element: {
                        required: false,
                        serializedName: "CloudErrorElementType",
                        type: {
                            name: "Composite",
                            className: "CloudError"
                        }
                    }
                }
            }
        }
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResourceMapper = {
    required: false,
    serializedName: "BaseResource",
    type: {
        name: "Composite",
        className: "BaseResource",
        modelProperties: {}
    }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const ms_rest_js_1 = __webpack_require__(0);
/**
 * Creates a new CognitiveServicesCredentials object.
 *
 * @constructor
 * @param {string} subscriptionKey   The CognitiveServices subscription key
 */
class CognitiveServicesCredentials extends ms_rest_js_1.ApiKeyCredentials {
    constructor(subscriptionKey) {
        if (!subscriptionKey || (subscriptionKey && typeof subscriptionKey.valueOf() !== "string")) {
            throw new Error("subscriptionKey cannot be null or undefined and must be of type string.");
        }
        const options = {
            inHeader: {
                "Ocp-Apim-Subscription-Key": subscriptionKey,
                "X-BingApis-SDK-Client": "node-SDK"
            }
        };
        super(options);
    }
}
exports.CognitiveServicesCredentials = CognitiveServicesCredentials;


/***/ })
/******/ ]);
//# sourceMappingURL=msRestAzureBundle.js.map