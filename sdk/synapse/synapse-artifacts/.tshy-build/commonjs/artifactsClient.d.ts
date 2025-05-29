import * as coreClient from "@azure/core-client";
import type * as coreAuth from "@azure/core-auth";
import type { LinkConnectionOperations, RunNotebook, KqlScripts, KqlScriptOperations, Metastore, SparkConfigurationOperations, BigDataPools, DataFlowOperations, DataFlowDebugSession, DatasetOperations, WorkspaceGitRepoManagement, IntegrationRuntimes, Library, LinkedServiceOperations, NotebookOperations, NotebookOperationResult, PipelineOperations, PipelineRunOperations, SparkJobDefinitionOperations, SqlPools, SqlScriptOperations, TriggerOperations, TriggerRunOperations, WorkspaceOperations } from "./operationsInterfaces/index.js";
import type { ArtifactsClientOptionalParams } from "./models/index.js";
export declare class ArtifactsClient extends coreClient.ServiceClient {
    endpoint: string;
    /**
     * Initializes a new instance of the ArtifactsClient class.
     * @param credentials - Subscription credentials which uniquely identify client subscription.
     * @param endpoint - The workspace development endpoint, for example
     *                 `https://myworkspace.dev.azuresynapse.net`.
     * @param options - The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, endpoint: string, options?: ArtifactsClientOptionalParams);
    linkConnectionOperations: LinkConnectionOperations;
    runNotebook: RunNotebook;
    kqlScripts: KqlScripts;
    kqlScriptOperations: KqlScriptOperations;
    metastore: Metastore;
    sparkConfigurationOperations: SparkConfigurationOperations;
    bigDataPools: BigDataPools;
    dataFlowOperations: DataFlowOperations;
    dataFlowDebugSession: DataFlowDebugSession;
    datasetOperations: DatasetOperations;
    workspaceGitRepoManagement: WorkspaceGitRepoManagement;
    integrationRuntimes: IntegrationRuntimes;
    library: Library;
    linkedServiceOperations: LinkedServiceOperations;
    notebookOperations: NotebookOperations;
    notebookOperationResult: NotebookOperationResult;
    pipelineOperations: PipelineOperations;
    pipelineRunOperations: PipelineRunOperations;
    sparkJobDefinitionOperations: SparkJobDefinitionOperations;
    sqlPools: SqlPools;
    sqlScriptOperations: SqlScriptOperations;
    triggerOperations: TriggerOperations;
    triggerRunOperations: TriggerRunOperations;
    workspaceOperations: WorkspaceOperations;
}
//# sourceMappingURL=artifactsClient.d.ts.map