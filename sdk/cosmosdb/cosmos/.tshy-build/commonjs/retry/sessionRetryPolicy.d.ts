import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { OperationType, ResourceType } from "../common/index.js";
import type { ConnectionPolicy } from "../documents/index.js";
import type { GlobalEndpointManager } from "../globalEndpointManager.js";
import type { ErrorResponse } from "../request/index.js";
import type { RetryContext } from "./RetryContext.js";
import type { RetryPolicy } from "./RetryPolicy.js";
/**
 * This class implements the retry policy for session consistent reads.
 * @hidden
 */
export declare class SessionRetryPolicy implements RetryPolicy {
    private globalEndpointManager;
    private resourceType;
    private operationType;
    private connectionPolicy;
    /** Current retry attempt count. */
    currentRetryAttemptCount: number;
    /** Retry interval in milliseconds. */
    retryAfterInMs: number;
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager: GlobalEndpointManager, resourceType: ResourceType, operationType: OperationType, connectionPolicy: ConnectionPolicy);
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     * @param callback - The callback function which takes bool argument which specifies whether the request
     * will be retried or not.
     */
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal, retryContext?: RetryContext): Promise<boolean>;
}
//# sourceMappingURL=sessionRetryPolicy.d.ts.map