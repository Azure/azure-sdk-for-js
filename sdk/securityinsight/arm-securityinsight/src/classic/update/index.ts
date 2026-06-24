// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { recommendation } from "../../api/update/operations.js";
import type { UpdateRecommendationOptionalParams } from "../../api/update/options.js";
import type { Recommendation, RecommendationPatch } from "../../models/models.js";

/** Interface representing a Update operations. */
export interface UpdateOperations {
  /** Patch a recommendation. */
  recommendation: (
    resourceGroupName: string,
    workspaceName: string,
    recommendationId: string,
    recommendationPatch: RecommendationPatch,
    options?: UpdateRecommendationOptionalParams,
  ) => Promise<Recommendation>;
}

function _getUpdate(context: SecurityInsightsContext) {
  return {
    recommendation: (
      resourceGroupName: string,
      workspaceName: string,
      recommendationId: string,
      recommendationPatch: RecommendationPatch,
      options?: UpdateRecommendationOptionalParams,
    ) =>
      recommendation(
        context,
        resourceGroupName,
        workspaceName,
        recommendationId,
        recommendationPatch,
        options,
      ),
  };
}

export function _getUpdateOperations(context: SecurityInsightsContext): UpdateOperations {
  return {
    ..._getUpdate(context),
  };
}
