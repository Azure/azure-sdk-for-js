// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { get } from "../../api/networkProfileOperations/operations.js";
import type { NetworkProfileOperationsGetOptionalParams } from "../../api/networkProfileOperations/options.js";
import type { NetworkProfile } from "../../models/models.js";

/** Interface representing a NetworkProfileOperations operations. */
export interface NetworkProfileOperationsOperations {
  /** The operation to get network information of hybrid machine */
  get: (
    resourceGroupName: string,
    machineName: string,
    options?: NetworkProfileOperationsGetOptionalParams,
  ) => Promise<NetworkProfile>;
}

function _getNetworkProfileOperations(context: HybridComputeManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      machineName: string,
      options?: NetworkProfileOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, options),
  };
}

export function _getNetworkProfileOperationsOperations(
  context: HybridComputeManagementContext,
): NetworkProfileOperationsOperations {
  return {
    ..._getNetworkProfileOperations(context),
  };
}
