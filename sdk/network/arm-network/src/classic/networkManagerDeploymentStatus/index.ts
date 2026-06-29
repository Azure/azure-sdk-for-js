// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/networkManagerDeploymentStatus/operations.js";
import type { NetworkManagerDeploymentStatusListOptionalParams } from "../../api/networkManagerDeploymentStatus/options.js";
import type {
  NetworkManagerDeploymentStatusParameter,
  NetworkManagerDeploymentStatusListResult,
} from "../../models/microsoft/network/models.js";

/** Interface representing a NetworkManagerDeploymentStatus operations. */
export interface NetworkManagerDeploymentStatusOperations {
  /** Post to List of Network Manager Deployment Status. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManagerDeploymentStatusParameter,
    options?: NetworkManagerDeploymentStatusListOptionalParams,
  ) => Promise<NetworkManagerDeploymentStatusListResult>;
}

function _getNetworkManagerDeploymentStatus(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManagerDeploymentStatusParameter,
      options?: NetworkManagerDeploymentStatusListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, parameters, options),
  };
}

export function _getNetworkManagerDeploymentStatusOperations(
  context: NetworkManagementContext,
): NetworkManagerDeploymentStatusOperations {
  return {
    ..._getNetworkManagerDeploymentStatus(context),
  };
}
