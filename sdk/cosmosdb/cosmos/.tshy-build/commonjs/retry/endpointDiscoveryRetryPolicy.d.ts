import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { OperationType } from "../common/index.js";
import type { GlobalEndpointManager } from "../globalEndpointManager.js";
import type { ErrorResponse } from "../request/index.js";
import type { RetryContext } from "./RetryContext.js";
import type { RetryPolicy } from "./RetryPolicy.js";
/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export declare class EndpointDiscoveryRetryPolicy implements RetryPolicy {
    private globalEndpointManager;
    private operationType;
    /** Current retry attempt count. */
    currentRetryAttemptCount: number;
    /** Retry interval in milliseconds. */
    retryAfterInMs: number;
    /** Max number of retry attempts to perform. */
    private maxTries;
    private static readonly maxTries;
    private static readonly retryAfterInMs;
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager: GlobalEndpointManager, operationType: OperationType);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal, retryContext?: RetryContext, locationEndpoint?: string): Promise<boolean | [boolean, string]>;
}
//# sourceMappingURL=endpointDiscoveryRetryPolicy.d.ts.map