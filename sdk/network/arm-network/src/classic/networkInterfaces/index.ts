// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listVirtualMachineScaleSetNetworkInterfaces,
  listCloudServiceNetworkInterfaces,
  listVirtualMachineScaleSetIpConfigurations,
  getVirtualMachineScaleSetIpConfiguration,
  listEffectiveNetworkSecurityGroups,
  getEffectiveRouteTable,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  listVirtualMachineScaleSetVMNetworkInterfaces,
  getVirtualMachineScaleSetNetworkInterface,
  listCloudServiceRoleInstanceNetworkInterfaces,
  getCloudServiceNetworkInterface,
} from "../../api/networkInterfaces/operations.js";
import type {
  NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
  NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
  NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateTagsOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
  NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
  NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
} from "../../api/networkInterfaces/options.js";
import type {
  NetworkInterfaceIPConfiguration,
  NetworkInterface,
  TagsObject,
  EffectiveRouteListResult,
  EffectiveNetworkSecurityGroupListResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkInterfaces operations. */
export interface NetworkInterfacesOperations {
  /** Gets all network interfaces in a virtual machine scale set. */
  listVirtualMachineScaleSetNetworkInterfaces: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Gets all network interfaces in a cloud service. */
  listCloudServiceNetworkInterfaces: (
    resourceGroupName: string,
    cloudServiceName: string,
    options?: NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Get the specified network interface ip configuration in a virtual machine scale set. */
  listVirtualMachineScaleSetIpConfigurations: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration>;
  /** Get the specified network interface ip configuration in a virtual machine scale set. */
  getVirtualMachineScaleSetIpConfiguration: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
  ) => Promise<NetworkInterfaceIPConfiguration>;
  /** Gets all network security groups applied to a network interface. */
  listEffectiveNetworkSecurityGroups: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  ) => PollerLike<
    OperationState<EffectiveNetworkSecurityGroupListResult>,
    EffectiveNetworkSecurityGroupListResult
  >;
  /** @deprecated use listEffectiveNetworkSecurityGroups instead */
  beginListEffectiveNetworkSecurityGroups: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<EffectiveNetworkSecurityGroupListResult>,
      EffectiveNetworkSecurityGroupListResult
    >
  >;
  /** @deprecated use listEffectiveNetworkSecurityGroups instead */
  beginListEffectiveNetworkSecurityGroupsAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  ) => Promise<EffectiveNetworkSecurityGroupListResult>;
  /** Gets all route tables applied to a network interface. */
  getEffectiveRouteTable: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  ) => PollerLike<OperationState<EffectiveRouteListResult>, EffectiveRouteListResult>;
  /** @deprecated use getEffectiveRouteTable instead */
  beginGetEffectiveRouteTable: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EffectiveRouteListResult>, EffectiveRouteListResult>
  >;
  /** @deprecated use getEffectiveRouteTable instead */
  beginGetEffectiveRouteTableAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  ) => Promise<EffectiveRouteListResult>;
  /** Gets all network interfaces in a subscription. */
  listAll: (
    options?: NetworkInterfacesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Gets all network interfaces in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkInterfacesListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Deletes the specified network interface. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a network interface tags. */
  updateTags: (
    resourceGroupName: string,
    networkInterfaceName: string,
    parameters: TagsObject,
    options?: NetworkInterfacesUpdateTagsOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Creates or updates a network interface. */
  createOrUpdate: (
    resourceGroupName: string,
    networkInterfaceName: string,
    parameters: NetworkInterface,
    options?: NetworkInterfacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkInterface>, NetworkInterface>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkInterfaceName: string,
    parameters: NetworkInterface,
    options?: NetworkInterfacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkInterface>, NetworkInterface>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    parameters: NetworkInterface,
    options?: NetworkInterfacesCreateOrUpdateOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Gets information about the specified network interface. */
  get: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Gets information about all network interfaces in a virtual machine in a virtual machine scale set. */
  listVirtualMachineScaleSetVMNetworkInterfaces: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    options?: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Get the specified network interface in a virtual machine scale set. */
  getVirtualMachineScaleSetNetworkInterface: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
  ) => Promise<NetworkInterface>;
  /** Gets information about all network interfaces in a role instance in a cloud service. */
  listCloudServiceRoleInstanceNetworkInterfaces: (
    resourceGroupName: string,
    cloudServiceName: string,
    roleInstanceName: string,
    options?: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Get the specified network interface in a cloud service. */
  getCloudServiceNetworkInterface: (
    resourceGroupName: string,
    cloudServiceName: string,
    roleInstanceName: string,
    networkInterfaceName: string,
    options?: NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
  ) => Promise<NetworkInterface>;
}

function _getNetworkInterfaces(context: NetworkManagementContext) {
  return {
    listVirtualMachineScaleSetNetworkInterfaces: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      options?: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
    ) =>
      listVirtualMachineScaleSetNetworkInterfaces(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        options,
      ),
    listCloudServiceNetworkInterfaces: (
      resourceGroupName: string,
      cloudServiceName: string,
      options?: NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
    ) => listCloudServiceNetworkInterfaces(context, resourceGroupName, cloudServiceName, options),
    listVirtualMachineScaleSetIpConfigurations: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
    ) =>
      listVirtualMachineScaleSetIpConfigurations(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        options,
      ),
    getVirtualMachineScaleSetIpConfiguration: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      options?: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
    ) =>
      getVirtualMachineScaleSetIpConfiguration(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    listEffectiveNetworkSecurityGroups: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
    ) =>
      listEffectiveNetworkSecurityGroups(context, resourceGroupName, networkInterfaceName, options),
    beginListEffectiveNetworkSecurityGroups: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
    ) => {
      const poller = listEffectiveNetworkSecurityGroups(
        context,
        resourceGroupName,
        networkInterfaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListEffectiveNetworkSecurityGroupsAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
    ) => {
      return await listEffectiveNetworkSecurityGroups(
        context,
        resourceGroupName,
        networkInterfaceName,
        options,
      );
    },
    getEffectiveRouteTable: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
    ) => getEffectiveRouteTable(context, resourceGroupName, networkInterfaceName, options),
    beginGetEffectiveRouteTable: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
    ) => {
      const poller = getEffectiveRouteTable(
        context,
        resourceGroupName,
        networkInterfaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetEffectiveRouteTableAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetEffectiveRouteTableOptionalParams,
    ) => {
      return await getEffectiveRouteTable(
        context,
        resourceGroupName,
        networkInterfaceName,
        options,
      );
    },
    listAll: (options?: NetworkInterfacesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NetworkInterfacesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkInterfaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkInterfaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkInterfaceName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkInterfaceName: string,
      parameters: TagsObject,
      options?: NetworkInterfacesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkInterfaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkInterfaceName: string,
      parameters: NetworkInterface,
      options?: NetworkInterfacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkInterfaceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      parameters: NetworkInterface,
      options?: NetworkInterfacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkInterfaceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      parameters: NetworkInterface,
      options?: NetworkInterfacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkInterfaceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetOptionalParams,
    ) => get(context, resourceGroupName, networkInterfaceName, options),
    listVirtualMachineScaleSetVMNetworkInterfaces: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      options?: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
    ) =>
      listVirtualMachineScaleSetVMNetworkInterfaces(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        options,
      ),
    getVirtualMachineScaleSetNetworkInterface: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
    ) =>
      getVirtualMachineScaleSetNetworkInterface(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        options,
      ),
    listCloudServiceRoleInstanceNetworkInterfaces: (
      resourceGroupName: string,
      cloudServiceName: string,
      roleInstanceName: string,
      options?: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
    ) =>
      listCloudServiceRoleInstanceNetworkInterfaces(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        options,
      ),
    getCloudServiceNetworkInterface: (
      resourceGroupName: string,
      cloudServiceName: string,
      roleInstanceName: string,
      networkInterfaceName: string,
      options?: NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
    ) =>
      getCloudServiceNetworkInterface(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        networkInterfaceName,
        options,
      ),
  };
}

export function _getNetworkInterfacesOperations(
  context: NetworkManagementContext,
): NetworkInterfacesOperations {
  return {
    ..._getNetworkInterfaces(context),
  };
}
