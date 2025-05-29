import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ProviderInstances } from "../operationsInterfaces/index.js";
import { WorkloadsClient } from "../workloadsClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ProviderInstance, ProviderInstancesListOptionalParams, ProviderInstancesGetOptionalParams, ProviderInstancesGetResponse, ProviderInstancesCreateOptionalParams, ProviderInstancesCreateResponse, ProviderInstancesDeleteOptionalParams, ProviderInstancesDeleteResponse } from "../models/index.js";
/** Class containing ProviderInstances operations. */
export declare class ProviderInstancesImpl implements ProviderInstances {
    private readonly client;
    /**
     * Initialize a new instance of the class ProviderInstances class.
     * @param client Reference to the service client
     */
    constructor(client: WorkloadsClient);
    /**
     * Gets a list of provider instances in the specified SAP monitor. The operations returns various
     * properties of each provider instances.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, monitorName: string, options?: ProviderInstancesListOptionalParams): PagedAsyncIterableIterator<ProviderInstance>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of provider instances in the specified SAP monitor. The operations returns various
     * properties of each provider instances.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets properties of a provider instance for the specified subscription, resource group, SAP monitor
     * name, and resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param providerInstanceName Name of the provider instance.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, monitorName: string, providerInstanceName: string, options?: ProviderInstancesGetOptionalParams): Promise<ProviderInstancesGetResponse>;
    /**
     * Creates a provider instance for the specified subscription, resource group, SAP monitor name, and
     * resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param providerInstanceName Name of the provider instance.
     * @param providerInstanceParameter Request body representing a provider instance
     * @param options The options parameters.
     */
    beginCreate(resourceGroupName: string, monitorName: string, providerInstanceName: string, providerInstanceParameter: ProviderInstance, options?: ProviderInstancesCreateOptionalParams): Promise<SimplePollerLike<OperationState<ProviderInstancesCreateResponse>, ProviderInstancesCreateResponse>>;
    /**
     * Creates a provider instance for the specified subscription, resource group, SAP monitor name, and
     * resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param providerInstanceName Name of the provider instance.
     * @param providerInstanceParameter Request body representing a provider instance
     * @param options The options parameters.
     */
    beginCreateAndWait(resourceGroupName: string, monitorName: string, providerInstanceName: string, providerInstanceParameter: ProviderInstance, options?: ProviderInstancesCreateOptionalParams): Promise<ProviderInstancesCreateResponse>;
    /**
     * Deletes a provider instance for the specified subscription, resource group, SAP monitor name, and
     * resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param providerInstanceName Name of the provider instance.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, monitorName: string, providerInstanceName: string, options?: ProviderInstancesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<ProviderInstancesDeleteResponse>, ProviderInstancesDeleteResponse>>;
    /**
     * Deletes a provider instance for the specified subscription, resource group, SAP monitor name, and
     * resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param providerInstanceName Name of the provider instance.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, monitorName: string, providerInstanceName: string, options?: ProviderInstancesDeleteOptionalParams): Promise<ProviderInstancesDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=providerInstances.d.ts.map