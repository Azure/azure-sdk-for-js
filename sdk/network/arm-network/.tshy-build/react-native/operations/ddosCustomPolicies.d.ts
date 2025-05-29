import { DdosCustomPolicies } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { DdosCustomPoliciesDeleteOptionalParams, DdosCustomPoliciesGetOptionalParams, DdosCustomPoliciesGetResponse, DdosCustomPolicy, DdosCustomPoliciesCreateOrUpdateOptionalParams, DdosCustomPoliciesCreateOrUpdateResponse, TagsObject, DdosCustomPoliciesUpdateTagsOptionalParams, DdosCustomPoliciesUpdateTagsResponse } from "../models/index.js";
/** Class containing DdosCustomPolicies operations. */
export declare class DdosCustomPoliciesImpl implements DdosCustomPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class DdosCustomPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Deletes the specified DDoS custom policy.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, ddosCustomPolicyName: string, options?: DdosCustomPoliciesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified DDoS custom policy.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, ddosCustomPolicyName: string, options?: DdosCustomPoliciesDeleteOptionalParams): Promise<void>;
    /**
     * Gets information about the specified DDoS custom policy.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, ddosCustomPolicyName: string, options?: DdosCustomPoliciesGetOptionalParams): Promise<DdosCustomPoliciesGetResponse>;
    /**
     * Creates or updates a DDoS custom policy.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param parameters Parameters supplied to the create or update operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, ddosCustomPolicyName: string, parameters: DdosCustomPolicy, options?: DdosCustomPoliciesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<DdosCustomPoliciesCreateOrUpdateResponse>, DdosCustomPoliciesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a DDoS custom policy.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param parameters Parameters supplied to the create or update operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, ddosCustomPolicyName: string, parameters: DdosCustomPolicy, options?: DdosCustomPoliciesCreateOrUpdateOptionalParams): Promise<DdosCustomPoliciesCreateOrUpdateResponse>;
    /**
     * Update a DDoS custom policy tags.
     * @param resourceGroupName The name of the resource group.
     * @param ddosCustomPolicyName The name of the DDoS custom policy.
     * @param parameters Parameters supplied to update DDoS custom policy resource tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, ddosCustomPolicyName: string, parameters: TagsObject, options?: DdosCustomPoliciesUpdateTagsOptionalParams): Promise<DdosCustomPoliciesUpdateTagsResponse>;
}
//# sourceMappingURL=ddosCustomPolicies.d.ts.map