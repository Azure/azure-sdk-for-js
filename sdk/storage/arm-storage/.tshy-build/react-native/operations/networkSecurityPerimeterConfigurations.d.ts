import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkSecurityPerimeterConfigurations } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkSecurityPerimeterConfiguration, NetworkSecurityPerimeterConfigurationsListOptionalParams, NetworkSecurityPerimeterConfigurationsGetOptionalParams, NetworkSecurityPerimeterConfigurationsGetResponse, NetworkSecurityPerimeterConfigurationsReconcileOptionalParams, NetworkSecurityPerimeterConfigurationsReconcileResponse } from "../models/index.js";
/** Class containing NetworkSecurityPerimeterConfigurations operations. */
export declare class NetworkSecurityPerimeterConfigurationsImpl implements NetworkSecurityPerimeterConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkSecurityPerimeterConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets list of effective NetworkSecurityPerimeterConfiguration for storage account
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: NetworkSecurityPerimeterConfigurationsListOptionalParams): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets list of effective NetworkSecurityPerimeterConfiguration for storage account
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets effective NetworkSecurityPerimeterConfiguration for association
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param networkSecurityPerimeterConfigurationName The name for Network Security Perimeter
     *                                                  configuration
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, networkSecurityPerimeterConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams): Promise<NetworkSecurityPerimeterConfigurationsGetResponse>;
    /**
     * Refreshes any information about the association.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param networkSecurityPerimeterConfigurationName The name for Network Security Perimeter
     *                                                  configuration
     * @param options The options parameters.
     */
    beginReconcile(resourceGroupName: string, accountName: string, networkSecurityPerimeterConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams): Promise<SimplePollerLike<OperationState<NetworkSecurityPerimeterConfigurationsReconcileResponse>, NetworkSecurityPerimeterConfigurationsReconcileResponse>>;
    /**
     * Refreshes any information about the association.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param networkSecurityPerimeterConfigurationName The name for Network Security Perimeter
     *                                                  configuration
     * @param options The options parameters.
     */
    beginReconcileAndWait(resourceGroupName: string, accountName: string, networkSecurityPerimeterConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams): Promise<NetworkSecurityPerimeterConfigurationsReconcileResponse>;
}
//# sourceMappingURL=networkSecurityPerimeterConfigurations.d.ts.map