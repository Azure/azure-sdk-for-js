// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  start,
  restart,
  reimage,
  powerOff,
  assignRelay,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachines/operations.js";
import {
  VirtualMachinesStartOptionalParams,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesAssignRelayOptionalParams,
  VirtualMachinesListBySubscriptionOptionalParams,
  VirtualMachinesListByResourceGroupOptionalParams,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesGetOptionalParams,
} from "../../api/virtualMachines/options.js";
import { OperationStatusResult, VirtualMachine } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachines operations. */
export interface VirtualMachinesOperations {
  /** Start the provided virtual machine. */
  start: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Restart the provided virtual machine. */
  restart: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Reimage the provided virtual machine. */
  reimage: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Power off the provided virtual machine. */
  powerOff: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine. */
  assignRelay: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesAssignRelayOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Get a list of virtual machines in the provided subscription. */
  listBySubscription: (
    options?: VirtualMachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Get a list of virtual machines in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Delete the provided virtual machine. */
  delete: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** Create a new virtual machine or update the properties of the existing virtual machine. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** Get properties of the provided virtual machine. */
  get: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesGetOptionalParams,
  ) => Promise<VirtualMachine>;
}

function _getVirtualMachines(context: NetworkCloudContext) {
  return {
    start: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => start(context, resourceGroupName, virtualMachineName, options),
    restart: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => restart(context, resourceGroupName, virtualMachineName, options),
    reimage: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, virtualMachineName, options),
    powerOff: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, virtualMachineName, options),
    assignRelay: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesAssignRelayOptionalParams,
    ) => assignRelay(context, resourceGroupName, virtualMachineName, options),
    listBySubscription: (options?: VirtualMachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualMachineName, options),
    update: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualMachineName, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualMachineName: string,
      virtualMachineParameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        virtualMachineParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualMachineName, options),
  };
}

export function _getVirtualMachinesOperations(
  context: NetworkCloudContext,
): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
