import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { DataFlowOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { DataFlowResource, DataFlowGetDataFlowsByWorkspaceOptionalParams, DataFlowCreateOrUpdateDataFlowOptionalParams, DataFlowCreateOrUpdateDataFlowResponse, DataFlowGetDataFlowOptionalParams, DataFlowGetDataFlowResponse, DataFlowDeleteDataFlowOptionalParams, ArtifactRenameRequest, DataFlowRenameDataFlowOptionalParams } from "../models/index.js";
/** Class containing DataFlowOperations operations. */
export declare class DataFlowOperationsImpl implements DataFlowOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class DataFlowOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists data flows.
     * @param options - The options parameters.
     */
    listDataFlowsByWorkspace(options?: DataFlowGetDataFlowsByWorkspaceOptionalParams): PagedAsyncIterableIterator<DataFlowResource>;
    private getDataFlowsByWorkspacePagingPage;
    private getDataFlowsByWorkspacePagingAll;
    /**
     * Creates or updates a data flow.
     * @param dataFlowName - The data flow name.
     * @param dataFlow - Data flow resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateDataFlow(dataFlowName: string, dataFlow: DataFlowResource, options?: DataFlowCreateOrUpdateDataFlowOptionalParams): Promise<SimplePollerLike<OperationState<DataFlowCreateOrUpdateDataFlowResponse>, DataFlowCreateOrUpdateDataFlowResponse>>;
    /**
     * Creates or updates a data flow.
     * @param dataFlowName - The data flow name.
     * @param dataFlow - Data flow resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateDataFlowAndWait(dataFlowName: string, dataFlow: DataFlowResource, options?: DataFlowCreateOrUpdateDataFlowOptionalParams): Promise<DataFlowCreateOrUpdateDataFlowResponse>;
    /**
     * Gets a data flow.
     * @param dataFlowName - The data flow name.
     * @param options - The options parameters.
     */
    getDataFlow(dataFlowName: string, options?: DataFlowGetDataFlowOptionalParams): Promise<DataFlowGetDataFlowResponse>;
    /**
     * Deletes a data flow.
     * @param dataFlowName - The data flow name.
     * @param options - The options parameters.
     */
    beginDeleteDataFlow(dataFlowName: string, options?: DataFlowDeleteDataFlowOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a data flow.
     * @param dataFlowName - The data flow name.
     * @param options - The options parameters.
     */
    beginDeleteDataFlowAndWait(dataFlowName: string, options?: DataFlowDeleteDataFlowOptionalParams): Promise<void>;
    /**
     * Renames a dataflow.
     * @param dataFlowName - The data flow name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameDataFlow(dataFlowName: string, request: ArtifactRenameRequest, options?: DataFlowRenameDataFlowOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a dataflow.
     * @param dataFlowName - The data flow name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameDataFlowAndWait(dataFlowName: string, request: ArtifactRenameRequest, options?: DataFlowRenameDataFlowOptionalParams): Promise<void>;
    /**
     * Lists data flows.
     * @param options - The options parameters.
     */
    private _getDataFlowsByWorkspace;
    /**
     * GetDataFlowsByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetDataFlowsByWorkspace
     *                 method.
     * @param options - The options parameters.
     */
    private _getDataFlowsByWorkspaceNext;
}
//# sourceMappingURL=dataFlowOperations.d.ts.map