import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { OperationType } from "../common/index.js";
import type { ErrorResponse } from "../request/index.js";
import type { RetryPolicy } from "./RetryPolicy.js";
/**
 * This class implements the default connection retry policy for requests.
 * @hidden
 */
export declare class DefaultRetryPolicy implements RetryPolicy {
    private operationType;
    private maxTries;
    private currentRetryAttemptCount;
    retryAfterInMs: number;
    constructor(operationType: OperationType);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal): Promise<boolean>;
}
//# sourceMappingURL=defaultRetryPolicy.d.ts.map