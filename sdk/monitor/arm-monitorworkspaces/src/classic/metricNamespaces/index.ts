// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { listByMetricsContainer, get } from "../../api/metricNamespaces/operations.js";
import type {
  MetricNamespacesListByMetricsContainerOptionalParams,
  MetricNamespacesGetOptionalParams,
} from "../../api/metricNamespaces/options.js";
import type { MetricNamespaceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricNamespaces operations. */
export interface MetricNamespacesOperations {
  /**
   * Lists metric namespaces for an Azure Monitor Workspace. Resource
   * properties may be omitted in collection responses.
   */
  listByMetricsContainer: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    options?: MetricNamespacesListByMetricsContainerOptionalParams,
  ) => PagedAsyncIterableIterator<MetricNamespaceResource>;
  /** Gets a metric namespace. */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    encodedMetricNamespace: string,
    options?: MetricNamespacesGetOptionalParams,
  ) => Promise<MetricNamespaceResource>;
}

function _getMetricNamespaces(context: MonitorContext) {
  return {
    listByMetricsContainer: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      options?: MetricNamespacesListByMetricsContainerOptionalParams,
    ) =>
      listByMetricsContainer(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      encodedMetricNamespace: string,
      options?: MetricNamespacesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        options,
      ),
  };
}

export function _getMetricNamespacesOperations(
  context: MonitorContext,
): MetricNamespacesOperations {
  return {
    ..._getMetricNamespaces(context),
  };
}
