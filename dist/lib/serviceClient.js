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
const requestPipeline_1 = require("./requestPipeline");
const exponentialRetryPolicyFilter_1 = require("./filters/exponentialRetryPolicyFilter");
const systemErrorRetryPolicyFilter_1 = require("./filters/systemErrorRetryPolicyFilter");
const redirectFilter_1 = require("./filters/redirectFilter");
const signingFilter_1 = require("./filters/signingFilter");
const rpRegistrationFilter_1 = require("./filters/rpRegistrationFilter");
const msRestUserAgentFilter_1 = require("./filters/msRestUserAgentFilter");
const webResource_1 = require("./webResource");
const constants_1 = require("./util/constants");
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
class ServiceClient {
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    constructor(credentials, options) {
        if (!options) {
            options = {};
        }
        if (!options.requestOptions) {
            options.requestOptions = {};
        }
        if (!options.filters) {
            options.filters = [];
        }
        this.userAgentInfo = { value: [] };
        if (credentials && !credentials.signRequest) {
            throw new Error("credentials argument needs to implement signRequest method");
        }
        try {
            const moduleName = "ms-rest-js";
            const moduleVersion = constants_1.Constants.msRestVersion;
            this.addUserAgentInfo(`${moduleName}/${moduleVersion}`);
        }
        catch (err) {
            // do nothing
        }
        if (credentials) {
            options.filters.push(new signingFilter_1.SigningFilter(credentials));
        }
        options.filters.push(new msRestUserAgentFilter_1.MsRestUserAgentFilter(this.userAgentInfo.value));
        options.filters.push(new redirectFilter_1.RedirectFilter());
        options.filters.push(new rpRegistrationFilter_1.RPRegistrationFilter(options.rpRegistrationRetryTimeout));
        if (!options.noRetryPolicy) {
            options.filters.push(new exponentialRetryPolicyFilter_1.ExponentialRetryPolicyFilter());
            options.filters.push(new systemErrorRetryPolicyFilter_1.SystemErrorRetryPolicyFilter());
        }
        this.pipeline = new requestPipeline_1.RequestPipeline(options.filters, options.requestOptions).create();
    }
    /**
     * Adds custom information to user agent header
     * @param {any} additionalUserAgentInfo - information to be added to user agent header, as string.
     */
    addUserAgentInfo(additionalUserAgentInfo) {
        if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
            this.userAgentInfo.value.push(additionalUserAgentInfo);
        }
        return;
    }
    sendRequest(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options === null || options === undefined || typeof options !== "object") {
                throw new Error("options cannot be null or undefined and it must be of type object.");
            }
            let httpRequest;
            try {
                if (options instanceof webResource_1.WebResource) {
                    options.validateRequestProperties();
                    httpRequest = options;
                }
                else {
                    httpRequest = new webResource_1.WebResource();
                    httpRequest = httpRequest.prepare(options);
                }
            }
            catch (error) {
                return Promise.reject(error);
            }
            // send request
            let operationResponse;
            try {
                operationResponse = yield this.pipeline(httpRequest);
            }
            catch (err) {
                return Promise.reject(err);
            }
            return Promise.resolve(operationResponse);
        });
    }
}
exports.ServiceClient = ServiceClient;
//# sourceMappingURL=serviceClient.js.map