"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
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
var baseFilter_1 = require("./baseFilter");
var utils = require("../util/utils");
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
var ExponentialRetryPolicyFilter = /** @class */ (function (_super) {
    __extends(ExponentialRetryPolicyFilter, _super);
    function ExponentialRetryPolicyFilter(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        var _this = _super.call(this) || this;
        _this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
        _this.DEFAULT_CLIENT_RETRY_COUNT = 3;
        _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
        _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
        _this.retryCount = typeof retryCount === "number" ? retryCount : _this.DEFAULT_CLIENT_RETRY_COUNT;
        _this.retryInterval = typeof retryInterval === "number" ? retryInterval : _this.DEFAULT_CLIENT_RETRY_INTERVAL;
        _this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : _this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        _this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : _this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
        return _this;
    }
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    ExponentialRetryPolicyFilter.prototype.shouldRetry = function (statusCode, retryData) {
        if ((statusCode < 500 && statusCode !== 408) || statusCode === 501 || statusCode === 505) {
            return false;
        }
        var currentCount;
        if (!retryData) {
            throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = (retryData && retryData.retryCount);
        }
        return (currentCount < this.retryCount);
    };
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    ExponentialRetryPolicyFilter.prototype.updateRetryData = function (retryData, err) {
        if (!retryData) {
            retryData = {
                retryCount: 0,
                retryInterval: 0
            };
        }
        if (err) {
            if (retryData.error) {
                err.innerError = retryData.error;
            }
            retryData.error = err;
        }
        // Adjust retry count
        retryData.retryCount++;
        // Adjust retry interval
        var incrementDelta = Math.pow(2, retryData.retryCount) - 1;
        var boundedRandDelta = this.retryInterval * 0.8 +
            Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);
        return retryData;
    };
    ExponentialRetryPolicyFilter.prototype.retry = function (operationResponse, retryData, err) {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        response = operationResponse.response;
                        retryData = self.updateRetryData(retryData, err);
                        if (!(!utils.objectIsNull(response) && self.shouldRetry(response.status, retryData))) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, utils.delay(retryData.retryInterval)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, utils.dispatchRequest(operationResponse.request)];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, self.retry(res, retryData, err)];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, self.retry(operationResponse, retryData, err_1)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (!utils.objectIsNull(err)) {
                            // If the operation failed in the end, return all errors instead of just the last one
                            err = retryData.error;
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/, Promise.resolve(operationResponse)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ExponentialRetryPolicyFilter.prototype.after = function (operationResponse) {
        return this.retry(operationResponse);
    };
    return ExponentialRetryPolicyFilter;
}(baseFilter_1.BaseFilter));
exports.ExponentialRetryPolicyFilter = ExponentialRetryPolicyFilter;
//# sourceMappingURL=exponentialRetryPolicyFilter.js.map