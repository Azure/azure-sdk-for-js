"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRetryPolicy = void 0;
exports.NewRetryPolicyFactory = NewRetryPolicyFactory;
const abort_controller_1 = require("@azure/abort-controller");
const RequestPolicy_js_1 = require("./RequestPolicy.js");
const constants_js_1 = require("../utils/constants.js");
const utils_common_js_1 = require("../utils/utils.common.js");
const log_js_1 = require("../log.js");
const StorageRetryPolicyType_js_1 = require("./StorageRetryPolicyType.js");
/**
 * A factory method used to generated a RetryPolicy factory.
 *
 * @param retryOptions -
 */
function NewRetryPolicyFactory(retryOptions) {
    return {
        create: (nextPolicy, options) => {
            return new StorageRetryPolicy(nextPolicy, options, retryOptions);
        },
    };
}
// Default values of StorageRetryOptions
const DEFAULT_RETRY_OPTIONS = {
    maxRetryDelayInMs: 120 * 1000,
    maxTries: 4,
    retryDelayInMs: 4 * 1000,
    retryPolicyType: StorageRetryPolicyType_js_1.StorageRetryPolicyType.EXPONENTIAL,
    secondaryHost: "",
    tryTimeoutInMs: undefined, // Use server side default timeout strategy
};
const RETRY_ABORT_ERROR = new abort_controller_1.AbortError("The operation was aborted.");
/**
 * Retry policy with exponential retry and linear retry implemented.
 */
class StorageRetryPolicy extends RequestPolicy_js_1.BaseRequestPolicy {
    /**
     * Creates an instance of RetryPolicy.
     *
     * @param nextPolicy -
     * @param options -
     * @param retryOptions -
     */
    constructor(nextPolicy, options, retryOptions = DEFAULT_RETRY_OPTIONS) {
        super(nextPolicy, options);
        // Initialize retry options
        this.retryOptions = {
            retryPolicyType: retryOptions.retryPolicyType
                ? retryOptions.retryPolicyType
                : DEFAULT_RETRY_OPTIONS.retryPolicyType,
            maxTries: retryOptions.maxTries && retryOptions.maxTries >= 1
                ? Math.floor(retryOptions.maxTries)
                : DEFAULT_RETRY_OPTIONS.maxTries,
            tryTimeoutInMs: retryOptions.tryTimeoutInMs && retryOptions.tryTimeoutInMs >= 0
                ? retryOptions.tryTimeoutInMs
                : DEFAULT_RETRY_OPTIONS.tryTimeoutInMs,
            retryDelayInMs: retryOptions.retryDelayInMs && retryOptions.retryDelayInMs >= 0
                ? Math.min(retryOptions.retryDelayInMs, retryOptions.maxRetryDelayInMs
                    ? retryOptions.maxRetryDelayInMs
                    : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs)
                : DEFAULT_RETRY_OPTIONS.retryDelayInMs,
            maxRetryDelayInMs: retryOptions.maxRetryDelayInMs && retryOptions.maxRetryDelayInMs >= 0
                ? retryOptions.maxRetryDelayInMs
                : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs,
            secondaryHost: retryOptions.secondaryHost
                ? retryOptions.secondaryHost
                : DEFAULT_RETRY_OPTIONS.secondaryHost,
        };
    }
    /**
     * Sends request.
     *
     * @param request -
     */
    async sendRequest(request) {
        return this.attemptSendRequest(request, false, 1);
    }
    /**
     * Decide and perform next retry. Won't mutate request parameter.
     *
     * @param request -
     * @param secondaryHas404 -  If attempt was against the secondary & it returned a StatusNotFound (404), then
     *                                   the resource was not found. This may be due to replication delay. So, in this
     *                                   case, we'll never try the secondary again for this operation.
     * @param attempt -           How many retries has been attempted to performed, starting from 1, which includes
     *                                   the attempt will be performed by this method call.
     */
    async attemptSendRequest(request, secondaryHas404, attempt) {
        const newRequest = request.clone();
        const isPrimaryRetry = secondaryHas404 ||
            !this.retryOptions.secondaryHost ||
            !(request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") ||
            attempt % 2 === 1;
        if (!isPrimaryRetry) {
            newRequest.url = (0, utils_common_js_1.setURLHost)(newRequest.url, this.retryOptions.secondaryHost);
        }
        // Set the server-side timeout query parameter "timeout=[seconds]"
        if (this.retryOptions.tryTimeoutInMs) {
            newRequest.url = (0, utils_common_js_1.setURLParameter)(newRequest.url, constants_js_1.URLConstants.Parameters.TIMEOUT, Math.floor(this.retryOptions.tryTimeoutInMs / 1000).toString());
        }
        let response;
        try {
            log_js_1.logger.info(`RetryPolicy: =====> Try=${attempt} ${isPrimaryRetry ? "Primary" : "Secondary"}`);
            response = await this._nextPolicy.sendRequest(newRequest);
            if (!this.shouldRetry(isPrimaryRetry, attempt, response)) {
                return response;
            }
            secondaryHas404 = secondaryHas404 || (!isPrimaryRetry && response.status === 404);
        }
        catch (err) {
            log_js_1.logger.error(`RetryPolicy: Caught error, message: ${err.message}, code: ${err.code}`);
            if (!this.shouldRetry(isPrimaryRetry, attempt, response, err)) {
                throw err;
            }
        }
        await this.delay(isPrimaryRetry, attempt, request.abortSignal);
        return this.attemptSendRequest(request, secondaryHas404, ++attempt);
    }
    /**
     * Decide whether to retry according to last HTTP response and retry counters.
     *
     * @param isPrimaryRetry -
     * @param attempt -
     * @param response -
     * @param err -
     */
    shouldRetry(isPrimaryRetry, attempt, response, err) {
        if (attempt >= this.retryOptions.maxTries) {
            log_js_1.logger.info(`RetryPolicy: Attempt(s) ${attempt} >= maxTries ${this.retryOptions
                .maxTries}, no further try.`);
            return false;
        }
        // Handle network failures, you may need to customize the list when you implement
        // your own http client
        const retriableErrors = [
            "ETIMEDOUT",
            "ESOCKETTIMEDOUT",
            "ECONNREFUSED",
            "ECONNRESET",
            "ENOENT",
            "ENOTFOUND",
            "TIMEOUT",
            "EPIPE",
            "REQUEST_SEND_ERROR", // For default xhr based http client provided in ms-rest-js
        ];
        if (err) {
            for (const retriableError of retriableErrors) {
                if (err.name.toUpperCase().includes(retriableError) ||
                    err.message.toUpperCase().includes(retriableError) ||
                    (err.code && err.code.toString().toUpperCase() === retriableError)) {
                    log_js_1.logger.info(`RetryPolicy: Network error ${retriableError} found, will retry.`);
                    return true;
                }
            }
        }
        // If attempt was against the secondary & it returned a StatusNotFound (404), then
        // the resource was not found. This may be due to replication delay. So, in this
        // case, we'll never try the secondary again for this operation.
        if (response || err) {
            const statusCode = response ? response.status : err ? err.statusCode : 0;
            if (!isPrimaryRetry && statusCode === 404) {
                log_js_1.logger.info(`RetryPolicy: Secondary access with 404, will retry.`);
                return true;
            }
            // Server internal error or server timeout
            if (statusCode === 503 || statusCode === 500) {
                log_js_1.logger.info(`RetryPolicy: Will retry for status code ${statusCode}.`);
                return true;
            }
        }
        // [Copy source error code] Feature is pending on service side, skip retry on copy source error for now.
        // if (response) {
        //   // Retry select Copy Source Error Codes.
        //   if (response?.status >= 400) {
        //     const copySourceError = response.headers.get(HeaderConstants.X_MS_CopySourceErrorCode);
        //     if (copySourceError !== undefined) {
        //       switch (copySourceError) {
        //         case "InternalError":
        //         case "OperationTimedOut":
        //         case "ServerBusy":
        //           return true;
        //       }
        //     }
        //   }
        // }
        if ((err === null || err === void 0 ? void 0 : err.code) === "PARSE_ERROR" && (err === null || err === void 0 ? void 0 : err.message.startsWith(`Error "Error: Unclosed root tag`))) {
            log_js_1.logger.info("RetryPolicy: Incomplete XML response likely due to service timeout, will retry.");
            return true;
        }
        return false;
    }
    /**
     * Delay a calculated time between retries.
     *
     * @param isPrimaryRetry -
     * @param attempt -
     * @param abortSignal -
     */
    async delay(isPrimaryRetry, attempt, abortSignal) {
        let delayTimeInMs = 0;
        if (isPrimaryRetry) {
            switch (this.retryOptions.retryPolicyType) {
                case StorageRetryPolicyType_js_1.StorageRetryPolicyType.EXPONENTIAL:
                    delayTimeInMs = Math.min((Math.pow(2, attempt - 1) - 1) * this.retryOptions.retryDelayInMs, this.retryOptions.maxRetryDelayInMs);
                    break;
                case StorageRetryPolicyType_js_1.StorageRetryPolicyType.FIXED:
                    delayTimeInMs = this.retryOptions.retryDelayInMs;
                    break;
            }
        }
        else {
            delayTimeInMs = Math.random() * 1000;
        }
        log_js_1.logger.info(`RetryPolicy: Delay for ${delayTimeInMs}ms`);
        return (0, utils_common_js_1.delay)(delayTimeInMs, abortSignal, RETRY_ABORT_ERROR);
    }
}
exports.StorageRetryPolicy = StorageRetryPolicy;
//# sourceMappingURL=StorageRetryPolicy.js.map