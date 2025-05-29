import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SAPVirtualInstances } from "../operationsInterfaces/index.js";
import { WorkloadsClient } from "../workloadsClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SAPVirtualInstance, SAPVirtualInstancesListByResourceGroupOptionalParams, SAPVirtualInstancesListBySubscriptionOptionalParams, SAPVirtualInstancesCreateOptionalParams, SAPVirtualInstancesCreateResponse, SAPVirtualInstancesGetOptionalParams, SAPVirtualInstancesGetResponse, SAPVirtualInstancesUpdateOptionalParams, SAPVirtualInstancesUpdateResponse, SAPVirtualInstancesDeleteOptionalParams, SAPVirtualInstancesDeleteResponse, SAPVirtualInstancesStartOptionalParams, SAPVirtualInstancesStartResponse, SAPVirtualInstancesStopOptionalParams, SAPVirtualInstancesStopResponse } from "../models/index.js";
/** Class containing SAPVirtualInstances operations. */
export declare class SAPVirtualInstancesImpl implements SAPVirtualInstances {
    private readonly client;
    /**
     * Initialize a new instance of the class SAPVirtualInstances class.
     * @param client Reference to the service client
     */
    constructor(client: WorkloadsClient);
    /**
     * Gets all Virtual Instances for SAP solutions resources in a Resource Group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: SAPVirtualInstancesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<SAPVirtualInstance>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all Virtual Instances for SAP solutions resources in a Subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: SAPVirtualInstancesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<SAPVirtualInstance>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Creates a Virtual Instance for SAP solutions (VIS) resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginCreate(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesCreateOptionalParams): Promise<SimplePollerLike<OperationState<SAPVirtualInstancesCreateResponse>, SAPVirtualInstancesCreateResponse>>;
    /**
     * Creates a Virtual Instance for SAP solutions (VIS) resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginCreateAndWait(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesCreateOptionalParams): Promise<SAPVirtualInstancesCreateResponse>;
    /**
     * Gets a Virtual Instance for SAP solutions resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    get(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesGetOptionalParams): Promise<SAPVirtualInstancesGetResponse>;
    /**
     * Updates a Virtual Instance for SAP solutions resource
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    update(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesUpdateOptionalParams): Promise<SAPVirtualInstancesUpdateResponse>;
    /**
     * Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the
     * associated Central Services Instance, Application Server Instances and Database Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<SAPVirtualInstancesDeleteResponse>, SAPVirtualInstancesDeleteResponse>>;
    /**
     * Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the
     * associated Central Services Instance, Application Server Instances and Database Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesDeleteOptionalParams): Promise<SAPVirtualInstancesDeleteResponse>;
    /**
     * Gets all Virtual Instances for SAP solutions resources in a Resource Group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets all Virtual Instances for SAP solutions resources in a Subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Starts the SAP application, that is the Central Services instance and Application server instances.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginStart(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStartOptionalParams): Promise<SimplePollerLike<OperationState<SAPVirtualInstancesStartResponse>, SAPVirtualInstancesStartResponse>>;
    /**
     * Starts the SAP application, that is the Central Services instance and Application server instances.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginStartAndWait(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStartOptionalParams): Promise<SAPVirtualInstancesStartResponse>;
    /**
     * Stops the SAP Application, that is the Application server instances and Central Services instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginStop(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): Promise<SimplePollerLike<OperationState<SAPVirtualInstancesStopResponse>, SAPVirtualInstancesStopResponse>>;
    /**
     * Stops the SAP Application, that is the Application server instances and Central Services instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    beginStopAndWait(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): Promise<SAPVirtualInstancesStopResponse>;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
}
//# sourceMappingURL=sAPVirtualInstances.d.ts.map