import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RaiPolicy, RaiPoliciesListOptionalParams, RaiPoliciesGetOptionalParams, RaiPoliciesGetResponse, RaiPoliciesCreateOrUpdateOptionalParams, RaiPoliciesCreateOrUpdateResponse, RaiPoliciesDeleteOptionalParams, RaiPoliciesDeleteResponse } from "../models/index.js";
/** Interface representing a RaiPolicies. */
export interface RaiPolicies {
    /**
     * Gets the content filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: RaiPoliciesListOptionalParams): PagedAsyncIterableIterator<RaiPolicy>;
    /**
     * Gets the specified Content Filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, raiPolicyName: string, options?: RaiPoliciesGetOptionalParams): Promise<RaiPoliciesGetResponse>;
    /**
     * Update the state of specified Content Filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
     * @param raiPolicy Properties describing the Content Filters.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, raiPolicyName: string, raiPolicy: RaiPolicy, options?: RaiPoliciesCreateOrUpdateOptionalParams): Promise<RaiPoliciesCreateOrUpdateResponse>;
    /**
     * Deletes the specified Content Filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, raiPolicyName: string, options?: RaiPoliciesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<RaiPoliciesDeleteResponse>, RaiPoliciesDeleteResponse>>;
    /**
     * Deletes the specified Content Filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, raiPolicyName: string, options?: RaiPoliciesDeleteOptionalParams): Promise<RaiPoliciesDeleteResponse>;
}
//# sourceMappingURL=raiPolicies.d.ts.map