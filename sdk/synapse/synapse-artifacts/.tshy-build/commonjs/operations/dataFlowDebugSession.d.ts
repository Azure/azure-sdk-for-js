import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { DataFlowDebugSession } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { DataFlowDebugSessionInfo, DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams, CreateDataFlowDebugSessionRequest, DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams, DataFlowDebugSessionCreateDataFlowDebugSessionResponse, DataFlowDebugPackage, DataFlowDebugSessionAddDataFlowOptionalParams, DataFlowDebugSessionAddDataFlowResponse, DeleteDataFlowDebugSessionRequest, DataFlowDebugSessionDeleteDataFlowDebugSessionOptionalParams, DataFlowDebugCommandRequest, DataFlowDebugSessionExecuteCommandOptionalParams, DataFlowDebugSessionExecuteCommandResponse } from "../models/index.js";
/** Class containing DataFlowDebugSession operations. */
export declare class DataFlowDebugSessionImpl implements DataFlowDebugSession {
    private readonly client;
    /**
     * Initialize a new instance of the class DataFlowDebugSession class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Query all active data flow debug sessions.
     * @param options - The options parameters.
     */
    listQueryDataFlowDebugSessionsByWorkspace(options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams): PagedAsyncIterableIterator<DataFlowDebugSessionInfo>;
    private queryDataFlowDebugSessionsByWorkspacePagingPage;
    private queryDataFlowDebugSessionsByWorkspacePagingAll;
    /**
     * Creates a data flow debug session.
     * @param request - Data flow debug session definition
     * @param options - The options parameters.
     */
    beginCreateDataFlowDebugSession(request: CreateDataFlowDebugSessionRequest, options?: DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams): Promise<SimplePollerLike<OperationState<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>, DataFlowDebugSessionCreateDataFlowDebugSessionResponse>>;
    /**
     * Creates a data flow debug session.
     * @param request - Data flow debug session definition
     * @param options - The options parameters.
     */
    beginCreateDataFlowDebugSessionAndWait(request: CreateDataFlowDebugSessionRequest, options?: DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams): Promise<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>;
    /**
     * Query all active data flow debug sessions.
     * @param options - The options parameters.
     */
    private _queryDataFlowDebugSessionsByWorkspace;
    /**
     * Add a data flow into debug session.
     * @param request - Data flow debug session definition with debug content.
     * @param options - The options parameters.
     */
    addDataFlow(request: DataFlowDebugPackage, options?: DataFlowDebugSessionAddDataFlowOptionalParams): Promise<DataFlowDebugSessionAddDataFlowResponse>;
    /**
     * Deletes a data flow debug session.
     * @param request - Data flow debug session definition for deletion
     * @param options - The options parameters.
     */
    deleteDataFlowDebugSession(request: DeleteDataFlowDebugSessionRequest, options?: DataFlowDebugSessionDeleteDataFlowDebugSessionOptionalParams): Promise<void>;
    /**
     * Execute a data flow debug command.
     * @param request - Data flow debug command definition.
     * @param options - The options parameters.
     */
    beginExecuteCommand(request: DataFlowDebugCommandRequest, options?: DataFlowDebugSessionExecuteCommandOptionalParams): Promise<SimplePollerLike<OperationState<DataFlowDebugSessionExecuteCommandResponse>, DataFlowDebugSessionExecuteCommandResponse>>;
    /**
     * Execute a data flow debug command.
     * @param request - Data flow debug command definition.
     * @param options - The options parameters.
     */
    beginExecuteCommandAndWait(request: DataFlowDebugCommandRequest, options?: DataFlowDebugSessionExecuteCommandOptionalParams): Promise<DataFlowDebugSessionExecuteCommandResponse>;
    /**
     * QueryDataFlowDebugSessionsByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the
     *                 QueryDataFlowDebugSessionsByWorkspace method.
     * @param options - The options parameters.
     */
    private _queryDataFlowDebugSessionsByWorkspaceNext;
}
//# sourceMappingURL=dataFlowDebugSession.d.ts.map