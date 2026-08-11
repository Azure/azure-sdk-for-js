// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByLocation } from "../../api/capabilities/operations.js";
import type { CapabilitiesListByLocationOptionalParams } from "../../api/capabilities/options.js";
import type { LocationCapabilities } from "../../models/models.js";

/** Interface representing a Capabilities operations. */
export interface CapabilitiesOperations {
  /** Gets the subscription capabilities available for the specified location. */
  listByLocation: (
    locationName: string,
    options?: CapabilitiesListByLocationOptionalParams,
  ) => Promise<LocationCapabilities>;
}

function _getCapabilities(context: SqlManagementContext) {
  return {
    listByLocation: (locationName: string, options?: CapabilitiesListByLocationOptionalParams) =>
      listByLocation(context, locationName, options),
  };
}

export function _getCapabilitiesOperations(context: SqlManagementContext): CapabilitiesOperations {
  return {
    ..._getCapabilities(context),
  };
}
