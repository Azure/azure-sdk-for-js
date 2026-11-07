// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByLocation, get } from "../../api/timeZones/operations.js";
import type {
  TimeZonesListByLocationOptionalParams,
  TimeZonesGetOptionalParams,
} from "../../api/timeZones/options.js";
import type { TimeZone } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TimeZones operations. */
export interface TimeZonesOperations {
  /** Gets a list of managed instance time zones by location. */
  listByLocation: (
    locationName: string,
    options?: TimeZonesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<TimeZone>;
  /** Gets a managed instance time zone. */
  get: (
    locationName: string,
    timeZoneId: string,
    options?: TimeZonesGetOptionalParams,
  ) => Promise<TimeZone>;
}

function _getTimeZones(context: SqlManagementContext) {
  return {
    listByLocation: (locationName: string, options?: TimeZonesListByLocationOptionalParams) =>
      listByLocation(context, locationName, options),
    get: (locationName: string, timeZoneId: string, options?: TimeZonesGetOptionalParams) =>
      get(context, locationName, timeZoneId, options),
  };
}

export function _getTimeZonesOperations(context: SqlManagementContext): TimeZonesOperations {
  return {
    ..._getTimeZones(context),
  };
}
