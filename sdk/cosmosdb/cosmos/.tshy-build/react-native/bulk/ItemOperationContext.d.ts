import { type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { RetryPolicy } from "../retry/RetryPolicy.js";
import type { BulkOperationResult } from "../utils/batch.js";
/**
 * Context for a particular @see {@link ItemOperation}.
 * @hidden
 */
export declare class ItemOperationContext {
    pkRangeId: string;
    retryPolicy: RetryPolicy;
    diagnosticNode: DiagnosticNodeInternal;
    private readonly taskCompletionSource;
    constructor(pkRangeId: string, retryPolicy: RetryPolicy, diagnosticNode: DiagnosticNodeInternal);
    get operationPromise(): Promise<BulkOperationResult>;
    addDiagnosticChild(diagnosticNode: DiagnosticNodeInternal): void;
    updatePKRangeId(pkRangeId: string): void;
    complete(result: BulkOperationResult): void;
    fail(error: BulkOperationResult): void;
}
//# sourceMappingURL=ItemOperationContext.d.ts.map