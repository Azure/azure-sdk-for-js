// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import { list } from "../../api/benefitRecommendations/operations.js";
import type { BenefitRecommendationsListOptionalParams } from "../../api/benefitRecommendations/options.js";
import type { BenefitRecommendationModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BenefitRecommendations operations. */
export interface BenefitRecommendationsOperations {
  /** List of recommendations for purchasing savings plan. */
  list: (
    billingScope: string,
    options?: BenefitRecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<BenefitRecommendationModel>;
}

function _getBenefitRecommendations(context: CostManagementContext) {
  return {
    list: (billingScope: string, options?: BenefitRecommendationsListOptionalParams) =>
      list(context, billingScope, options),
  };
}

export function _getBenefitRecommendationsOperations(
  context: CostManagementContext,
): BenefitRecommendationsOperations {
  return {
    ..._getBenefitRecommendations(context),
  };
}
