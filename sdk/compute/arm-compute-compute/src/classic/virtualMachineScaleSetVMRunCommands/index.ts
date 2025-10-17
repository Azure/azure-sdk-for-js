// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineScaleSetVMRunCommands/operations.js";
import type {
  VirtualMachineScaleSetVMRunCommandsListOptionalParams,
  VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
  VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
  VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMRunCommandsGetOptionalParams,
} from "../../api/virtualMachineScaleSetVMRunCommands/options.js";
import type {
  VirtualMachineRunCommand,
  VirtualMachineRunCommandUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetVMRunCommands operations. */
export interface VirtualMachineScaleSetVMRunCommandsOperations {
  /** The operation to get all run commands of an instance in Virtual Machine Scaleset. */
  list: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMRunCommandsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineRunCommand>;
  /** The operation to delete the VMSS VM run command. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update the VMSS VM run command. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update the VMSS VM run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to get the VMSS VM run command. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMRunCommandsGetOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
}

function _getVirtualMachineScaleSetVMRunCommands(context: ComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMRunCommandsListOptionalParams,
    ) => list(context, resourceGroupName, vmScaleSetName, instanceId, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      ),
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMRunCommandsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
  };
}

export function _getVirtualMachineScaleSetVMRunCommandsOperations(
  context: ComputeManagementContext,
): VirtualMachineScaleSetVMRunCommandsOperations {
  return {
    ..._getVirtualMachineScaleSetVMRunCommands(context),
  };
}
