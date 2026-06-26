// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { list } from "../../api/locationBasedCapabilities/operations.js";
import { LocationBasedCapabilitiesListOptionalParams } from "../../api/locationBasedCapabilities/options.js";
import { CapabilityProperties } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LocationBasedCapabilities operations. */
export interface LocationBasedCapabilitiesOperations {
  /** Get capabilities at specified location in a given subscription. */
  list: (
    locationName: string,
    options?: LocationBasedCapabilitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<CapabilityProperties>;
}

function _getLocationBasedCapabilities(context: MySQLManagementFlexibleServerContext) {
  return {
    list: (locationName: string, options?: LocationBasedCapabilitiesListOptionalParams) =>
      list(context, locationName, options),
  };
}

export function _getLocationBasedCapabilitiesOperations(
  context: MySQLManagementFlexibleServerContext,
): LocationBasedCapabilitiesOperations {
  return {
    ..._getLocationBasedCapabilities(context),
  };
}
