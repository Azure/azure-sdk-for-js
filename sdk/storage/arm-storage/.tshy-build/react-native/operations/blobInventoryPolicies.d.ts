import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { BlobInventoryPolicies } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { BlobInventoryPolicy, BlobInventoryPoliciesListOptionalParams, BlobInventoryPolicyName, BlobInventoryPoliciesGetOptionalParams, BlobInventoryPoliciesGetResponse, BlobInventoryPoliciesCreateOrUpdateOptionalParams, BlobInventoryPoliciesCreateOrUpdateResponse, BlobInventoryPoliciesDeleteOptionalParams } from "../models/index.js";
/** Class containing BlobInventoryPolicies operations. */
export declare class BlobInventoryPoliciesImpl implements BlobInventoryPolicies {
    private readonly client;
    /**
     * Initialize a new instance of the class BlobInventoryPolicies class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets the blob inventory policy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: BlobInventoryPoliciesListOptionalParams): PagedAsyncIterableIterator<BlobInventoryPolicy>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the blob inventory policy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param blobInventoryPolicyName The name of the storage account blob inventory policy. It should
     *                                always be 'default'
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, blobInventoryPolicyName: BlobInventoryPolicyName, options?: BlobInventoryPoliciesGetOptionalParams): Promise<BlobInventoryPoliciesGetResponse>;
    /**
     * Sets the blob inventory policy to the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param blobInventoryPolicyName The name of the storage account blob inventory policy. It should
     *                                always be 'default'
     * @param properties The blob inventory policy set to a storage account.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, blobInventoryPolicyName: BlobInventoryPolicyName, properties: BlobInventoryPolicy, options?: BlobInventoryPoliciesCreateOrUpdateOptionalParams): Promise<BlobInventoryPoliciesCreateOrUpdateResponse>;
    /**
     * Deletes the blob inventory policy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param blobInventoryPolicyName The name of the storage account blob inventory policy. It should
     *                                always be 'default'
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, accountName: string, blobInventoryPolicyName: BlobInventoryPolicyName, options?: BlobInventoryPoliciesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the blob inventory policy associated with the specified storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
}
//# sourceMappingURL=blobInventoryPolicies.d.ts.map