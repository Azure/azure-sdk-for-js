// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeRecommenderManagementContext } from "../../api/computeRecommenderManagementContext.js";
import { post, get } from "../../api/computePlacementScores/operations.js";
import type {
  ComputePlacementScoresPostOptionalParams,
  ComputePlacementScoresGetOptionalParams,
} from "../../api/computePlacementScores/options.js";
import type {
  ComputePlacementScoresBase,
  ComputePlacementScoresInput,
  ComputePlacementScoresResponse,
} from "../../models/models.js";

/** Interface representing a ComputePlacementScores operations. */
export interface ComputePlacementScoresOperations {
  /** Generates placement scores for Compute VM skus. */
  post: (
    location: string,
    computePlacementScoresInput: ComputePlacementScoresInput,
    options?: ComputePlacementScoresPostOptionalParams,
  ) => Promise<ComputePlacementScoresResponse>;
  /** Gets Compute Placement Scores metadata. */
  get: (
    location: string,
    options?: ComputePlacementScoresGetOptionalParams,
  ) => Promise<ComputePlacementScoresBase>;
}

function _getComputePlacementScores(context: ComputeRecommenderManagementContext) {
  return {
    post: (
      location: string,
      computePlacementScoresInput: ComputePlacementScoresInput,
      options?: ComputePlacementScoresPostOptionalParams,
    ) => post(context, location, computePlacementScoresInput, options),
    get: (location: string, options?: ComputePlacementScoresGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getComputePlacementScoresOperations(
  context: ComputeRecommenderManagementContext,
): ComputePlacementScoresOperations {
  return {
    ..._getComputePlacementScores(context),
  };
}
