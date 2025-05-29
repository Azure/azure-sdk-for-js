import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { BlobServices } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { BlobServiceProperties, BlobServicesListOptionalParams, BlobServicesSetServicePropertiesOptionalParams, BlobServicesSetServicePropertiesResponse, BlobServicesGetServicePropertiesOptionalParams, BlobServicesGetServicePropertiesResponse } from "../models/index.js";
/** Class containing BlobServices operations. */
export declare class BlobServicesImpl implements BlobServices {
    private readonly client;
    /**
     * Initialize a new instance of the class BlobServices class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * List blob services of storage account. It returns a collection of one object named default.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: BlobServicesListOptionalParams): PagedAsyncIterableIterator<BlobServiceProperties>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List blob services of storage account. It returns a collection of one object named default.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Sets the properties of a storage account’s Blob service, including properties for Storage Analytics
     * and CORS (Cross-Origin Resource Sharing) rules.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param parameters The properties of a storage account’s Blob service, including properties for
     *                   Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @param options The options parameters.
     */
    setServiceProperties(resourceGroupName: string, accountName: string, parameters: BlobServiceProperties, options?: BlobServicesSetServicePropertiesOptionalParams): Promise<BlobServicesSetServicePropertiesResponse>;
    /**
     * Gets the properties of a storage account’s Blob service, including properties for Storage Analytics
     * and CORS (Cross-Origin Resource Sharing) rules.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    getServiceProperties(resourceGroupName: string, accountName: string, options?: BlobServicesGetServicePropertiesOptionalParams): Promise<BlobServicesGetServicePropertiesResponse>;
}
//# sourceMappingURL=blobServices.d.ts.map