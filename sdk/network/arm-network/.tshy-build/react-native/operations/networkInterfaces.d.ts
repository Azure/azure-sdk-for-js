import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkInterfaces } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkInterface, NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams, NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams, NetworkInterfacesListAllOptionalParams, NetworkInterfacesListOptionalParams, NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams, NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams, NetworkInterfaceIPConfiguration, NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams, NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams, NetworkInterfacesGetCloudServiceNetworkInterfaceResponse, NetworkInterfacesDeleteOptionalParams, NetworkInterfacesGetOptionalParams, NetworkInterfacesGetResponse, NetworkInterfacesCreateOrUpdateOptionalParams, NetworkInterfacesCreateOrUpdateResponse, TagsObject, NetworkInterfacesUpdateTagsOptionalParams, NetworkInterfacesUpdateTagsResponse, NetworkInterfacesGetEffectiveRouteTableOptionalParams, NetworkInterfacesGetEffectiveRouteTableResponse, NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams, NetworkInterfacesListEffectiveNetworkSecurityGroupsResponse, NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams, NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceResponse, NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams, NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationResponse } from "../models/index.js";
/** Class containing NetworkInterfaces operations. */
export declare class NetworkInterfacesImpl implements NetworkInterfaces {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkInterfaces class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets information about all network interfaces in a role instance in a cloud service.
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param roleInstanceName The name of role instance.
     * @param options The options parameters.
     */
    listCloudServiceRoleInstanceNetworkInterfaces(resourceGroupName: string, cloudServiceName: string, roleInstanceName: string, options?: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listCloudServiceRoleInstanceNetworkInterfacesPagingPage;
    private listCloudServiceRoleInstanceNetworkInterfacesPagingAll;
    /**
     * Gets all network interfaces in a cloud service.
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param options The options parameters.
     */
    listCloudServiceNetworkInterfaces(resourceGroupName: string, cloudServiceName: string, options?: NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listCloudServiceNetworkInterfacesPagingPage;
    private listCloudServiceNetworkInterfacesPagingAll;
    /**
     * Gets all network interfaces in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: NetworkInterfacesListAllOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all network interfaces in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: NetworkInterfacesListOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets information about all network interfaces in a virtual machine in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param options The options parameters.
     */
    listVirtualMachineScaleSetVMNetworkInterfaces(resourceGroupName: string, virtualMachineScaleSetName: string, virtualmachineIndex: string, options?: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listVirtualMachineScaleSetVMNetworkInterfacesPagingPage;
    private listVirtualMachineScaleSetVMNetworkInterfacesPagingAll;
    /**
     * Gets all network interfaces in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param options The options parameters.
     */
    listVirtualMachineScaleSetNetworkInterfaces(resourceGroupName: string, virtualMachineScaleSetName: string, options?: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams): PagedAsyncIterableIterator<NetworkInterface>;
    private listVirtualMachineScaleSetNetworkInterfacesPagingPage;
    private listVirtualMachineScaleSetNetworkInterfacesPagingAll;
    /**
     * Get the specified network interface ip configuration in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    listVirtualMachineScaleSetIpConfigurations(resourceGroupName: string, virtualMachineScaleSetName: string, virtualmachineIndex: string, networkInterfaceName: string, options?: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams): PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration>;
    private listVirtualMachineScaleSetIpConfigurationsPagingPage;
    private listVirtualMachineScaleSetIpConfigurationsPagingAll;
    /**
     * Gets information about all network interfaces in a role instance in a cloud service.
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param roleInstanceName The name of role instance.
     * @param options The options parameters.
     */
    private _listCloudServiceRoleInstanceNetworkInterfaces;
    /**
     * Gets all network interfaces in a cloud service.
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param options The options parameters.
     */
    private _listCloudServiceNetworkInterfaces;
    /**
     * Get the specified network interface in a cloud service.
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param roleInstanceName The name of role instance.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    getCloudServiceNetworkInterface(resourceGroupName: string, cloudServiceName: string, roleInstanceName: string, networkInterfaceName: string, options?: NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams): Promise<NetworkInterfacesGetCloudServiceNetworkInterfaceResponse>;
    /**
     * Deletes the specified network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesDeleteOptionalParams): Promise<void>;
    /**
     * Gets information about the specified network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesGetOptionalParams): Promise<NetworkInterfacesGetResponse>;
    /**
     * Creates or updates a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param parameters Parameters supplied to the create or update network interface operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkInterfaceName: string, parameters: NetworkInterface, options?: NetworkInterfacesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NetworkInterfacesCreateOrUpdateResponse>, NetworkInterfacesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param parameters Parameters supplied to the create or update network interface operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkInterfaceName: string, parameters: NetworkInterface, options?: NetworkInterfacesCreateOrUpdateOptionalParams): Promise<NetworkInterfacesCreateOrUpdateResponse>;
    /**
     * Updates a network interface tags.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param parameters Parameters supplied to update network interface tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, networkInterfaceName: string, parameters: TagsObject, options?: NetworkInterfacesUpdateTagsOptionalParams): Promise<NetworkInterfacesUpdateTagsResponse>;
    /**
     * Gets all network interfaces in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all network interfaces in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all route tables applied to a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginGetEffectiveRouteTable(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams): Promise<SimplePollerLike<OperationState<NetworkInterfacesGetEffectiveRouteTableResponse>, NetworkInterfacesGetEffectiveRouteTableResponse>>;
    /**
     * Gets all route tables applied to a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginGetEffectiveRouteTableAndWait(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams): Promise<NetworkInterfacesGetEffectiveRouteTableResponse>;
    /**
     * Gets all network security groups applied to a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginListEffectiveNetworkSecurityGroups(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams): Promise<SimplePollerLike<OperationState<NetworkInterfacesListEffectiveNetworkSecurityGroupsResponse>, NetworkInterfacesListEffectiveNetworkSecurityGroupsResponse>>;
    /**
     * Gets all network security groups applied to a network interface.
     * @param resourceGroupName The name of the resource group.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    beginListEffectiveNetworkSecurityGroupsAndWait(resourceGroupName: string, networkInterfaceName: string, options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams): Promise<NetworkInterfacesListEffectiveNetworkSecurityGroupsResponse>;
    /**
     * Gets information about all network interfaces in a virtual machine in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetVMNetworkInterfaces;
    /**
     * Gets all network interfaces in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetNetworkInterfaces;
    /**
     * Get the specified network interface in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    getVirtualMachineScaleSetNetworkInterface(resourceGroupName: string, virtualMachineScaleSetName: string, virtualmachineIndex: string, networkInterfaceName: string, options?: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams): Promise<NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceResponse>;
    /**
     * Get the specified network interface ip configuration in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param networkInterfaceName The name of the network interface.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetIpConfigurations;
    /**
     * Get the specified network interface ip configuration in a virtual machine scale set.
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param networkInterfaceName The name of the network interface.
     * @param ipConfigurationName The name of the ip configuration.
     * @param options The options parameters.
     */
    getVirtualMachineScaleSetIpConfiguration(resourceGroupName: string, virtualMachineScaleSetName: string, virtualmachineIndex: string, networkInterfaceName: string, ipConfigurationName: string, options?: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams): Promise<NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationResponse>;
    /**
     * ListCloudServiceRoleInstanceNetworkInterfacesNext
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param roleInstanceName The name of role instance.
     * @param nextLink The nextLink from the previous successful call to the
     *                 ListCloudServiceRoleInstanceNetworkInterfaces method.
     * @param options The options parameters.
     */
    private _listCloudServiceRoleInstanceNetworkInterfacesNext;
    /**
     * ListCloudServiceNetworkInterfacesNext
     * @param resourceGroupName The name of the resource group.
     * @param cloudServiceName The name of the cloud service.
     * @param nextLink The nextLink from the previous successful call to the
     *                 ListCloudServiceNetworkInterfaces method.
     * @param options The options parameters.
     */
    private _listCloudServiceNetworkInterfacesNext;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListVirtualMachineScaleSetVMNetworkInterfacesNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param nextLink The nextLink from the previous successful call to the
     *                 ListVirtualMachineScaleSetVMNetworkInterfaces method.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetVMNetworkInterfacesNext;
    /**
     * ListVirtualMachineScaleSetNetworkInterfacesNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param nextLink The nextLink from the previous successful call to the
     *                 ListVirtualMachineScaleSetNetworkInterfaces method.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetNetworkInterfacesNext;
    /**
     * ListVirtualMachineScaleSetIpConfigurationsNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualMachineScaleSetName The name of the virtual machine scale set.
     * @param virtualmachineIndex The virtual machine index.
     * @param networkInterfaceName The name of the network interface.
     * @param nextLink The nextLink from the previous successful call to the
     *                 ListVirtualMachineScaleSetIpConfigurations method.
     * @param options The options parameters.
     */
    private _listVirtualMachineScaleSetIpConfigurationsNext;
}
//# sourceMappingURL=networkInterfaces.d.ts.map