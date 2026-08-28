// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  diagnosticListByVirtualMachine,
  $delete,
  update,
  createOrUpdate,
  getByVirtualMachine,
} from "../../api/virtualMachineDiagnosticRunCommands/operations.js";
import type {
  VirtualMachineDiagnosticRunCommandsDiagnosticListByVirtualMachineOptionalParams,
  VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
  VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
  VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineDiagnosticRunCommandsGetByVirtualMachineOptionalParams,
} from "../../api/virtualMachineDiagnosticRunCommands/options.js";
import type {
  VirtualMachineRunCommandUpdate,
  VirtualMachineDiagnosticRunCommand,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineDiagnosticRunCommands operations. */
export interface VirtualMachineDiagnosticRunCommandsOperations {
  /** The operation to get all diagnostic run commands of a Virtual Machine. */
  diagnosticListByVirtualMachine: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineDiagnosticRunCommandsDiagnosticListByVirtualMachineOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineDiagnosticRunCommand>;
  /** The operation to delete the diagnostic run command. */
  delete: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the diagnostic run command. */
  update: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update the diagnostic run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** The operation to get the diagnostic run command. */
  getByVirtualMachine: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineDiagnosticRunCommandsGetByVirtualMachineOptionalParams,
  ) => Promise<VirtualMachineDiagnosticRunCommand>;
}
function _getVirtualMachineDiagnosticRunCommands(context: ComputeManagementContext) {
  return {
    diagnosticListByVirtualMachine: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachineDiagnosticRunCommandsDiagnosticListByVirtualMachineOptionalParams,
    ) => diagnosticListByVirtualMachine(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, runCommandName, options),
    beginDelete: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmName, runCommandName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineDiagnosticRunCommandsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmName, runCommandName, options);
    },
    update: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        vmName,
        runCommandName,
        runCommand,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineDiagnosticRunCommandsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, vmName, runCommandName, runCommand, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        runCommandName,
        runCommand,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        runCommandName,
        runCommand,
        options,
      );
    },
    getByVirtualMachine: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineDiagnosticRunCommandsGetByVirtualMachineOptionalParams,
    ) => getByVirtualMachine(context, resourceGroupName, vmName, runCommandName, options),
  };
}
export function _getVirtualMachineDiagnosticRunCommandsOperations(
  context: ComputeManagementContext,
): VirtualMachineDiagnosticRunCommandsOperations {
  return {
    ..._getVirtualMachineDiagnosticRunCommands(context),
  };
}
