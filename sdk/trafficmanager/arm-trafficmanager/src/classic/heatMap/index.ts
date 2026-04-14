// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import { get } from "../../api/heatMap/operations.js";
import type { HeatMapGetOptionalParams } from "../../api/heatMap/options.js";
import type { HeatMapModel, HeatMapType } from "../../models/models.js";

/** Interface representing a HeatMap operations. */
export interface HeatMapOperations {
  /** Gets latest heatmap for Traffic Manager profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    heatMapType: HeatMapType,
    options?: HeatMapGetOptionalParams,
  ) => Promise<HeatMapModel>;
}

function _getHeatMap(context: TrafficManagerManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      profileName: string,
      heatMapType: HeatMapType,
      options?: HeatMapGetOptionalParams,
    ) => get(context, resourceGroupName, profileName, heatMapType, options),
  };
}

export function _getHeatMapOperations(context: TrafficManagerManagementContext): HeatMapOperations {
  return {
    ..._getHeatMap(context),
  };
}
