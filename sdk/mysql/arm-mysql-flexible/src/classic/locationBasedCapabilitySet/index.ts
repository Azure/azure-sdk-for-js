// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { list, get } from "../../api/locationBasedCapabilitySet/operations.js";
import type {
  LocationBasedCapabilitySetListOptionalParams,
  LocationBasedCapabilitySetGetOptionalParams,
} from "../../api/locationBasedCapabilitySet/options.js";
import type { Capability } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LocationBasedCapabilitySet operations. */
export interface LocationBasedCapabilitySetOperations {
  /** Get capabilities at specified location in a given subscription. */
  list: (
    locationName: string,
    options?: LocationBasedCapabilitySetListOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
  /** Get capabilities at specified location in a given subscription. */
  get: (
    locationName: string,
    capabilitySetName: string,
    options?: LocationBasedCapabilitySetGetOptionalParams,
  ) => Promise<Capability>;
}

function _getLocationBasedCapabilitySet(context: MySQLManagementFlexibleServerContext) {
  return {
    list: (locationName: string, options?: LocationBasedCapabilitySetListOptionalParams) =>
      list(context, locationName, options),
    get: (
      locationName: string,
      capabilitySetName: string,
      options?: LocationBasedCapabilitySetGetOptionalParams,
    ) => get(context, locationName, capabilitySetName, options),
  };
}

export function _getLocationBasedCapabilitySetOperations(
  context: MySQLManagementFlexibleServerContext,
): LocationBasedCapabilitySetOperations {
  return {
    ..._getLocationBasedCapabilitySet(context),
  };
}
