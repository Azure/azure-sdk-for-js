import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { DatasetOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { DatasetResource, DatasetGetDatasetsByWorkspaceOptionalParams, DatasetCreateOrUpdateDatasetOptionalParams, DatasetCreateOrUpdateDatasetResponse, DatasetGetDatasetOptionalParams, DatasetGetDatasetResponse, DatasetDeleteDatasetOptionalParams, ArtifactRenameRequest, DatasetRenameDatasetOptionalParams } from "../models/index.js";
/** Class containing DatasetOperations operations. */
export declare class DatasetOperationsImpl implements DatasetOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class DatasetOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists datasets.
     * @param options - The options parameters.
     */
    listDatasetsByWorkspace(options?: DatasetGetDatasetsByWorkspaceOptionalParams): PagedAsyncIterableIterator<DatasetResource>;
    private getDatasetsByWorkspacePagingPage;
    private getDatasetsByWorkspacePagingAll;
    /**
     * Lists datasets.
     * @param options - The options parameters.
     */
    private _getDatasetsByWorkspace;
    /**
     * Creates or updates a dataset.
     * @param datasetName - The dataset name.
     * @param dataset - Dataset resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateDataset(datasetName: string, dataset: DatasetResource, options?: DatasetCreateOrUpdateDatasetOptionalParams): Promise<SimplePollerLike<OperationState<DatasetCreateOrUpdateDatasetResponse>, DatasetCreateOrUpdateDatasetResponse>>;
    /**
     * Creates or updates a dataset.
     * @param datasetName - The dataset name.
     * @param dataset - Dataset resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateDatasetAndWait(datasetName: string, dataset: DatasetResource, options?: DatasetCreateOrUpdateDatasetOptionalParams): Promise<DatasetCreateOrUpdateDatasetResponse>;
    /**
     * Gets a dataset.
     * @param datasetName - The dataset name.
     * @param options - The options parameters.
     */
    getDataset(datasetName: string, options?: DatasetGetDatasetOptionalParams): Promise<DatasetGetDatasetResponse>;
    /**
     * Deletes a dataset.
     * @param datasetName - The dataset name.
     * @param options - The options parameters.
     */
    beginDeleteDataset(datasetName: string, options?: DatasetDeleteDatasetOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a dataset.
     * @param datasetName - The dataset name.
     * @param options - The options parameters.
     */
    beginDeleteDatasetAndWait(datasetName: string, options?: DatasetDeleteDatasetOptionalParams): Promise<void>;
    /**
     * Renames a dataset.
     * @param datasetName - The dataset name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameDataset(datasetName: string, request: ArtifactRenameRequest, options?: DatasetRenameDatasetOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a dataset.
     * @param datasetName - The dataset name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameDatasetAndWait(datasetName: string, request: ArtifactRenameRequest, options?: DatasetRenameDatasetOptionalParams): Promise<void>;
    /**
     * GetDatasetsByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetDatasetsByWorkspace method.
     * @param options - The options parameters.
     */
    private _getDatasetsByWorkspaceNext;
}
//# sourceMappingURL=datasetOperations.d.ts.map