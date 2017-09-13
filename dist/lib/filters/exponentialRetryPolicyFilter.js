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
const baseFilter_1 = require("./baseFilter");
const utils = require("../util/utils");
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
class ExponentialRetryPolicyFilter extends baseFilter_1.BaseFilter {
    constructor(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        super();
        this.DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
        this.DEFAULT_CLIENT_RETRY_COUNT = 3;
        this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
        this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
        this.retryCount = typeof retryCount === "number" ? retryCount : this.DEFAULT_CLIENT_RETRY_COUNT;
        this.retryInterval = typeof retryInterval === "number" ? retryInterval : this.DEFAULT_CLIENT_RETRY_INTERVAL;
        this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
    }
    /**
     * Determines if the operation should be retried and how long to wait until the next retry.
     *
     * @param {number} statusCode The HTTP status code.
     * @param {RetryData} retryData  The retry data.
     * @return {boolean} True if the operation qualifies for a retry; false otherwise.
     */
    shouldRetry(statusCode, retryData) {
        if ((statusCode < 500 && statusCode !== 408) || statusCode === 501 || statusCode === 505) {
            return false;
        }
        let currentCount;
        if (!retryData) {
            throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
        }
        else {
            currentCount = (retryData && retryData.retryCount);
        }
        return (currentCount < this.retryCount);
    }
    /**
     * Updates the retry data for the next attempt.
     *
     * @param {RetryData} retryData  The retry data.
     * @param {object} err        The operation"s error, if any.
     */
    updateRetryData(retryData, err) {
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
        let incrementDelta = Math.pow(2, retryData.retryCount) - 1;
        const boundedRandDelta = this.retryInterval * 0.8 +
            Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
        incrementDelta *= boundedRandDelta;
        retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);
        return retryData;
    }
    retry(operationResponse, retryData, err) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const response = operationResponse.response;
            retryData = self.updateRetryData(retryData, err);
            if (!utils.objectIsNull(response) && self.shouldRetry(response.status, retryData)) {
                try {
                    yield utils.delay(retryData.retryInterval);
                    const res = yield utils.dispatchRequest(operationResponse.request);
                    return self.retry(res, retryData, err);
                }
                catch (err) {
                    return self.retry(operationResponse, retryData, err);
                }
            }
            else {
                if (!utils.objectIsNull(err)) {
                    // If the operation failed in the end, return all errors instead of just the last one
                    err = retryData.error;
                    return Promise.reject(err);
                }
                return Promise.resolve(operationResponse);
            }
        });
    }
    after(operationResponse) {
        return this.retry(operationResponse);
    }
}
exports.ExponentialRetryPolicyFilter = ExponentialRetryPolicyFilter;
//# sourceMappingURL=exponentialRetryPolicyFilter.js.map