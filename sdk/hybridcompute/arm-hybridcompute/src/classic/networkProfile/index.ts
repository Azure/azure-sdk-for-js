// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { get } from "../../api/networkProfile/operations.js";
import type { NetworkProfileGetOptionalParams } from "../../api/networkProfile/options.js";
import type { NetworkProfile } from "../../models/models.js";

/** Interface representing a NetworkProfile operations. */
export interface NetworkProfileOperations {
  /** The operation to get network information of hybrid machine */
  get: (
    resourceGroupName: string,
    machineName: string,
    options?: NetworkProfileGetOptionalParams,
  ) => Promise<NetworkProfile>;
}

function _getNetworkProfile(context: HybridComputeManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      machineName: string,
      options?: NetworkProfileGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, options),
  };
}

export function _getNetworkProfileOperations(
  context: HybridComputeManagementContext,
): NetworkProfileOperations {
  return {
    ..._getNetworkProfile(context),
  };
}
