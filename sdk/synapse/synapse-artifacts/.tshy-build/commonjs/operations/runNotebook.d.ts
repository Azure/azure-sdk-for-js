import type { RunNotebook } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { RunNotebookRequest, RunNotebookCreateRunOptionalParams, RunNotebookCreateRunResponse, RunNotebookGetStatusOptionalParams, RunNotebookGetStatusResponse, RunNotebookCancelRunOptionalParams, RunNotebookCancelRunResponse, RunNotebookGetSnapshotOptionalParams, RunNotebookGetSnapshotResponse } from "../models/index.js";
/** Class containing RunNotebook operations. */
export declare class RunNotebookImpl implements RunNotebook {
    private readonly client;
    /**
     * Initialize a new instance of the class RunNotebook class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Run notebook
     * @param runId - Notebook run id.
     * @param runNotebookRequest - Run notebook request payload.
     * @param options - The options parameters.
     */
    beginCreateRun(runId: string, runNotebookRequest: RunNotebookRequest, options?: RunNotebookCreateRunOptionalParams): Promise<SimplePollerLike<OperationState<RunNotebookCreateRunResponse>, RunNotebookCreateRunResponse>>;
    /**
     * Run notebook
     * @param runId - Notebook run id.
     * @param runNotebookRequest - Run notebook request payload.
     * @param options - The options parameters.
     */
    beginCreateRunAndWait(runId: string, runNotebookRequest: RunNotebookRequest, options?: RunNotebookCreateRunOptionalParams): Promise<RunNotebookCreateRunResponse>;
    /**
     * Get RunNotebook Status for run id.
     * @param runId - Notebook run id.
     * @param options - The options parameters.
     */
    getStatus(runId: string, options?: RunNotebookGetStatusOptionalParams): Promise<RunNotebookGetStatusResponse>;
    /**
     * Cancel notebook run.
     * @param runId - Notebook run id.
     * @param options - The options parameters.
     */
    cancelRun(runId: string, options?: RunNotebookCancelRunOptionalParams): Promise<RunNotebookCancelRunResponse>;
    /**
     * Get RunNotebook Snapshot for run id.
     * @param runId - Notebook run id.
     * @param options - The options parameters.
     */
    getSnapshot(runId: string, options?: RunNotebookGetSnapshotOptionalParams): Promise<RunNotebookGetSnapshotResponse>;
}
//# sourceMappingURL=runNotebook.d.ts.map