// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import {
  getGenerateStatus,
  generate,
  updateByServiceGroup,
  getByServiceGroup,
  listByServiceGroup,
  listByTenant,
  list,
  update,
  get,
} from "../../api/recommendations/operations.js";
import type {
  RecommendationsGetGenerateStatusOptionalParams,
  RecommendationsGenerateOptionalParams,
  RecommendationsUpdateByServiceGroupOptionalParams,
  RecommendationsGetByServiceGroupOptionalParams,
  RecommendationsListByServiceGroupOptionalParams,
  RecommendationsListByTenantOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsUpdateOptionalParams,
  RecommendationsGetOptionalParams,
} from "../../api/recommendations/options.js";
import type {
  ResourceRecommendationBase,
  RecommendationPatchPayload,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Recommendations operations. */
export interface RecommendationsOperations {
  /** Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. */
  getGenerateStatus: (
    operationId: string,
    options?: RecommendationsGetGenerateStatusOptionalParams,
  ) => Promise<void>;
  /** Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. */
  generate: (options?: RecommendationsGenerateOptionalParams) => Promise<void>;
  /** Updates the state of a recommendation for a service group. */
  updateByServiceGroup: (
    serviceGroupName: string,
    recommendationId: string,
    properties: RecommendationPatchPayload,
    options?: RecommendationsUpdateByServiceGroupOptionalParams,
  ) => Promise<ResourceRecommendationBase>;
  /** Obtains details of a recommendation for a service group. */
  getByServiceGroup: (
    serviceGroupName: string,
    recommendationId: string,
    options?: RecommendationsGetByServiceGroupOptionalParams,
  ) => Promise<ResourceRecommendationBase>;
  /** Obtains recommendations for a service group. */
  listByServiceGroup: (
    serviceGroupName: string,
    options?: RecommendationsListByServiceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceRecommendationBase>;
  /** Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. */
  listByTenant: (
    resourceUri: string,
    options?: RecommendationsListByTenantOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceRecommendationBase>;
  /** Obtains recommendations for a subscription. */
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
    updateByServiceGroup: (
      serviceGroupName: string,
      recommendationId: string,
      properties: RecommendationPatchPayload,
      options?: RecommendationsUpdateByServiceGroupOptionalParams,
    ) => updateByServiceGroup(context, serviceGroupName, recommendationId, properties, options),
    getByServiceGroup: (
      serviceGroupName: string,
      recommendationId: string,
      options?: RecommendationsGetByServiceGroupOptionalParams,
    ) => getByServiceGroup(context, serviceGroupName, recommendationId, options),
    listByServiceGroup: (
      serviceGroupName: string,
      options?: RecommendationsListByServiceGroupOptionalParams,
    ) => listByServiceGroup(context, serviceGroupName, options),
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
