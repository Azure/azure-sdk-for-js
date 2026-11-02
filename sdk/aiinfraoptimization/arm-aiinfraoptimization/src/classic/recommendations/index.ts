// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIInfraOptimizationContext } from "../../api/aiInfraOptimizationContext.js";
import { recommendVmSku } from "../../api/recommendations/operations.js";
import type { RecommendationsRecommendVmSkuOptionalParams } from "../../api/recommendations/options.js";
import type { RecommendVmSkuRequest, RecommendVmSkuResponse } from "../../models/models.js";

/** Interface representing a Recommendations operations. */
export interface RecommendationsOperations {
  /** Recommends Azure virtual machine sizes for an AI workload in the specified subscription and azure location. */
  recommendVmSku: (
    location: string,
    body: RecommendVmSkuRequest,
    options?: RecommendationsRecommendVmSkuOptionalParams,
  ) => Promise<RecommendVmSkuResponse>;
}

function _getRecommendations(context: AIInfraOptimizationContext) {
  return {
    recommendVmSku: (
      location: string,
      body: RecommendVmSkuRequest,
      options?: RecommendationsRecommendVmSkuOptionalParams,
    ) => recommendVmSku(context, location, body, options),
  };
}

export function _getRecommendationsOperations(
  context: AIInfraOptimizationContext,
): RecommendationsOperations {
  return {
    ..._getRecommendations(context),
  };
}
