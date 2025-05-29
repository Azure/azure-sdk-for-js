import type { WorkspaceOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { WorkspaceGetOptionalParams, WorkspaceGetResponse } from "../models/index.js";
/** Class containing WorkspaceOperations operations. */
export declare class WorkspaceOperationsImpl implements WorkspaceOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkspaceOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Get Workspace
     * @param options - The options parameters.
     */
    get(options?: WorkspaceGetOptionalParams): Promise<WorkspaceGetResponse>;
}
//# sourceMappingURL=workspaceOperations.d.ts.map