// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeRecommenderManagementContext } from "../../api/computeRecommenderManagementContext.js";
import { post, get } from "../../api/skuMixPlacementScores/operations.js";
import type {
  SkuMixPlacementScoresPostOptionalParams,
  SkuMixPlacementScoresGetOptionalParams,
} from "../../api/skuMixPlacementScores/options.js";
import type {
  SkuMixPlacementBase,
  SkuMixPlacementRequest,
  SkuMixPlacementResponse,
} from "../../models/models.js";

/** Interface representing a SkuMixPlacementScores operations. */
export interface SkuMixPlacementScoresOperations {
  /** Generates placement scores for VM SKU mix placement. */
  post: (
    location: string,
    skuMixPlacementRequest: SkuMixPlacementRequest,
    options?: SkuMixPlacementScoresPostOptionalParams,
  ) => Promise<SkuMixPlacementResponse>;
  /** Gets SkuMixPlacement scoring metadata. */
  get: (
    location: string,
    options?: SkuMixPlacementScoresGetOptionalParams,
  ) => Promise<SkuMixPlacementBase>;
}
function _getSkuMixPlacementScores(context: ComputeRecommenderManagementContext) {
  return {
    post: (
      location: string,
      skuMixPlacementRequest: SkuMixPlacementRequest,
      options?: SkuMixPlacementScoresPostOptionalParams,
    ) => post(context, location, skuMixPlacementRequest, options),
    get: (location: string, options?: SkuMixPlacementScoresGetOptionalParams) =>
      get(context, location, options),
  };
}
export function _getSkuMixPlacementScoresOperations(
  context: ComputeRecommenderManagementContext,
): SkuMixPlacementScoresOperations {
  return {
    ..._getSkuMixPlacementScores(context),
  };
}
