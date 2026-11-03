// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { recommendation } from "../../api/reevaluate/operations.js";
import type { ReevaluateRecommendationOptionalParams } from "../../api/reevaluate/options.js";
import type { ReevaluateResponse } from "../../models/models.js";

/** Interface representing a Reevaluate operations. */
export interface ReevaluateOperations {
  /** Reevaluate a recommendation. */
  recommendation: (
    resourceGroupName: string,
    workspaceName: string,
    recommendationId: string,
    options?: ReevaluateRecommendationOptionalParams,
  ) => Promise<ReevaluateResponse>;
}

function _getReevaluate(context: SecurityInsightsContext) {
  return {
    recommendation: (
      resourceGroupName: string,
      workspaceName: string,
      recommendationId: string,
      options?: ReevaluateRecommendationOptionalParams,
    ) => recommendation(context, resourceGroupName, workspaceName, recommendationId, options),
  };
}

export function _getReevaluateOperations(context: SecurityInsightsContext): ReevaluateOperations {
  return {
    ..._getReevaluate(context),
  };
}
