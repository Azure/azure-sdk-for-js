// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext } from "../../api/marketplaceContext.js";
import { checkUserHasReview } from "../../api/ratingAndReviewsOperations/operations.js";
import type { RatingAndReviewsOperationsCheckUserHasReviewOptionalParams } from "../../api/ratingAndReviewsOperations/options.js";
import type { UserHasReview } from "../../models/models.js";

/** Interface representing a RatingAndReviewsOperations operations. */
export interface RatingAndReviewsOperationsOperations {
  /** Check user has review. */
  checkUserHasReview: (
    uniqueProductId: string,
    options?: RatingAndReviewsOperationsCheckUserHasReviewOptionalParams,
  ) => Promise<UserHasReview>;
}

function _getRatingAndReviewsOperations(context: MarketplaceContext) {
  return {
    checkUserHasReview: (
      uniqueProductId: string,
      options?: RatingAndReviewsOperationsCheckUserHasReviewOptionalParams,
    ) => checkUserHasReview(context, uniqueProductId, options),
  };
}

export function _getRatingAndReviewsOperationsOperations(
  context: MarketplaceContext,
): RatingAndReviewsOperationsOperations {
  return {
    ..._getRatingAndReviewsOperations(context),
  };
}
