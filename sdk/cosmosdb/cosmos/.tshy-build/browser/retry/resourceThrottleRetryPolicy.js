// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
/**
 * This class implements the resource throttle retry policy for requests.
 * @hidden
 */
export class ResourceThrottleRetryPolicy {
    constructor(options) {
        var _a, _b, _c;
        /** Current retry attempt count. */
        this.currentRetryAttemptCount = 0;
        /** Cummulative wait time in milliseconds for a request while the retries are happening. */
        this.cummulativeWaitTimeinMs = 0;
        /** Retry interval in milliseconds to wait before the next request will be sent. */
        this.retryAfterInMs = 0;
        this.maxTries = (_a = options.maxRetryAttemptCount) !== null && _a !== void 0 ? _a : Constants.ThrottledRequestMaxRetryAttemptCount;
        this.fixedRetryIntervalInMs =
            (_b = options.fixedRetryIntervalInMilliseconds) !== null && _b !== void 0 ? _b : Constants.ThrottledRequestFixedRetryIntervalInMs;
        const timeoutInSeconds = (_c = options.maxWaitTimeInSeconds) !== null && _c !== void 0 ? _c : Constants.ThrottledRequestMaxWaitTimeInSeconds;
        this.timeoutInMs = timeoutInSeconds * 1000;
        this.currentRetryAttemptCount = 0;
        this.cummulativeWaitTimeinMs = 0;
    }
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    async shouldRetry(err, diagnosticNode) {
        // TODO: any custom error object
        if (err) {
            if (this.currentRetryAttemptCount < this.maxTries) {
                this.currentRetryAttemptCount++;
                this.retryAfterInMs = 0;
                if (this.fixedRetryIntervalInMs) {
                    this.retryAfterInMs = this.fixedRetryIntervalInMs;
                }
                else if (err.retryAfterInMs) {
                    this.retryAfterInMs = err.retryAfterInMs;
                }
                if (this.cummulativeWaitTimeinMs < this.timeoutInMs) {
                    this.cummulativeWaitTimeinMs += this.retryAfterInMs;
                    diagnosticNode.addData({ successfulRetryPolicy: "resourceThrottle" });
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=resourceThrottleRetryPolicy.js.map