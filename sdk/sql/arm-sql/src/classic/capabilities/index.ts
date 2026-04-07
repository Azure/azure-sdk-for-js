// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
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

function _getCapabilities(context: SqlContext) {
  return {
    listByLocation: (locationName: string, options?: CapabilitiesListByLocationOptionalParams) =>
      listByLocation(context, locationName, options),
  };
}

export function _getCapabilitiesOperations(context: SqlContext): CapabilitiesOperations {
  return {
    ..._getCapabilities(context),
  };
}
