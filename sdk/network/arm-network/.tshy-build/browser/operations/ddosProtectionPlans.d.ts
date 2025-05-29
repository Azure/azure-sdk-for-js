import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DdosProtectionPlans } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { DdosProtectionPlan, DdosProtectionPlansListOptionalParams, DdosProtectionPlansListByResourceGroupOptionalParams, DdosProtectionPlansDeleteOptionalParams, DdosProtectionPlansGetOptionalParams, DdosProtectionPlansGetResponse, DdosProtectionPlansCreateOrUpdateOptionalParams, DdosProtectionPlansCreateOrUpdateResponse, TagsObject, DdosProtectionPlansUpdateTagsOptionalParams, DdosProtectionPlansUpdateTagsResponse } from "../models/index.js";
/** Class containing DdosProtectionPlans operations. */
export declare class DdosProtectionPlansImpl implements DdosProtectionPlans {
    private readonly client;
    /**
     * Initialize a new instance of the class DdosProtectionPlans class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all DDoS protection plans in a subscription.
     * @param options The options parameters.
     */
    list(options?: DdosProtectionPlansListOptionalParams): PagedAsyncIterableIterator<DdosProtectionPlan>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the DDoS protection plans in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: DdosProtectionPlansListByResourceGroupOptionalParams): PagedAsyncIterableIterator<DdosProtectionPlan>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Deletes the specified DDoS protection plan.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, ddosProtectionPlanName: string, options?: DdosProtectionPlansDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified DDoS protection plan.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, ddosProtectionPlanName: string, options?: DdosProtectionPlansDeleteOptionalParams): Promise<void>;
    /**
     * Gets information about the specified DDoS protection plan.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, ddosProtectionPlanName: string, options?: DdosProtectionPlansGetOptionalParams): Promise<DdosProtectionPlansGetResponse>;
    /**
     * Creates or updates a DDoS protection plan.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param parameters Parameters supplied to the create or update operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, ddosProtectionPlanName: string, parameters: DdosProtectionPlan, options?: DdosProtectionPlansCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<DdosProtectionPlansCreateOrUpdateResponse>, DdosProtectionPlansCreateOrUpdateResponse>>;
    /**
     * Creates or updates a DDoS protection plan.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param parameters Parameters supplied to the create or update operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, ddosProtectionPlanName: string, parameters: DdosProtectionPlan, options?: DdosProtectionPlansCreateOrUpdateOptionalParams): Promise<DdosProtectionPlansCreateOrUpdateResponse>;
    /**
     * Update a DDoS protection plan tags.
     * @param resourceGroupName The name of the resource group.
     * @param ddosProtectionPlanName The name of the DDoS protection plan.
     * @param parameters Parameters supplied to the update DDoS protection plan resource tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, ddosProtectionPlanName: string, parameters: TagsObject, options?: DdosProtectionPlansUpdateTagsOptionalParams): Promise<DdosProtectionPlansUpdateTagsResponse>;
    /**
     * Gets all DDoS protection plans in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all the DDoS protection plans in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=ddosProtectionPlans.d.ts.map