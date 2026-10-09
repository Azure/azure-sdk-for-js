// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByMetricsContainer,
  listByMetricNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/metricConfigurations/operations.js";
import type {
  MetricConfigurationsListByMetricsContainerOptionalParams,
  MetricConfigurationsListByMetricNamespaceOptionalParams,
  MetricConfigurationsDeleteOptionalParams,
  MetricConfigurationsCreateOrUpdateOptionalParams,
  MetricConfigurationsGetOptionalParams,
} from "../../api/metricConfigurations/options.js";
import type { MetricConfigurationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricConfigurations operations. */
export interface MetricConfigurationsOperations {
  /**
   * Lists metrics across all namespaces in a metrics container. Resource
   * properties may be omitted in collection responses.
   */
  listByMetricsContainer: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    options?: MetricConfigurationsListByMetricsContainerOptionalParams,
  ) => PagedAsyncIterableIterator<MetricConfigurationResource>;
  /**
   * Lists metrics in a metric namespace. Resource properties may be omitted
   * in collection responses.
   */
  listByMetricNamespace: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    encodedMetricNamespace: string,
    options?: MetricConfigurationsListByMetricNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<MetricConfigurationResource>;
  /** Deletes a metric configuration. */
  delete: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    encodedMetricNamespace: string,
    encodedMetricName: string,
    options?: MetricConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a metric configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    encodedMetricNamespace: string,
    encodedMetricName: string,
    resource: MetricConfigurationResource,
    options?: MetricConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<MetricConfigurationResource>;
  /** Gets a metric configuration. */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    metricsContainerName: string,
    encodedMetricNamespace: string,
    encodedMetricName: string,
    options?: MetricConfigurationsGetOptionalParams,
  ) => Promise<MetricConfigurationResource>;
}

function _getMetricConfigurations(context: MonitorContext) {
  return {
    listByMetricsContainer: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      options?: MetricConfigurationsListByMetricsContainerOptionalParams,
    ) =>
      listByMetricsContainer(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        options,
      ),
    listByMetricNamespace: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      encodedMetricNamespace: string,
      options?: MetricConfigurationsListByMetricNamespaceOptionalParams,
    ) =>
      listByMetricNamespace(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        options,
      ),
    delete: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      encodedMetricNamespace: string,
      encodedMetricName: string,
      options?: MetricConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        encodedMetricName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      encodedMetricNamespace: string,
      encodedMetricName: string,
      resource: MetricConfigurationResource,
      options?: MetricConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        encodedMetricName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      metricsContainerName: string,
      encodedMetricNamespace: string,
      encodedMetricName: string,
      options?: MetricConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        encodedMetricName,
        options,
      ),
  };
}

export function _getMetricConfigurationsOperations(
  context: MonitorContext,
): MetricConfigurationsOperations {
  return {
    ..._getMetricConfigurations(context),
  };
}
