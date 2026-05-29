// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { list } from "../../api/benefitRecommendations/operations.js";
import { BenefitRecommendationsListOptionalParams } from "../../api/benefitRecommendations/options.js";
import { BenefitRecommendationModel } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
