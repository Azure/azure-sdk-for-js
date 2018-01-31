"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var baseFilter_1 = require("./baseFilter");
var utils = require("../util/utils");
/* tslint:disable:prefer-const */
var retryTimeout = 30;
/* tslint:enable:prefer-const */
var RPRegistrationFilter = /** @class */ (function (_super) {
    __extends(RPRegistrationFilter, _super);
    function RPRegistrationFilter(retryTimeout) {
        if (retryTimeout === void 0) { retryTimeout = 30; }
        var _this = _super.call(this) || this;
        retryTimeout = retryTimeout;
        return _this;
    }
    RPRegistrationFilter.prototype.after = function (operationResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var rpName, urlPrefix, options, registrationStatus, err_1, finalRes, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = operationResponse.request;
                        if (operationResponse.response.status === 409) {
                            rpName = this.checkRPNotRegisteredError(operationResponse.bodyAsText);
                        }
                        if (!rpName) return [3 /*break*/, 9];
                        urlPrefix = this.extractSubscriptionUrl(options.url);
                        registrationStatus = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.registerRP(urlPrefix, rpName, options)];
                    case 2:
                        registrationStatus = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!registrationStatus) return [3 /*break*/, 9];
                        // Retry the original request. We have to change the x-ms-client-request-id
                        // otherwise Azure endpoint will return the initial 409 (cached) response.
                        options.headers["x-ms-client-request-id"] = utils.generateUuid();
                        finalRes = void 0;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, utils.dispatchRequest(options)];
                    case 6:
                        finalRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 8: return [2 /*return*/, Promise.resolve(finalRes)];
                    case 9: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    /**
     * Reuses the headers of the original request and url (if specified).
     * @param {WebResource} originalRequest The original request
     * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
     * @returns {object} reqOptions - A new request object with desired headers.
     */
    RPRegistrationFilter.prototype.getRequestEssentials = function (originalRequest, reuseUrlToo) {
        if (reuseUrlToo === void 0) { reuseUrlToo = false; }
        var reqOptions = {
            headers: {}
        };
        if (reuseUrlToo) {
            reqOptions.url = originalRequest.url;
        }
        // Copy over the original request headers. This will get us the auth token and other useful stuff from
        // the original request header. Thus making it easier to make requests from this filter.
        for (var h in originalRequest.headers) {
            reqOptions.headers[h] = originalRequest.headers[h];
        }
        // We have to change the x-ms-client-request-id otherwise Azure endpoint
        // will return the initial 409 (cached) response.
        reqOptions.headers["x-ms-client-request-id"] = utils.generateUuid();
        // Set content-type to application/json
        reqOptions.headers["Content-Type"] = "application/json; charset=utf-8";
        return reqOptions;
    };
    /**
     * Validates the error code and message associated with 409 response status code. If it matches to that of
     * RP not registered then it returns the name of the RP else returns undefined.
     * @param {string} body - The response body received after making the original request.
     * @returns {string} result The name of the RP if condition is satisfied else undefined.
     */
    RPRegistrationFilter.prototype.checkRPNotRegisteredError = function (body) {
        var result, responseBody;
        if (body) {
            try {
                responseBody = JSON.parse(body);
            }
            catch (err) {
                // do nothing;
            }
            if (responseBody && responseBody.error && responseBody.error.message &&
                responseBody.error.code && responseBody.error.code === "MissingSubscriptionRegistration") {
                var matchRes = responseBody.error.message.match(/.*'(.*)'/i);
                if (matchRes) {
                    result = matchRes.pop();
                }
            }
        }
        return result;
    };
    /**
     * Extracts the first part of the URL, just after subscription:
     * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} url - The original request url
     * @returns {string} urlPrefix The url prefix as explained above.
     */
    RPRegistrationFilter.prototype.extractSubscriptionUrl = function (url) {
        var result;
        var matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//ig);
        if (matchRes && matchRes[0]) {
            result = matchRes[0];
        }
        else {
            throw new Error("Unable to extract subscriptionId from the given url - " + url + ".");
        }
        return result;
    };
    /**
     * Registers the given provider.
     * @param {string} urlPrefix - https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} provider - The provider name to be registered.
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @param {registrationCallback} callback - The callback that handles the RP registration
     */
    RPRegistrationFilter.prototype.registerRP = function (urlPrefix, provider, originalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var postUrl, getUrl, reqOptions, res, err_3, statusRes, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postUrl = urlPrefix + "providers/" + provider + "/register?api-version=2016-02-01";
                        getUrl = urlPrefix + "providers/" + provider + "?api-version=2016-02-01";
                        reqOptions = this.getRequestEssentials(originalRequest);
                        reqOptions.method = "POST";
                        reqOptions.url = postUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(reqOptions)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 4:
                        if (res.response.status !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Autoregistration of " + provider + " failed. Please try registering manually."))];
                        }
                        statusRes = false;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getRegistrationStatus(getUrl, originalRequest)];
                    case 6:
                        statusRes = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_4)];
                    case 8: return [2 /*return*/, Promise.resolve(statusRes)];
                }
            });
        });
    };
    /**
     * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
     * Polling will happen till the registrationState property of the response body is "Registered".
     * @param {string} url - The request url for polling
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @returns {Promise<boolean>} promise - True if RP Registration is successful.
     */
    RPRegistrationFilter.prototype.getRegistrationStatus = function (url, originalRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var reqOptions, res, result, err_5, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = this.getRequestEssentials(originalRequest);
                        result = false;
                        reqOptions.url = url;
                        reqOptions.method = "GET";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(reqOptions)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_5)];
                    case 4:
                        obj = res.bodyAsJson;
                        if (res.bodyAsJson && obj.registrationState && obj.registrationState === "Registered") {
                            result = true;
                        }
                        else {
                            setTimeout(function () { return _this.getRegistrationStatus(url, originalRequest); }, retryTimeout * 1000);
                        }
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return RPRegistrationFilter;
}(baseFilter_1.BaseFilter));
exports.RPRegistrationFilter = RPRegistrationFilter;
//# sourceMappingURL=rpRegistrationFilter.js.map