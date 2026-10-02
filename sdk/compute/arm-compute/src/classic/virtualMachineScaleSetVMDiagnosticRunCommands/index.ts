// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  diagnosticList,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineScaleSetVMDiagnosticRunCommands/operations.js";
import type {
  VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams,
} from "../../api/virtualMachineScaleSetVMDiagnosticRunCommands/options.js";
import type {
  VirtualMachineRunCommandUpdate,
  VirtualMachineDiagnosticRunCommand,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetVMDiagnosticRunCommands operations. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsOperations {
  /** The operation to get all diagnostic run commands of an instance in Virtual Machine Scaleset. */
  diagnosticList: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineDiagnosticRunCommand>;
  /** The operation to delete the VMSS VM diagnostic run command. */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the VMSS VM diagnostic run command. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update the VMSS VM diagnostic run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineDiagnosticRunCommand,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** The operation to get the VMSS VM diagnostic run command. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams,
  ) => Promise<VirtualMachineDiagnosticRunCommand>;
}
function _getVirtualMachineScaleSetVMDiagnosticRunCommands(context: ComputeManagementContext) {
  return {
    diagnosticList: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams,
    ) => diagnosticList(context, resourceGroupName, vmScaleSetName, instanceId, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
    beginDelete: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
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
    beginUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineDiagnosticRunCommand,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
  };
}
export function _getVirtualMachineScaleSetVMDiagnosticRunCommandsOperations(
  context: ComputeManagementContext,
): VirtualMachineScaleSetVMDiagnosticRunCommandsOperations {
  return {
    ..._getVirtualMachineScaleSetVMDiagnosticRunCommands(context),
  };
}
