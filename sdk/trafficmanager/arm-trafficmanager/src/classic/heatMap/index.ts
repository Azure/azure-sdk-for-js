// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import { get } from "../../api/heatMap/operations.js";
import { HeatMapGetOptionalParams } from "../../api/heatMap/options.js";
import { HeatMapModel } from "../../models/models.js";

/** Interface representing a HeatMap operations. */
export interface HeatMapOperations {
  /** Gets latest heatmap for Traffic Manager profile. */
  get: (
    resourceGroupName: string,
    profileName: string,
    options?: HeatMapGetOptionalParams,
  ) => Promise<HeatMapModel>;
}

function _getHeatMap(context: TrafficManagerManagementContext) {
  return {
    get: (resourceGroupName: string, profileName: string, options?: HeatMapGetOptionalParams) =>
      get(context, resourceGroupName, profileName, options),
  };
}

export function _getHeatMapOperations(context: TrafficManagerManagementContext): HeatMapOperations {
  return {
    ..._getHeatMap(context),
  };
}
