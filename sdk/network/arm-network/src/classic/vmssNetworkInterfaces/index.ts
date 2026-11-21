// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listVirtualMachineScaleSetVMNetworkInterfaces,
  getVirtualMachineScaleSetNetworkInterface,
} from "../../api/vmssNetworkInterfaces/operations.js";
import type {
  VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
} from "../../api/vmssNetworkInterfaces/options.js";
import type { NetworkInterface } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VmssNetworkInterfaces operations. */
export interface VmssNetworkInterfacesOperations {
  /** Gets information about all network interfaces in a virtual machine in a virtual machine scale set. */
  listVirtualMachineScaleSetVMNetworkInterfaces: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    options?: VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
  /** Get the specified network interface in a virtual machine scale set. */
  getVirtualMachineScaleSetNetworkInterface: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    options?: VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
  ) => Promise<NetworkInterface>;
}

function _getVmssNetworkInterfaces(context: NetworkManagementContext) {
  return {
    listVirtualMachineScaleSetVMNetworkInterfaces: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      options?: VmssNetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
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
      options?: VmssNetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
    ) =>
      getVirtualMachineScaleSetNetworkInterface(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        options,
      ),
  };
}

export function _getVmssNetworkInterfacesOperations(
  context: NetworkManagementContext,
): VmssNetworkInterfacesOperations {
  return {
    ..._getVmssNetworkInterfaces(context),
  };
}
