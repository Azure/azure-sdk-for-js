import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ErrorResponse } from "../index.js";
import type { RetryPolicy } from "./RetryPolicy.js";
/**
 * This class implements the retry policy for bulk operations.
 * @hidden
 */
export declare class BulkExecutionRetryPolicy implements RetryPolicy {
    retryAfterInMs: number;
    private retriesOn410;
    private readonly MaxRetriesOn410;
    private readonly SubstatusCodeBatchResponseSizeExceeded;
    nextRetryPolicy: RetryPolicy;
    constructor(nextRetryPolicy: RetryPolicy);
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal): Promise<boolean | [boolean, string]>;
}
//# sourceMappingURL=bulkExecutionRetryPolicy.d.ts.map