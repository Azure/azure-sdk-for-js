// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/expressRouteProviderPortsLocation/operations.js";
import type { ExpressRouteProviderPortsLocationListOptionalParams } from "../../api/expressRouteProviderPortsLocation/options.js";
import type { ExpressRouteProviderPortListResult } from "../../models/microsoft/network/models.js";

/** Interface representing a ExpressRouteProviderPortsLocation operations. */
export interface ExpressRouteProviderPortsLocationOperations {
  /** Retrieves all the ExpressRouteProviderPorts in a subscription. */
  list: (
    options?: ExpressRouteProviderPortsLocationListOptionalParams,
  ) => Promise<ExpressRouteProviderPortListResult>;
}

function _getExpressRouteProviderPortsLocation(context: NetworkManagementContext) {
  return {
    list: (options?: ExpressRouteProviderPortsLocationListOptionalParams) => list(context, options),
  };
}

export function _getExpressRouteProviderPortsLocationOperations(
  context: NetworkManagementContext,
): ExpressRouteProviderPortsLocationOperations {
  return {
    ..._getExpressRouteProviderPortsLocation(context),
  };
}
