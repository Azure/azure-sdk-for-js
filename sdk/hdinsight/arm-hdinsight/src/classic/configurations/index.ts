// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import { get, update, list } from "../../api/configurations/operations.js";
import type {
  ConfigurationsGetOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsListOptionalParams,
} from "../../api/configurations/options.js";
import type { ClusterConfigurations } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Configurations operations. */
export interface ConfigurationsOperations {
  /** The configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ConfigurationsGetOptionalParams,
  ) => Promise<Record<string, string>>;
  /** Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: Record<string, string>,
    options?: ConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: Record<string, string>,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    parameters: Record<string, string>,
    options?: ConfigurationsUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets all configuration information for an HDI cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConfigurationsListOptionalParams,
  ) => Promise<ClusterConfigurations>;
}

function _getConfigurations(context: HDInsightManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, configurationName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: Record<string, string>,
      options?: ConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, configurationName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: Record<string, string>,
      options?: ConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      parameters: Record<string, string>,
      options?: ConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
  };
}

export function _getConfigurationsOperations(
  context: HDInsightManagementContext,
): ConfigurationsOperations {
  return {
    ..._getConfigurations(context),
  };
}
