import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { SparkConfigurationOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { SparkConfigurationResource, SparkConfigurationGetSparkConfigurationsByWorkspaceOptionalParams, SparkConfigurationCreateOrUpdateSparkConfigurationOptionalParams, SparkConfigurationCreateOrUpdateSparkConfigurationResponse, SparkConfigurationGetSparkConfigurationOptionalParams, SparkConfigurationGetSparkConfigurationResponse, SparkConfigurationDeleteSparkConfigurationOptionalParams, ArtifactRenameRequest, SparkConfigurationRenameSparkConfigurationOptionalParams } from "../models/index.js";
/** Class containing SparkConfigurationOperations operations. */
export declare class SparkConfigurationOperationsImpl implements SparkConfigurationOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class SparkConfigurationOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists sparkconfigurations.
     * @param options - The options parameters.
     */
    listSparkConfigurationsByWorkspace(options?: SparkConfigurationGetSparkConfigurationsByWorkspaceOptionalParams): PagedAsyncIterableIterator<SparkConfigurationResource>;
    private getSparkConfigurationsByWorkspacePagingPage;
    private getSparkConfigurationsByWorkspacePagingAll;
    /**
     * Lists sparkconfigurations.
     * @param options - The options parameters.
     */
    private _getSparkConfigurationsByWorkspace;
    /**
     * Creates or updates a sparkconfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param sparkConfiguration - SparkConfiguration resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateSparkConfiguration(sparkConfigurationName: string, sparkConfiguration: SparkConfigurationResource, options?: SparkConfigurationCreateOrUpdateSparkConfigurationOptionalParams): Promise<SimplePollerLike<OperationState<SparkConfigurationCreateOrUpdateSparkConfigurationResponse>, SparkConfigurationCreateOrUpdateSparkConfigurationResponse>>;
    /**
     * Creates or updates a sparkconfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param sparkConfiguration - SparkConfiguration resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateSparkConfigurationAndWait(sparkConfigurationName: string, sparkConfiguration: SparkConfigurationResource, options?: SparkConfigurationCreateOrUpdateSparkConfigurationOptionalParams): Promise<SparkConfigurationCreateOrUpdateSparkConfigurationResponse>;
    /**
     * Gets a sparkConfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param options - The options parameters.
     */
    getSparkConfiguration(sparkConfigurationName: string, options?: SparkConfigurationGetSparkConfigurationOptionalParams): Promise<SparkConfigurationGetSparkConfigurationResponse>;
    /**
     * Deletes a sparkConfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param options - The options parameters.
     */
    beginDeleteSparkConfiguration(sparkConfigurationName: string, options?: SparkConfigurationDeleteSparkConfigurationOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a sparkConfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param options - The options parameters.
     */
    beginDeleteSparkConfigurationAndWait(sparkConfigurationName: string, options?: SparkConfigurationDeleteSparkConfigurationOptionalParams): Promise<void>;
    /**
     * Renames a sparkConfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameSparkConfiguration(sparkConfigurationName: string, request: ArtifactRenameRequest, options?: SparkConfigurationRenameSparkConfigurationOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a sparkConfiguration.
     * @param sparkConfigurationName - The spark Configuration name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameSparkConfigurationAndWait(sparkConfigurationName: string, request: ArtifactRenameRequest, options?: SparkConfigurationRenameSparkConfigurationOptionalParams): Promise<void>;
    /**
     * GetSparkConfigurationsByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the
     *                 GetSparkConfigurationsByWorkspace method.
     * @param options - The options parameters.
     */
    private _getSparkConfigurationsByWorkspaceNext;
}
//# sourceMappingURL=sparkConfigurationOperations.d.ts.map