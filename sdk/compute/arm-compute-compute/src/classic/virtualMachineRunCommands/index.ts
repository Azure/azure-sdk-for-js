// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByVirtualMachine,
  $delete,
  update,
  createOrUpdate,
  getByVirtualMachine,
} from "../../api/virtualMachineRunCommands/operations.js";
import type {
  VirtualMachineRunCommandsListByVirtualMachineOptionalParams,
  VirtualMachineRunCommandsDeleteOptionalParams,
  VirtualMachineRunCommandsUpdateOptionalParams,
  VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineRunCommandsGetByVirtualMachineOptionalParams,
} from "../../api/virtualMachineRunCommands/options.js";
import type {
  VirtualMachineRunCommand,
  VirtualMachineRunCommandUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineRunCommands operations. */
export interface VirtualMachineRunCommandsOperations {
  /** The operation to get all run commands of a Virtual Machine. */
  listByVirtualMachine: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineRunCommand>;
  /** The operation to delete the run command. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineRunCommandsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update the run command. */
  update: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update the run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to get the run command. */
  getByVirtualMachine: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineRunCommandsGetByVirtualMachineOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
}

function _getVirtualMachineRunCommands(context: ComputeManagementContext) {
  return {
    listByVirtualMachine: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachineRunCommandsListByVirtualMachineOptionalParams,
    ) => listByVirtualMachine(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineRunCommandsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, runCommandName, options),
    update: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineRunCommandsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    getByVirtualMachine: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineRunCommandsGetByVirtualMachineOptionalParams,
    ) => getByVirtualMachine(context, resourceGroupName, vmName, runCommandName, options),
  };
}

export function _getVirtualMachineRunCommandsOperations(
  context: ComputeManagementContext,
): VirtualMachineRunCommandsOperations {
  return {
    ..._getVirtualMachineRunCommands(context),
  };
}
