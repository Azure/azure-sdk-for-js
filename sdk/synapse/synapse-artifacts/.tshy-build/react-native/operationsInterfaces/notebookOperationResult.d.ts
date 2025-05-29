import type { NotebookOperationResultGetOptionalParams } from "../models/index.js";
/** Interface representing a NotebookOperationResult. */
export interface NotebookOperationResult {
    /**
     * Get notebook operation result
     * @param operationId - Operation ID.
     * @param options - The options parameters.
     */
    get(operationId: string, options?: NotebookOperationResultGetOptionalParams): Promise<void>;
}
//# sourceMappingURL=notebookOperationResult.d.ts.map