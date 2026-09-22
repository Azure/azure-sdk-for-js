// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext } from "../../api/monitorContext.js";
import {
  listByAzureMonitorWorkspace,
  createOrUpdate,
  get,
} from "../../api/metricsContainers/operations.js";
import {
  MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
  MetricsContainersCreateOrUpdateOptionalParams,
  MetricsContainersGetOptionalParams,
} from "../../api/metricsContainers/options.js";
import { MetricsContainerResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricsContainers operations. */
export interface MetricsContainersOperations {
  /** Lists metrics containers for a monitoring account. */
  listByAzureMonitorWorkspace: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<MetricsContainerResource>;
  /** Creates or updates metrics container settings for a monitoring account. */
  createOrUpdate: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    resource: MetricsContainerResource,
    options?: MetricsContainersCreateOrUpdateOptionalParams,
  ) => Promise<MetricsContainerResource>;
  /** Gets metrics container settings for a monitoring account. */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    options?: MetricsContainersGetOptionalParams,
  ) => Promise<MetricsContainerResource>;
}

function _getMetricsContainers(context: MonitorContext) {
  return {
    listByAzureMonitorWorkspace: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
    ) =>
      listByAzureMonitorWorkspace(context, resourceGroupName, azureMonitorWorkspaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      resource: MetricsContainerResource,
      options?: MetricsContainersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      options?: MetricsContainersGetOptionalParams,
    ) => get(context, resourceGroupName, azureMonitorWorkspaceName, metricsContainerName, options),
  };
}

export function _getMetricsContainersOperations(
  context: MonitorContext,
): MetricsContainersOperations {
  return {
    ..._getMetricsContainers(context),
  };
}
