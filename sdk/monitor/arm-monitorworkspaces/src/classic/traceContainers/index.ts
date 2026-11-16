// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByAzureMonitorWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/traceContainers/operations.js";
import type {
  TraceContainersListByAzureMonitorWorkspaceOptionalParams,
  TraceContainersDeleteOptionalParams,
  TraceContainersCreateOrUpdateOptionalParams,
  TraceContainersGetOptionalParams,
} from "../../api/traceContainers/options.js";
import type { TraceContainerResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TraceContainers operations. */
export interface TraceContainersOperations {
  /** Lists trace containers for an Azure Monitor Workspace. */
  listByAzureMonitorWorkspace: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: TraceContainersListByAzureMonitorWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<TraceContainerResource>;
  /** Deletes the trace container for an Azure Monitor Workspace. */
  delete: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: TraceContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces the trace container for an Azure Monitor Workspace. Modeled as a long-running operation (200 + 201); the service may complete synchronously by returning a terminal provisioningState, or track progress via Azure-AsyncOperation. */
  createOrUpdate: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    resource: TraceContainerResource,
    options?: TraceContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TraceContainerResource>, TraceContainerResource>;
  /** Gets the trace container for an Azure Monitor Workspace. */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: TraceContainersGetOptionalParams,
  ) => Promise<TraceContainerResource>;
}

function _getTraceContainers(context: MonitorContext) {
  return {
    listByAzureMonitorWorkspace: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: TraceContainersListByAzureMonitorWorkspaceOptionalParams,
    ) =>
      listByAzureMonitorWorkspace(context, resourceGroupName, azureMonitorWorkspaceName, options),
    delete: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: TraceContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureMonitorWorkspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      resource: TraceContainerResource,
      options?: TraceContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, azureMonitorWorkspaceName, resource, options),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: TraceContainersGetOptionalParams,
    ) => get(context, resourceGroupName, azureMonitorWorkspaceName, options),
  };
}

export function _getTraceContainersOperations(context: MonitorContext): TraceContainersOperations {
  return {
    ..._getTraceContainers(context),
  };
}
