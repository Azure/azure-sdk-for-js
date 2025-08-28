// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeContext } from "../../api/computeContext.js";
import { post, get } from "../../api/spotPlacementScores/operations.js";
import {
  SpotPlacementScoresPostOptionalParams,
  SpotPlacementScoresGetOptionalParams,
} from "../../api/spotPlacementScores/options.js";
import {
  ComputeDiagnosticBase,
  SpotPlacementScoresInput,
  SpotPlacementScoresResponse,
} from "../../models/models.js";

/** Interface representing a SpotPlacementScores operations. */
export interface SpotPlacementScoresOperations {
  /** Generates placement scores for Spot VM skus. */
  post: (
    location: string,
    spotPlacementScoresInput: SpotPlacementScoresInput,
    options?: SpotPlacementScoresPostOptionalParams,
  ) => Promise<SpotPlacementScoresResponse>;
  /** Gets Spot Placement Scores metadata. */
  get: (
    location: string,
    options?: SpotPlacementScoresGetOptionalParams,
  ) => Promise<ComputeDiagnosticBase>;
}

function _getSpotPlacementScores(context: ComputeContext) {
  return {
    post: (
      location: string,
      spotPlacementScoresInput: SpotPlacementScoresInput,
      options?: SpotPlacementScoresPostOptionalParams,
    ) => post(context, location, spotPlacementScoresInput, options),
    get: (location: string, options?: SpotPlacementScoresGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getSpotPlacementScoresOperations(
  context: ComputeContext,
): SpotPlacementScoresOperations {
  return {
    ..._getSpotPlacementScores(context),
  };
}
