import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ErrorResponse } from "../request/index.js";
import type { RetryOptions } from "./retryOptions.js";
/**
 * This class implements the resource throttle retry policy for requests.
 * @hidden
 */
export declare class ResourceThrottleRetryPolicy {
    /** Current retry attempt count. */
    currentRetryAttemptCount: number;
    /** Cummulative wait time in milliseconds for a request while the retries are happening. */
    cummulativeWaitTimeinMs: number;
    /** Retry interval in milliseconds to wait before the next request will be sent. */
    retryAfterInMs: number;
    /** Max wait time in milliseconds to wait for a request while the retries are happening. */
    private timeoutInMs;
    /**
     * @param maxTries - Max number of retries to be performed for a request.
     * @param fixedRetryIntervalInMs - Fixed retry interval in milliseconds to wait between each
     * retry ignoring the retryAfter returned as part of the response.
     * @param timeoutInSeconds - Max wait time in seconds to wait for a request while the
     * retries are happening.
     */
    private maxTries;
    private fixedRetryIntervalInMs;
    constructor(options: RetryOptions);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal): Promise<boolean>;
}
//# sourceMappingURL=resourceThrottleRetryPolicy.d.ts.map