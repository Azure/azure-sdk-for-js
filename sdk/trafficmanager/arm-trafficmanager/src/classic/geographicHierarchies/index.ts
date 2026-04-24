// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import { getDefault } from "../../api/geographicHierarchies/operations.js";
import type { GeographicHierarchiesGetDefaultOptionalParams } from "../../api/geographicHierarchies/options.js";
import type { TrafficManagerGeographicHierarchy } from "../../models/models.js";

/** Interface representing a GeographicHierarchies operations. */
export interface GeographicHierarchiesOperations {
  /** Gets the default Geographic Hierarchy used by the Geographic traffic routing method. */
  getDefault: (
    options?: GeographicHierarchiesGetDefaultOptionalParams,
  ) => Promise<TrafficManagerGeographicHierarchy>;
}

function _getGeographicHierarchies(context: TrafficManagerManagementContext) {
  return {
    getDefault: (options?: GeographicHierarchiesGetDefaultOptionalParams) =>
      getDefault(context, options),
  };
}

export function _getGeographicHierarchiesOperations(
  context: TrafficManagerManagementContext,
): GeographicHierarchiesOperations {
  return {
    ..._getGeographicHierarchies(context),
  };
}
