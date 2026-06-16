// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { singleRecommendation } from "../../api/get/operations.js";
import type { GetSingleRecommendationOptionalParams } from "../../api/get/options.js";
import type { Recommendation } from "../../models/models.js";

/** Interface representing a Get operations. */
export interface GetOperations {
  /** Gets a recommendation by its id. */
  singleRecommendation: (
    resourceGroupName: string,
    workspaceName: string,
    recommendationId: string,
    options?: GetSingleRecommendationOptionalParams,
  ) => Promise<Recommendation>;
}

function _getGet(context: SecurityInsightsContext) {
  return {
    singleRecommendation: (
      resourceGroupName: string,
      workspaceName: string,
      recommendationId: string,
      options?: GetSingleRecommendationOptionalParams,
    ) => singleRecommendation(context, resourceGroupName, workspaceName, recommendationId, options),
  };
}

export function _getGetOperations(context: SecurityInsightsContext): GetOperations {
  return {
    ..._getGet(context),
  };
}
