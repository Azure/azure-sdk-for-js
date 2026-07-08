// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/networkManagerDeploymentStatusOperations/operations.js";
import type { NetworkManagerDeploymentStatusOperationsListOptionalParams } from "../../api/networkManagerDeploymentStatusOperations/options.js";
import type {
  NetworkManagerDeploymentStatusParameter,
  NetworkManagerDeploymentStatusListResult,
} from "../../models/microsoft/network/models.js";

/** Interface representing a NetworkManagerDeploymentStatusOperations operations. */
export interface NetworkManagerDeploymentStatusOperationsOperations {
  /** Post to List of Network Manager Deployment Status. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManagerDeploymentStatusParameter,
    options?: NetworkManagerDeploymentStatusOperationsListOptionalParams,
  ) => Promise<NetworkManagerDeploymentStatusListResult>;
}

function _getNetworkManagerDeploymentStatusOperations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManagerDeploymentStatusParameter,
      options?: NetworkManagerDeploymentStatusOperationsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, parameters, options),
  };
}

export function _getNetworkManagerDeploymentStatusOperationsOperations(
  context: NetworkManagementContext,
): NetworkManagerDeploymentStatusOperationsOperations {
  return {
    ..._getNetworkManagerDeploymentStatusOperations(context),
  };
}
