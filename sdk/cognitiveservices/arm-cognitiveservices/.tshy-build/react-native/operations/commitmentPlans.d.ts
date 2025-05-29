import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CommitmentPlans } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { CommitmentPlan, CommitmentPlansListOptionalParams, CommitmentPlansListPlansByResourceGroupOptionalParams, CommitmentPlansListPlansBySubscriptionOptionalParams, CommitmentPlanAccountAssociation, CommitmentPlansListAssociationsOptionalParams, CommitmentPlansGetOptionalParams, CommitmentPlansGetResponse, CommitmentPlansCreateOrUpdateOptionalParams, CommitmentPlansCreateOrUpdateResponse, CommitmentPlansDeleteOptionalParams, CommitmentPlansCreateOrUpdatePlanOptionalParams, CommitmentPlansCreateOrUpdatePlanResponse, PatchResourceTagsAndSku, CommitmentPlansUpdatePlanOptionalParams, CommitmentPlansUpdatePlanResponse, CommitmentPlansDeletePlanOptionalParams, CommitmentPlansGetPlanOptionalParams, CommitmentPlansGetPlanResponse, CommitmentPlansGetAssociationOptionalParams, CommitmentPlansGetAssociationResponse, CommitmentPlansCreateOrUpdateAssociationOptionalParams, CommitmentPlansCreateOrUpdateAssociationResponse, CommitmentPlansDeleteAssociationOptionalParams } from "../models/index.js";
/** Class containing CommitmentPlans operations. */
export declare class CommitmentPlansImpl implements CommitmentPlans {
    private readonly client;
    /**
     * Initialize a new instance of the class CommitmentPlans class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the commitmentPlans associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: CommitmentPlansListOptionalParams): PagedAsyncIterableIterator<CommitmentPlan>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Returns all the resources of a particular type belonging to a resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listPlansByResourceGroup(resourceGroupName: string, options?: CommitmentPlansListPlansByResourceGroupOptionalParams): PagedAsyncIterableIterator<CommitmentPlan>;
    private listPlansByResourceGroupPagingPage;
    private listPlansByResourceGroupPagingAll;
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    listPlansBySubscription(options?: CommitmentPlansListPlansBySubscriptionOptionalParams): PagedAsyncIterableIterator<CommitmentPlan>;
    private listPlansBySubscriptionPagingPage;
    private listPlansBySubscriptionPagingAll;
    /**
     * Gets the associations of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    listAssociations(resourceGroupName: string, commitmentPlanName: string, options?: CommitmentPlansListAssociationsOptionalParams): PagedAsyncIterableIterator<CommitmentPlanAccountAssociation>;
    private listAssociationsPagingPage;
    private listAssociationsPagingAll;
    /**
     * Gets the commitmentPlans associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified commitmentPlans associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, commitmentPlanName: string, options?: CommitmentPlansGetOptionalParams): Promise<CommitmentPlansGetResponse>;
    /**
     * Update the state of specified commitmentPlans associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlan The commitmentPlan properties.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, commitmentPlanName: string, commitmentPlan: CommitmentPlan, options?: CommitmentPlansCreateOrUpdateOptionalParams): Promise<CommitmentPlansCreateOrUpdateResponse>;
    /**
     * Deletes the specified commitmentPlan associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, commitmentPlanName: string, options?: CommitmentPlansDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified commitmentPlan associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, commitmentPlanName: string, options?: CommitmentPlansDeleteOptionalParams): Promise<void>;
    /**
     * Create Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlan The parameters to provide for the created commitment plan.
     * @param options The options parameters.
     */
    beginCreateOrUpdatePlan(resourceGroupName: string, commitmentPlanName: string, commitmentPlan: CommitmentPlan, options?: CommitmentPlansCreateOrUpdatePlanOptionalParams): Promise<SimplePollerLike<OperationState<CommitmentPlansCreateOrUpdatePlanResponse>, CommitmentPlansCreateOrUpdatePlanResponse>>;
    /**
     * Create Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlan The parameters to provide for the created commitment plan.
     * @param options The options parameters.
     */
    beginCreateOrUpdatePlanAndWait(resourceGroupName: string, commitmentPlanName: string, commitmentPlan: CommitmentPlan, options?: CommitmentPlansCreateOrUpdatePlanOptionalParams): Promise<CommitmentPlansCreateOrUpdatePlanResponse>;
    /**
     * Create Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlan The parameters to provide for the created commitment plan.
     * @param options The options parameters.
     */
    beginUpdatePlan(resourceGroupName: string, commitmentPlanName: string, commitmentPlan: PatchResourceTagsAndSku, options?: CommitmentPlansUpdatePlanOptionalParams): Promise<SimplePollerLike<OperationState<CommitmentPlansUpdatePlanResponse>, CommitmentPlansUpdatePlanResponse>>;
    /**
     * Create Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlan The parameters to provide for the created commitment plan.
     * @param options The options parameters.
     */
    beginUpdatePlanAndWait(resourceGroupName: string, commitmentPlanName: string, commitmentPlan: PatchResourceTagsAndSku, options?: CommitmentPlansUpdatePlanOptionalParams): Promise<CommitmentPlansUpdatePlanResponse>;
    /**
     * Deletes a Cognitive Services commitment plan from the resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    beginDeletePlan(resourceGroupName: string, commitmentPlanName: string, options?: CommitmentPlansDeletePlanOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a Cognitive Services commitment plan from the resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    beginDeletePlanAndWait(resourceGroupName: string, commitmentPlanName: string, options?: CommitmentPlansDeletePlanOptionalParams): Promise<void>;
    /**
     * Returns a Cognitive Services commitment plan specified by the parameters.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    getPlan(resourceGroupName: string, commitmentPlanName: string, options?: CommitmentPlansGetPlanOptionalParams): Promise<CommitmentPlansGetPlanResponse>;
    /**
     * Returns all the resources of a particular type belonging to a resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listPlansByResourceGroup;
    /**
     * Returns all the resources of a particular type belonging to a subscription.
     * @param options The options parameters.
     */
    private _listPlansBySubscription;
    /**
     * Gets the associations of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param options The options parameters.
     */
    private _listAssociations;
    /**
     * Gets the association of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlanAssociationName The name of the commitment plan association with the Cognitive
     *                                      Services Account
     * @param options The options parameters.
     */
    getAssociation(resourceGroupName: string, commitmentPlanName: string, commitmentPlanAssociationName: string, options?: CommitmentPlansGetAssociationOptionalParams): Promise<CommitmentPlansGetAssociationResponse>;
    /**
     * Create or update the association of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlanAssociationName The name of the commitment plan association with the Cognitive
     *                                      Services Account
     * @param association The commitmentPlan properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAssociation(resourceGroupName: string, commitmentPlanName: string, commitmentPlanAssociationName: string, association: CommitmentPlanAccountAssociation, options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams): Promise<SimplePollerLike<OperationState<CommitmentPlansCreateOrUpdateAssociationResponse>, CommitmentPlansCreateOrUpdateAssociationResponse>>;
    /**
     * Create or update the association of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlanAssociationName The name of the commitment plan association with the Cognitive
     *                                      Services Account
     * @param association The commitmentPlan properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAssociationAndWait(resourceGroupName: string, commitmentPlanName: string, commitmentPlanAssociationName: string, association: CommitmentPlanAccountAssociation, options?: CommitmentPlansCreateOrUpdateAssociationOptionalParams): Promise<CommitmentPlansCreateOrUpdateAssociationResponse>;
    /**
     * Deletes the association of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlanAssociationName The name of the commitment plan association with the Cognitive
     *                                      Services Account
     * @param options The options parameters.
     */
    beginDeleteAssociation(resourceGroupName: string, commitmentPlanName: string, commitmentPlanAssociationName: string, options?: CommitmentPlansDeleteAssociationOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the association of the Cognitive Services commitment plan.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param commitmentPlanAssociationName The name of the commitment plan association with the Cognitive
     *                                      Services Account
     * @param options The options parameters.
     */
    beginDeleteAssociationAndWait(resourceGroupName: string, commitmentPlanName: string, commitmentPlanAssociationName: string, options?: CommitmentPlansDeleteAssociationOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListPlansByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListPlansByResourceGroup
     *                 method.
     * @param options The options parameters.
     */
    private _listPlansByResourceGroupNext;
    /**
     * ListPlansBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListPlansBySubscription
     *                 method.
     * @param options The options parameters.
     */
    private _listPlansBySubscriptionNext;
    /**
     * ListAssociationsNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param commitmentPlanName The name of the commitmentPlan associated with the Cognitive Services
     *                           Account
     * @param nextLink The nextLink from the previous successful call to the ListAssociations method.
     * @param options The options parameters.
     */
    private _listAssociationsNext;
}
//# sourceMappingURL=commitmentPlans.d.ts.map