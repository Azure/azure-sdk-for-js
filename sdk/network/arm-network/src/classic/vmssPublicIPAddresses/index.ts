// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listVirtualMachineScaleSetVMPublicIPAddresses,
  getVirtualMachineScaleSetPublicIPAddress,
} from "../../api/vmssPublicIPAddresses/operations.js";
import type {
  VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
} from "../../api/vmssPublicIPAddresses/options.js";
import type { PublicIPAddress } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VmssPublicIPAddresses operations. */
export interface VmssPublicIPAddressesOperations {
  /** Gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set. */
  listVirtualMachineScaleSetVMPublicIPAddresses: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Get the specified public IP address in a virtual machine scale set. */
  getVirtualMachineScaleSetPublicIPAddress: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    publicIpAddressName: string,
    options?: VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  ) => Promise<PublicIPAddress>;
}

function _getVmssPublicIPAddresses(context: NetworkManagementContext) {
  return {
    listVirtualMachineScaleSetVMPublicIPAddresses: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      options?: VmssPublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
    ) =>
      listVirtualMachineScaleSetVMPublicIPAddresses(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    getVirtualMachineScaleSetPublicIPAddress: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      publicIpAddressName: string,
      options?: VmssPublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
    ) =>
      getVirtualMachineScaleSetPublicIPAddress(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        publicIpAddressName,
        options,
      ),
  };
}

export function _getVmssPublicIPAddressesOperations(
  context: NetworkManagementContext,
): VmssPublicIPAddressesOperations {
  return {
    ..._getVmssPublicIPAddresses(context),
  };
}
