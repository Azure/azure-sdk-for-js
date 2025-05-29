import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkSecurityPerimeterConfigurations } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkSecurityPerimeterConfiguration, NetworkSecurityPerimeterConfigurationsListOptionalParams, NetworkSecurityPerimeterConfigurationsGetOptionalParams, NetworkSecurityPerimeterConfigurationsGetResponse, NetworkSecurityPerimeterConfigurationsReconcileOptionalParams, NetworkSecurityPerimeterConfigurationsReconcileResponse } from "../models/index.js";
/** Class containing NetworkSecurityPerimeterConfigurations operations. */
export declare class NetworkSecurityPerimeterConfigurationsImpl implements NetworkSecurityPerimeterConfigurations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkSecurityPerimeterConfigurations class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets a list of NSP configurations for an account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: NetworkSecurityPerimeterConfigurationsListOptionalParams): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of NSP configurations for an account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified NSP configurations for an account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nspConfigurationName The name of the NSP Configuration.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, nspConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsGetOptionalParams): Promise<NetworkSecurityPerimeterConfigurationsGetResponse>;
    /**
     * Reconcile the NSP configuration for an account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nspConfigurationName The name of the NSP Configuration.
     * @param options The options parameters.
     */
    beginReconcile(resourceGroupName: string, accountName: string, nspConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams): Promise<SimplePollerLike<OperationState<NetworkSecurityPerimeterConfigurationsReconcileResponse>, NetworkSecurityPerimeterConfigurationsReconcileResponse>>;
    /**
     * Reconcile the NSP configuration for an account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nspConfigurationName The name of the NSP Configuration.
     * @param options The options parameters.
     */
    beginReconcileAndWait(resourceGroupName: string, accountName: string, nspConfigurationName: string, options?: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams): Promise<NetworkSecurityPerimeterConfigurationsReconcileResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkSecurityPerimeterConfigurations.d.ts.map