import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ErrorResponse } from "../request/index.js";
import type { RetryContext } from "./RetryContext.js";
/**
 * @hidden
 */
export interface RetryPolicy {
    retryAfterInMs: number;
    shouldRetry: (errorResponse: ErrorResponse, diagnosticNode: DiagnosticNodeInternal, retryContext?: RetryContext, locationEndpoint?: string) => Promise<boolean | [boolean, string]>;
}
//# sourceMappingURL=RetryPolicy.d.ts.map