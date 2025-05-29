import { ManagementPolicies } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { ManagementPolicyName, ManagementPoliciesGetOptionalParams, ManagementPoliciesGetResponse, ManagementPolicy, ManagementPoliciesCreateOrUpdateOptionalParams, ManagementPoliciesCreateOrUpdateResponse, ManagementPoliciesDeleteOptionalParams } from "../models/index.js";
/** Class containing ManagementPolicies operations. */
export declare class ManagementPoliciesImpl implements ManagementPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class ManagementPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets the managementpolicy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param managementPolicyName The name of the Storage Account Management Policy. It should always be
     *                             'default'
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, managementPolicyName: ManagementPolicyName, options?: ManagementPoliciesGetOptionalParams): Promise<ManagementPoliciesGetResponse>;
    /**
     * Sets the managementpolicy to the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param managementPolicyName The name of the Storage Account Management Policy. It should always be
     *                             'default'
     * @param properties The ManagementPolicy set to a storage account.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, managementPolicyName: ManagementPolicyName, properties: ManagementPolicy, options?: ManagementPoliciesCreateOrUpdateOptionalParams): Promise<ManagementPoliciesCreateOrUpdateResponse>;
    /**
     * Deletes the managementpolicy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param managementPolicyName The name of the Storage Account Management Policy. It should always be
     *                             'default'
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, accountName: string, managementPolicyName: ManagementPolicyName, options?: ManagementPoliciesDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=managementPolicies.d.ts.map