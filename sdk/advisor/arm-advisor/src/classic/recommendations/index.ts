// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import {
  getGenerateStatus,
  generate,
  listByTenant,
  list,
  update,
  get,
} from "../../api/recommendations/operations.js";
import {
  RecommendationsGetGenerateStatusOptionalParams,
  RecommendationsGenerateOptionalParams,
  RecommendationsListByTenantOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsUpdateOptionalParams,
  RecommendationsGetOptionalParams,
} from "../../api/recommendations/options.js";
import { ResourceRecommendationBase, RecommendationPatchPayload } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Recommendations operations. */
export interface RecommendationsOperations {
  /** Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. */
  getGenerateStatus: (
    operationId: string,
    options?: RecommendationsGetGenerateStatusOptionalParams,
  ) => Promise<void>;
  /** Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. */
  generate: (options?: RecommendationsGenerateOptionalParams) => Promise<void>;
  /** Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. */
  listByTenant: (
    resourceUri: string,
    options?: RecommendationsListByTenantOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceRecommendationBase>;
  /** Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. */
  list: (
    options?: RecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceRecommendationBase>;
  /** Update the state of a Recommendation */
  update: (
    recommendationId: string,
    properties: RecommendationPatchPayload,
    options?: RecommendationsUpdateOptionalParams,
  ) => Promise<ResourceRecommendationBase>;
  /** Obtains details of a cached recommendation. */
  get: (
    resourceUri: string,
    recommendationId: string,
    options?: RecommendationsGetOptionalParams,
  ) => Promise<ResourceRecommendationBase>;
}

function _getRecommendations(context: AdvisorManagementContext) {
  return {
    getGenerateStatus: (
      operationId: string,
      options?: RecommendationsGetGenerateStatusOptionalParams,
    ) => getGenerateStatus(context, operationId, options),
    generate: (options?: RecommendationsGenerateOptionalParams) => generate(context, options),
    listByTenant: (resourceUri: string, options?: RecommendationsListByTenantOptionalParams) =>
      listByTenant(context, resourceUri, options),
    list: (options?: RecommendationsListOptionalParams) => list(context, options),
    update: (
      recommendationId: string,
      properties: RecommendationPatchPayload,
      options?: RecommendationsUpdateOptionalParams,
    ) => update(context, recommendationId, properties, options),
    get: (
      resourceUri: string,
      recommendationId: string,
      options?: RecommendationsGetOptionalParams,
    ) => get(context, resourceUri, recommendationId, options),
  };
}

export function _getRecommendationsOperations(
  context: AdvisorManagementContext,
): RecommendationsOperations {
  return {
    ..._getRecommendations(context),
  };
}
