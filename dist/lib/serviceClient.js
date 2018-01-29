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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var requestPipeline_1 = require("./requestPipeline");
var exponentialRetryPolicyFilter_1 = require("./filters/exponentialRetryPolicyFilter");
var systemErrorRetryPolicyFilter_1 = require("./filters/systemErrorRetryPolicyFilter");
var redirectFilter_1 = require("./filters/redirectFilter");
var signingFilter_1 = require("./filters/signingFilter");
var rpRegistrationFilter_1 = require("./filters/rpRegistrationFilter");
var msRestUserAgentFilter_1 = require("./filters/msRestUserAgentFilter");
var webResource_1 = require("./webResource");
var constants_1 = require("./util/constants");
/**
 * @class
 * Initializes a new instance of the ServiceClient.
 */
var ServiceClient = /** @class */ (function () {
    /**
     * The ServiceClient constructor
     * @constructor
     * @param {ServiceClientCredentials }[credentials] - BasicAuthenticationCredentials or
     * TokenCredentials object used for authentication.
     * @param { ServiceClientOptions } [options] The service client options that govern the behavior of the client.
     */
    function ServiceClient(credentials, options) {
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
            var moduleName = "ms-rest-js";
            var moduleVersion = constants_1.Constants.msRestVersion;
            this.addUserAgentInfo(moduleName + "/" + moduleVersion);
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
    ServiceClient.prototype.addUserAgentInfo = function (additionalUserAgentInfo) {
        if (this.userAgentInfo.value.indexOf(additionalUserAgentInfo) === -1) {
            this.userAgentInfo.value.push(additionalUserAgentInfo);
        }
        return;
    };
    ServiceClient.prototype.sendRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRequest, operationResponse, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options === null || options === undefined || typeof options !== "object") {
                            throw new Error("options cannot be null or undefined and it must be of type object.");
                        }
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
                            return [2 /*return*/, Promise.reject(error)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pipeline(httpRequest)];
                    case 2:
                        operationResponse = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    return ServiceClient;
}());
exports.ServiceClient = ServiceClient;
//# sourceMappingURL=serviceClient.js.map