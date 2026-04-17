// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
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
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the VMSS VM run command. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
  /** The operation to create or update the VMSS VM run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
  /** The operation to get the VMSS VM run command. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    runCommandName: string,
    options?: VirtualMachineScaleSetVMRunCommandsGetOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
}

function _getVirtualMachineScaleSetVMRunCommands(context: ComputeContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
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
      options?: VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams,
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
    beginUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
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
      options?: VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams,
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
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
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams,
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
      options?: VirtualMachineScaleSetVMRunCommandsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
  };
}

export function _getVirtualMachineScaleSetVMRunCommandsOperations(
  context: ComputeContext,
): VirtualMachineScaleSetVMRunCommandsOperations {
  return {
    ..._getVirtualMachineScaleSetVMRunCommands(context),
  };
}
