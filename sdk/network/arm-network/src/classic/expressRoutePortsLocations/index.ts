// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/expressRoutePortsLocations/operations.js";
import type {
  ExpressRoutePortsLocationsListOptionalParams,
  ExpressRoutePortsLocationsGetOptionalParams,
} from "../../api/expressRoutePortsLocations/options.js";
import type { ExpressRoutePortsLocation } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExpressRoutePortsLocations operations. */
export interface ExpressRoutePortsLocationsOperations {
  /** Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each location. Available bandwidths can only be obtained when retrieving a specific peering location. */
  list: (
    options?: ExpressRoutePortsLocationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRoutePortsLocation>;
  /** Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location. */
  get: (
    locationName: string,
    options?: ExpressRoutePortsLocationsGetOptionalParams,
  ) => Promise<ExpressRoutePortsLocation>;
}

function _getExpressRoutePortsLocations(context: NetworkManagementContext) {
  return {
    list: (options?: ExpressRoutePortsLocationsListOptionalParams) => list(context, options),
    get: (locationName: string, options?: ExpressRoutePortsLocationsGetOptionalParams) =>
      get(context, locationName, options),
  };
}

export function _getExpressRoutePortsLocationsOperations(
  context: NetworkManagementContext,
): ExpressRoutePortsLocationsOperations {
  return {
    ..._getExpressRoutePortsLocations(context),
  };
}
