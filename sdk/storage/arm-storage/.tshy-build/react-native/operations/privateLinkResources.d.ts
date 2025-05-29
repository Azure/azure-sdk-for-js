import { PrivateLinkResources } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { PrivateLinkResourcesListByStorageAccountOptionalParams, PrivateLinkResourcesListByStorageAccountResponse } from "../models/index.js";
/** Class containing PrivateLinkResources operations. */
export declare class PrivateLinkResourcesImpl implements PrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets the private link resources that need to be created for a storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    listByStorageAccount(resourceGroupName: string, accountName: string, options?: PrivateLinkResourcesListByStorageAccountOptionalParams): Promise<PrivateLinkResourcesListByStorageAccountResponse>;
}
//# sourceMappingURL=privateLinkResources.d.ts.map