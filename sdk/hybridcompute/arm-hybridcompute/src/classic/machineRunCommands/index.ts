// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/machineRunCommands/operations.js";
import {
  MachineRunCommandsListOptionalParams,
  MachineRunCommandsDeleteOptionalParams,
  MachineRunCommandsCreateOrUpdateOptionalParams,
  MachineRunCommandsGetOptionalParams,
} from "../../api/machineRunCommands/options.js";
import { MachineRunCommand } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MachineRunCommands operations. */
export interface MachineRunCommandsOperations {
  /** The operation to get all the run commands of a non-Azure machine. */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: MachineRunCommandsListOptionalParams,
  ) => PagedAsyncIterableIterator<MachineRunCommand>;
  /** The operation to delete a run command. */
  delete: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    options?: MachineRunCommandsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    options?: MachineRunCommandsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    options?: MachineRunCommandsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update a run command. */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    runCommandProperties: MachineRunCommand,
    options?: MachineRunCommandsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MachineRunCommand>, MachineRunCommand>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    runCommandProperties: MachineRunCommand,
    options?: MachineRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MachineRunCommand>, MachineRunCommand>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    runCommandProperties: MachineRunCommand,
    options?: MachineRunCommandsCreateOrUpdateOptionalParams,
  ) => Promise<MachineRunCommand>;
  /** The operation to get a run command. */
  get: (
    resourceGroupName: string,
    machineName: string,
    runCommandName: string,
    options?: MachineRunCommandsGetOptionalParams,
  ) => Promise<MachineRunCommand>;
}

function _getMachineRunCommands(context: HybridComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      machineName: string,
      options?: MachineRunCommandsListOptionalParams,
    ) => list(context, resourceGroupName, machineName, options),
    delete: (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      options?: MachineRunCommandsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, machineName, runCommandName, options),
    beginDelete: async (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      options?: MachineRunCommandsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, machineName, runCommandName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      options?: MachineRunCommandsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, machineName, runCommandName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      runCommandProperties: MachineRunCommand,
      options?: MachineRunCommandsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        runCommandName,
        runCommandProperties,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      runCommandProperties: MachineRunCommand,
      options?: MachineRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        runCommandName,
        runCommandProperties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      runCommandProperties: MachineRunCommand,
      options?: MachineRunCommandsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        runCommandName,
        runCommandProperties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      machineName: string,
      runCommandName: string,
      options?: MachineRunCommandsGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, runCommandName, options),
  };
}

export function _getMachineRunCommandsOperations(
  context: HybridComputeManagementContext,
): MachineRunCommandsOperations {
  return {
    ..._getMachineRunCommands(context),
  };
}
