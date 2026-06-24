// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import {
  resetTriageRecommendation,
  rejectTriageRecommendation,
  approveTriageRecommendation,
  list,
  get,
} from "../../api/triageRecommendations/operations.js";
import {
  TriageRecommendationsResetTriageRecommendationOptionalParams,
  TriageRecommendationsRejectTriageRecommendationOptionalParams,
  TriageRecommendationsApproveTriageRecommendationOptionalParams,
  TriageRecommendationsListOptionalParams,
  TriageRecommendationsGetOptionalParams,
} from "../../api/triageRecommendations/options.js";
import { TriageRecommendation, RecommendationRejectBody } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TriageRecommendations operations. */
export interface TriageRecommendationsOperations {
  /** Reset an existing triage recommendation for a given id. */
  resetTriageRecommendation: (
    reviewId: string,
    recommendationId: string,
    options?: TriageRecommendationsResetTriageRecommendationOptionalParams,
  ) => Promise<void>;
  /** Reject an existing triage recommendation for a given id. */
  rejectTriageRecommendation: (
    reviewId: string,
    recommendationId: string,
    recommendationRejectBody: RecommendationRejectBody,
    options?: TriageRecommendationsRejectTriageRecommendationOptionalParams,
  ) => Promise<void>;
  /** Approve a triage recommendation for a given id. */
  approveTriageRecommendation: (
    reviewId: string,
    recommendationId: string,
    options?: TriageRecommendationsApproveTriageRecommendationOptionalParams,
  ) => Promise<void>;
  /** Get list of recommendations for an existing Azure Advisor Resiliency Review Id. */
  list: (
    reviewId: string,
    options?: TriageRecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<TriageRecommendation>;
  /** Get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id. */
  get: (
    reviewId: string,
    recommendationId: string,
    options?: TriageRecommendationsGetOptionalParams,
  ) => Promise<TriageRecommendation>;
}

function _getTriageRecommendations(context: AdvisorManagementContext) {
  return {
    resetTriageRecommendation: (
      reviewId: string,
      recommendationId: string,
      options?: TriageRecommendationsResetTriageRecommendationOptionalParams,
    ) => resetTriageRecommendation(context, reviewId, recommendationId, options),
    rejectTriageRecommendation: (
      reviewId: string,
      recommendationId: string,
      recommendationRejectBody: RecommendationRejectBody,
      options?: TriageRecommendationsRejectTriageRecommendationOptionalParams,
    ) =>
      rejectTriageRecommendation(
        context,
        reviewId,
        recommendationId,
        recommendationRejectBody,
        options,
      ),
    approveTriageRecommendation: (
      reviewId: string,
      recommendationId: string,
      options?: TriageRecommendationsApproveTriageRecommendationOptionalParams,
    ) => approveTriageRecommendation(context, reviewId, recommendationId, options),
    list: (reviewId: string, options?: TriageRecommendationsListOptionalParams) =>
      list(context, reviewId, options),
    get: (
      reviewId: string,
      recommendationId: string,
      options?: TriageRecommendationsGetOptionalParams,
    ) => get(context, reviewId, recommendationId, options),
  };
}

export function _getTriageRecommendationsOperations(
  context: AdvisorManagementContext,
): TriageRecommendationsOperations {
  return {
    ..._getTriageRecommendations(context),
  };
}
