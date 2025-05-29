import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Deployments } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Deployment, DeploymentsListOptionalParams, SkuResource, DeploymentsListSkusOptionalParams, DeploymentsGetOptionalParams, DeploymentsGetResponse, DeploymentsCreateOrUpdateOptionalParams, DeploymentsCreateOrUpdateResponse, PatchResourceTagsAndSku, DeploymentsUpdateOptionalParams, DeploymentsUpdateResponse, DeploymentsDeleteOptionalParams } from "../models/index.js";
/** Class containing Deployments operations. */
export declare class DeploymentsImpl implements Deployments {
    private readonly client;
    /**
     * Initialize a new instance of the class Deployments class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: DeploymentsListOptionalParams): PagedAsyncIterableIterator<Deployment>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists the specified deployments skus associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    listSkus(resourceGroupName: string, accountName: string, deploymentName: string, options?: DeploymentsListSkusOptionalParams): PagedAsyncIterableIterator<SkuResource>;
    private listSkusPagingPage;
    private listSkusPagingAll;
    /**
     * Gets the deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, deploymentName: string, options?: DeploymentsGetOptionalParams): Promise<DeploymentsGetResponse>;
    /**
     * Update the state of specified deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param deployment The deployment properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, accountName: string, deploymentName: string, deployment: Deployment, options?: DeploymentsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<DeploymentsCreateOrUpdateResponse>, DeploymentsCreateOrUpdateResponse>>;
    /**
     * Update the state of specified deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param deployment The deployment properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, accountName: string, deploymentName: string, deployment: Deployment, options?: DeploymentsCreateOrUpdateOptionalParams): Promise<DeploymentsCreateOrUpdateResponse>;
    /**
     * Update specified deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param deployment The deployment properties.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, accountName: string, deploymentName: string, deployment: PatchResourceTagsAndSku, options?: DeploymentsUpdateOptionalParams): Promise<SimplePollerLike<OperationState<DeploymentsUpdateResponse>, DeploymentsUpdateResponse>>;
    /**
     * Update specified deployments associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param deployment The deployment properties.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, accountName: string, deploymentName: string, deployment: PatchResourceTagsAndSku, options?: DeploymentsUpdateOptionalParams): Promise<DeploymentsUpdateResponse>;
    /**
     * Deletes the specified deployment associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, deploymentName: string, options?: DeploymentsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified deployment associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, deploymentName: string, options?: DeploymentsDeleteOptionalParams): Promise<void>;
    /**
     * Lists the specified deployments skus associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    private _listSkus;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListSkusNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param deploymentName The name of the deployment associated with the Cognitive Services Account
     * @param nextLink The nextLink from the previous successful call to the ListSkus method.
     * @param options The options parameters.
     */
    private _listSkusNext;
}
//# sourceMappingURL=deployments.d.ts.map