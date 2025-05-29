import type { PipelineRunOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { RunFilterParameters, PipelineRunQueryPipelineRunsByWorkspaceOptionalParams, PipelineRunQueryPipelineRunsByWorkspaceResponse, PipelineRunGetPipelineRunOptionalParams, PipelineRunGetPipelineRunResponse, PipelineRunQueryActivityRunsOptionalParams, PipelineRunQueryActivityRunsResponse, PipelineRunCancelPipelineRunOptionalParams } from "../models/index.js";
/** Class containing PipelineRunOperations operations. */
export declare class PipelineRunOperationsImpl implements PipelineRunOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class PipelineRunOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Query pipeline runs in the workspace based on input filter conditions.
     * @param filterParameters - Parameters to filter the pipeline run.
     * @param options - The options parameters.
     */
    queryPipelineRunsByWorkspace(filterParameters: RunFilterParameters, options?: PipelineRunQueryPipelineRunsByWorkspaceOptionalParams): Promise<PipelineRunQueryPipelineRunsByWorkspaceResponse>;
    /**
     * Get a pipeline run by its run ID.
     * @param runId - The pipeline run identifier.
     * @param options - The options parameters.
     */
    getPipelineRun(runId: string, options?: PipelineRunGetPipelineRunOptionalParams): Promise<PipelineRunGetPipelineRunResponse>;
    /**
     * Query activity runs based on input filter conditions.
     * @param pipelineName - The pipeline name.
     * @param runId - The pipeline run identifier.
     * @param filterParameters - Parameters to filter the activity runs.
     * @param options - The options parameters.
     */
    queryActivityRuns(pipelineName: string, runId: string, filterParameters: RunFilterParameters, options?: PipelineRunQueryActivityRunsOptionalParams): Promise<PipelineRunQueryActivityRunsResponse>;
    /**
     * Cancel a pipeline run by its run ID.
     * @param runId - The pipeline run identifier.
     * @param options - The options parameters.
     */
    cancelPipelineRun(runId: string, options?: PipelineRunCancelPipelineRunOptionalParams): Promise<void>;
}
//# sourceMappingURL=pipelineRunOperations.d.ts.map