// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, get } from "../../api/resiliencyReviews/operations.js";
import type {
  ResiliencyReviewsListOptionalParams,
  ResiliencyReviewsGetOptionalParams,
} from "../../api/resiliencyReviews/options.js";
import type { ResiliencyReview } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResiliencyReviews operations. */
export interface ResiliencyReviewsOperations {
  /** Get list of Azure Advisor resiliency reviews. */
  list: (
    options?: ResiliencyReviewsListOptionalParams,
  ) => PagedAsyncIterableIterator<ResiliencyReview>;
  /** Get existing Azure Advisor resiliency review by id. */
  get: (
    reviewId: string,
    options?: ResiliencyReviewsGetOptionalParams,
  ) => Promise<ResiliencyReview>;
}

function _getResiliencyReviews(context: AdvisorManagementContext) {
  return {
    list: (options?: ResiliencyReviewsListOptionalParams) => list(context, options),
    get: (reviewId: string, options?: ResiliencyReviewsGetOptionalParams) =>
      get(context, reviewId, options),
  };
}

export function _getResiliencyReviewsOperations(
  context: AdvisorManagementContext,
): ResiliencyReviewsOperations {
  return {
    ..._getResiliencyReviews(context),
  };
}
