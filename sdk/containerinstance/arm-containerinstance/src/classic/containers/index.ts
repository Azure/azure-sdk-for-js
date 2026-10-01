// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import { attach, executeCommand, listLogs } from "../../api/containers/operations.js";
import type {
  ContainersAttachOptionalParams,
  ContainersExecuteCommandOptionalParams,
  ContainersListLogsOptionalParams,
} from "../../api/containers/options.js";
import type {
  Logs,
  ContainerExecRequest,
  ContainerExecResponse,
  ContainerAttachResponse,
} from "../../models/models.js";

/** Interface representing a Containers operations. */
export interface ContainersOperations {
  /** Attach to the output stream of a specific container instance in a specified resource group and container group. */
  attach: (
    resourceGroupName: string,
    containerGroupName: string,
    containerName: string,
    options?: ContainersAttachOptionalParams,
  ) => Promise<ContainerAttachResponse>;
  /** Executes a command for a specific container instance in a specified resource group and container group. */
  executeCommand: (
    resourceGroupName: string,
    containerGroupName: string,
    containerName: string,
    containerExecRequest: ContainerExecRequest,
    options?: ContainersExecuteCommandOptionalParams,
  ) => Promise<ContainerExecResponse>;
  /** Get the logs for a specified container instance in a specified resource group and container group. */
  listLogs: (
    resourceGroupName: string,
    containerGroupName: string,
    containerName: string,
    options?: ContainersListLogsOptionalParams,
  ) => Promise<Logs>;
}

function _getContainers(context: ContainerInstanceManagementContext) {
  return {
    attach: (
      resourceGroupName: string,
      containerGroupName: string,
      containerName: string,
      options?: ContainersAttachOptionalParams,
    ) => attach(context, resourceGroupName, containerGroupName, containerName, options),
    executeCommand: (
      resourceGroupName: string,
      containerGroupName: string,
      containerName: string,
      containerExecRequest: ContainerExecRequest,
      options?: ContainersExecuteCommandOptionalParams,
    ) =>
      executeCommand(
        context,
        resourceGroupName,
        containerGroupName,
        containerName,
        containerExecRequest,
        options,
      ),
    listLogs: (
      resourceGroupName: string,
      containerGroupName: string,
      containerName: string,
      options?: ContainersListLogsOptionalParams,
    ) => listLogs(context, resourceGroupName, containerGroupName, containerName, options),
  };
}

export function _getContainersOperations(
  context: ContainerInstanceManagementContext,
): ContainersOperations {
  return {
    ..._getContainers(context),
  };
}
