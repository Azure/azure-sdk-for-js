// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { list } from "../../api/virtualNetworkSubnetUsage/operations.js";
import { VirtualNetworkSubnetUsageListOptionalParams } from "../../api/virtualNetworkSubnetUsage/options.js";
import {
  VirtualNetworkSubnetUsageParameter,
  VirtualNetworkSubnetUsageModel,
} from "../../models/models.js";

/** Interface representing a VirtualNetworkSubnetUsage operations. */
export interface VirtualNetworkSubnetUsageOperations {
  /** Lists the virtual network subnet usage for a given virtual network. */
  list: (
    locationName: string,
    parameters: VirtualNetworkSubnetUsageParameter,
    options?: VirtualNetworkSubnetUsageListOptionalParams,
  ) => Promise<VirtualNetworkSubnetUsageModel>;
}

function _getVirtualNetworkSubnetUsage(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    list: (
      locationName: string,
      parameters: VirtualNetworkSubnetUsageParameter,
      options?: VirtualNetworkSubnetUsageListOptionalParams,
    ) => list(context, locationName, parameters, options),
  };
}

export function _getVirtualNetworkSubnetUsageOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): VirtualNetworkSubnetUsageOperations {
  return {
    ..._getVirtualNetworkSubnetUsage(context),
  };
}
