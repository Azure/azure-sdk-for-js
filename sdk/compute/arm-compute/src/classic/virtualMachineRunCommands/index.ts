// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  get,
  list,
  listByVirtualMachine,
  $delete,
  update,
  createOrUpdate,
  getByVirtualMachine,
} from "../../api/virtualMachineRunCommands/operations.js";
import type {
  VirtualMachineRunCommandsGetOptionalParams,
  VirtualMachineRunCommandsListOptionalParams,
  VirtualMachineRunCommandsListByVirtualMachineOptionalParams,
  VirtualMachineRunCommandsDeleteOptionalParams,
  VirtualMachineRunCommandsUpdateOptionalParams,
  VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineRunCommandsGetByVirtualMachineOptionalParams,
} from "../../api/virtualMachineRunCommands/options.js";
import type {
  VirtualMachineRunCommand,
  VirtualMachineRunCommandUpdate,
  RunCommandDocumentBase,
  RunCommandDocument,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineRunCommands operations. */
export interface VirtualMachineRunCommandsOperations {
  /** Gets specific run command for a subscription in a location. */
  get: (
    location: string,
    commandId: string,
    options?: VirtualMachineRunCommandsGetOptionalParams,
  ) => Promise<RunCommandDocument>;
  /** Lists all available run commands for a subscription in a location. */
  list: (
    location: string,
    options?: VirtualMachineRunCommandsListOptionalParams,
  ) => PagedAsyncIterableIterator<RunCommandDocumentBase>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineRunCommandsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    options?: VirtualMachineRunCommandsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the run command. */
  update: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineRunCommandsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineRunCommandsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommandUpdate,
    options?: VirtualMachineRunCommandsUpdateOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
  /** The operation to create or update the run command. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualMachineRunCommand>, VirtualMachineRunCommand>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    runCommandName: string,
    runCommand: VirtualMachineRunCommand,
    options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachineRunCommand>;
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
    get: (
      location: string,
      commandId: string,
      options?: VirtualMachineRunCommandsGetOptionalParams,
    ) => get(context, location, commandId, options),
    list: (location: string, options?: VirtualMachineRunCommandsListOptionalParams) =>
      list(context, location, options),
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
    beginDelete: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineRunCommandsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmName, runCommandName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      options?: VirtualMachineRunCommandsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmName, runCommandName, options);
    },
    update: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineRunCommandsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommandUpdate,
      options?: VirtualMachineRunCommandsUpdateOptionalParams,
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
      options?: VirtualMachineRunCommandsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, vmName, runCommandName, runCommand, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmName, runCommandName, runCommand, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmName: string,
      runCommandName: string,
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
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
      runCommand: VirtualMachineRunCommand,
      options?: VirtualMachineRunCommandsCreateOrUpdateOptionalParams,
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
