import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";
import type { RequestContext } from "../request/RequestContext.js";
import { DefaultRetryPolicy } from "./defaultRetryPolicy.js";
import { EndpointDiscoveryRetryPolicy } from "./endpointDiscoveryRetryPolicy.js";
import { ResourceThrottleRetryPolicy } from "./resourceThrottleRetryPolicy.js";
import type { RetryContext } from "./RetryContext.js";
import { SessionRetryPolicy } from "./sessionRetryPolicy.js";
import { TimeoutFailoverRetryPolicy } from "./timeoutFailoverRetryPolicy.js";
/**
 * @hidden
 */
interface ExecuteArgs {
    retryContext?: RetryContext;
    diagnosticNode: DiagnosticNodeInternal;
    retryPolicies?: RetryPolicies;
    requestContext: RequestContext;
    executeRequest: (diagnosticNode: DiagnosticNodeInternal, requestContext: RequestContext) => Promise<Response<any>>;
}
/**
 * @hidden
 */
interface RetryPolicies {
    endpointDiscoveryRetryPolicy: EndpointDiscoveryRetryPolicy;
    resourceThrottleRetryPolicy: ResourceThrottleRetryPolicy;
    sessionReadRetryPolicy: SessionRetryPolicy;
    defaultRetryPolicy: DefaultRetryPolicy;
    timeoutFailoverRetryPolicy: TimeoutFailoverRetryPolicy;
}
/**
 * @hidden
 */
export declare function execute({ diagnosticNode, retryContext, retryPolicies, requestContext, executeRequest, }: ExecuteArgs): Promise<Response<any>>;
export {};
//# sourceMappingURL=retryUtility.d.ts.map