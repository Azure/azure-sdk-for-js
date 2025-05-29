import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { PipelineOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { PipelineResource, PipelineGetPipelinesByWorkspaceOptionalParams, PipelineCreateOrUpdatePipelineOptionalParams, PipelineCreateOrUpdatePipelineResponse, PipelineGetPipelineOptionalParams, PipelineGetPipelineResponse, PipelineDeletePipelineOptionalParams, ArtifactRenameRequest, PipelineRenamePipelineOptionalParams, PipelineCreatePipelineRunOptionalParams, PipelineCreatePipelineRunResponse } from "../models/index.js";
/** Class containing PipelineOperations operations. */
export declare class PipelineOperationsImpl implements PipelineOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class PipelineOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists pipelines.
     * @param options - The options parameters.
     */
    listPipelinesByWorkspace(options?: PipelineGetPipelinesByWorkspaceOptionalParams): PagedAsyncIterableIterator<PipelineResource>;
    private getPipelinesByWorkspacePagingPage;
    private getPipelinesByWorkspacePagingAll;
    /**
     * Lists pipelines.
     * @param options - The options parameters.
     */
    private _getPipelinesByWorkspace;
    /**
     * Creates or updates a pipeline.
     * @param pipelineName - The pipeline name.
     * @param pipeline - Pipeline resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdatePipeline(pipelineName: string, pipeline: PipelineResource, options?: PipelineCreateOrUpdatePipelineOptionalParams): Promise<SimplePollerLike<OperationState<PipelineCreateOrUpdatePipelineResponse>, PipelineCreateOrUpdatePipelineResponse>>;
    /**
     * Creates or updates a pipeline.
     * @param pipelineName - The pipeline name.
     * @param pipeline - Pipeline resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdatePipelineAndWait(pipelineName: string, pipeline: PipelineResource, options?: PipelineCreateOrUpdatePipelineOptionalParams): Promise<PipelineCreateOrUpdatePipelineResponse>;
    /**
     * Gets a pipeline.
     * @param pipelineName - The pipeline name.
     * @param options - The options parameters.
     */
    getPipeline(pipelineName: string, options?: PipelineGetPipelineOptionalParams): Promise<PipelineGetPipelineResponse>;
    /**
     * Deletes a pipeline.
     * @param pipelineName - The pipeline name.
     * @param options - The options parameters.
     */
    beginDeletePipeline(pipelineName: string, options?: PipelineDeletePipelineOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a pipeline.
     * @param pipelineName - The pipeline name.
     * @param options - The options parameters.
     */
    beginDeletePipelineAndWait(pipelineName: string, options?: PipelineDeletePipelineOptionalParams): Promise<void>;
    /**
     * Renames a pipeline.
     * @param pipelineName - The pipeline name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenamePipeline(pipelineName: string, request: ArtifactRenameRequest, options?: PipelineRenamePipelineOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a pipeline.
     * @param pipelineName - The pipeline name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenamePipelineAndWait(pipelineName: string, request: ArtifactRenameRequest, options?: PipelineRenamePipelineOptionalParams): Promise<void>;
    /**
     * Creates a run of a pipeline.
     * @param pipelineName - The pipeline name.
     * @param options - The options parameters.
     */
    createPipelineRun(pipelineName: string, options?: PipelineCreatePipelineRunOptionalParams): Promise<PipelineCreatePipelineRunResponse>;
    /**
     * GetPipelinesByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetPipelinesByWorkspace
     *                 method.
     * @param options - The options parameters.
     */
    private _getPipelinesByWorkspaceNext;
}
//# sourceMappingURL=pipelineOperations.d.ts.map