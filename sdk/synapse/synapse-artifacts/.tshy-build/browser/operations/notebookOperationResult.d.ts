import type { NotebookOperationResult } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { NotebookOperationResultGetOptionalParams } from "../models/index.js";
/** Class containing NotebookOperationResult operations. */
export declare class NotebookOperationResultImpl implements NotebookOperationResult {
    private readonly client;
    /**
     * Initialize a new instance of the class NotebookOperationResult class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Get notebook operation result
     * @param operationId - Operation ID.
     * @param options - The options parameters.
     */
    get(operationId: string, options?: NotebookOperationResultGetOptionalParams): Promise<void>;
}
//# sourceMappingURL=notebookOperationResult.d.ts.map