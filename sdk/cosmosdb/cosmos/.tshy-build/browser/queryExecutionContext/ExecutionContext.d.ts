import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";
/** @hidden */
export interface ExecutionContext {
    nextItem?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
    hasMoreResults: () => boolean;
    fetchMore?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
}
//# sourceMappingURL=ExecutionContext.d.ts.map