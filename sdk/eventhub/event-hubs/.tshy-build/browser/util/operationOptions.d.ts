import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationTracingOptions } from "@azure/core-tracing";
/**
 * Options for configuring tracing and the abortSignal.
 */
export interface OperationOptions {
    /**
     * The signal which can be used to abort requests.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Options for configuring tracing.
     */
    tracingOptions?: OperationTracingOptions;
}
//# sourceMappingURL=operationOptions.d.ts.map