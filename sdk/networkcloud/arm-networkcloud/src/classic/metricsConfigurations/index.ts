// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/metricsConfigurations/operations.js";
import {
  MetricsConfigurationsListByClusterOptionalParams,
  MetricsConfigurationsDeleteOptionalParams,
  MetricsConfigurationsUpdateOptionalParams,
  MetricsConfigurationsCreateOrUpdateOptionalParams,
  MetricsConfigurationsGetOptionalParams,
} from "../../api/metricsConfigurations/options.js";
import { OperationStatusResult, ClusterMetricsConfiguration } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MetricsConfigurations operations. */
export interface MetricsConfigurationsOperations {
  /** Get a list of metrics configurations for the provided cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: MetricsConfigurationsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterMetricsConfiguration>;
  /** Delete the metrics configuration of the provided cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    metricsConfigurationName: string,
    options?: MetricsConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch properties of metrics configuration for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    metricsConfigurationName: string,
    options?: MetricsConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration>;
  /** Create new or update the existing metrics configuration of the provided cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    metricsConfigurationName: string,
    metricsConfigurationParameters: ClusterMetricsConfiguration,
    options?: MetricsConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration>;
  /** Get metrics configuration of the provided cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    metricsConfigurationName: string,
    options?: MetricsConfigurationsGetOptionalParams,
  ) => Promise<ClusterMetricsConfiguration>;
}

function _getMetricsConfigurations(context: NetworkCloudContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: MetricsConfigurationsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      metricsConfigurationName: string,
      options?: MetricsConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, metricsConfigurationName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      metricsConfigurationName: string,
      options?: MetricsConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, metricsConfigurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      metricsConfigurationName: string,
      metricsConfigurationParameters: ClusterMetricsConfiguration,
      options?: MetricsConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        metricsConfigurationName,
        metricsConfigurationParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      metricsConfigurationName: string,
      options?: MetricsConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, metricsConfigurationName, options),
  };
}

export function _getMetricsConfigurationsOperations(
  context: NetworkCloudContext,
): MetricsConfigurationsOperations {
  return {
    ..._getMetricsConfigurations(context),
  };
}
