// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import { get, patch } from "../../api/configuration/operations.js";
import type {
  ConfigurationGetOptionalParams,
  ConfigurationPatchOptionalParams,
} from "../../api/configuration/options.js";
import type { ClusterQuotaConfigurationProperties } from "../../models/models.js";

/** Interface representing a Configuration operations. */
export interface ConfigurationOperations {
  /** Get all Event Hubs Cluster settings - a collection of key/value pairs which represent the quotas and settings imposed on the cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConfigurationGetOptionalParams,
  ) => Promise<ClusterQuotaConfigurationProperties>;
  /** Replace all specified Event Hubs Cluster settings with those contained in the request body. Leaves the settings not specified in the request body unmodified. */
  patch: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterQuotaConfigurationProperties,
    options?: ConfigurationPatchOptionalParams,
  ) => Promise<ClusterQuotaConfigurationProperties | undefined>;
}

function _getConfiguration(context: EventHubManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
    patch: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterQuotaConfigurationProperties,
      options?: ConfigurationPatchOptionalParams,
    ) => patch(context, resourceGroupName, clusterName, parameters, options),
  };
}

export function _getConfigurationOperations(
  context: EventHubManagementContext,
): ConfigurationOperations {
  return {
    ..._getConfiguration(context),
  };
}
