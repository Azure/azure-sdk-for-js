import type { RetryPolicy } from "./RetryPolicy.js";
import type { GlobalEndpointManager } from "../globalEndpointManager.js";
import { HTTPMethod } from "../common/index.js";
import type { OperationType, ResourceType } from "../common/constants.js";
import type { RetryContext } from "./RetryContext.js";
import type { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders.js";
import type { ErrorResponse } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/**
 * This class TimeoutFailoverRetryPolicy handles retries for read operations
 * (including data plane,metadata, and query plan) in case of request timeouts
 * (TimeoutError) or service unavailability (503 status code) by performing failover
 * and retrying on other regions.
 * @hidden
 */
export declare class TimeoutFailoverRetryPolicy implements RetryPolicy {
    private globalEndpointManager;
    private headers;
    private methodType;
    private resourceType;
    private operationType;
    private enableEndPointDiscovery;
    private maxRetryAttemptCount;
    private maxServiceUnavailableRetryCount;
    retryAfterInMs: number;
    failoverRetryCount: number;
    request: any;
    locationEndpoint: any;
    constructor(globalEndpointManager: GlobalEndpointManager, headers: CosmosHeaders, methodType: HTTPMethod, resourceType: ResourceType, operationType: OperationType, enableEndPointDiscovery: boolean);
    /**
     * Checks if a timeout request is valid for the timeout failover retry policy.
     * A valid request should be a data plane, metadata, or query plan request.
     * @returns
     */
    private isValidRequestForTimeoutError;
    shouldRetry(err: ErrorResponse, diagnosticNode: DiagnosticNodeInternal, retryContext?: RetryContext, locationEndpoint?: string): Promise<boolean>;
    /**
     * Determines index of endpoint to be used for retry based upon failoverRetryCount and avalable locations
     * @param failoverRetryCount - count of failovers
     * @returns
     */
    private findEndpointIndex;
}
//# sourceMappingURL=timeoutFailoverRetryPolicy.d.ts.map