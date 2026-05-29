// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { execute } from "../../api/checkVirtualNetworkSubnetUsage/operations.js";
import type { CheckVirtualNetworkSubnetUsageExecuteOptionalParams } from "../../api/checkVirtualNetworkSubnetUsage/options.js";
import type {
  VirtualNetworkSubnetUsageParameter,
  VirtualNetworkSubnetUsageResult,
} from "../../models/models.js";

/** Interface representing a CheckVirtualNetworkSubnetUsage operations. */
export interface CheckVirtualNetworkSubnetUsageOperations {
  /** Get virtual network subnet usage for a given vNet resource id. */
  execute: (
    locationName: string,
    parameters: VirtualNetworkSubnetUsageParameter,
    options?: CheckVirtualNetworkSubnetUsageExecuteOptionalParams,
  ) => Promise<VirtualNetworkSubnetUsageResult>;
}

function _getCheckVirtualNetworkSubnetUsage(context: MySQLManagementFlexibleServerContext) {
  return {
    execute: (
      locationName: string,
      parameters: VirtualNetworkSubnetUsageParameter,
      options?: CheckVirtualNetworkSubnetUsageExecuteOptionalParams,
    ) => execute(context, locationName, parameters, options),
  };
}

export function _getCheckVirtualNetworkSubnetUsageOperations(
  context: MySQLManagementFlexibleServerContext,
): CheckVirtualNetworkSubnetUsageOperations {
  return {
    ..._getCheckVirtualNetworkSubnetUsage(context),
  };
}
