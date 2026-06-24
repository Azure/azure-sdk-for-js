// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, get } from "../../api/triageResources/operations.js";
import {
  TriageResourcesListOptionalParams,
  TriageResourcesGetOptionalParams,
} from "../../api/triageResources/options.js";
import { TriageResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TriageResources operations. */
export interface TriageResourcesOperations {
  /** List all triage resources that belong to a review and recommendation. */
  list: (
    reviewId: string,
    recommendationId: string,
    options?: TriageResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<TriageResource>;
  /** Get a triage resource for a given review and recommendation. */
  get: (
    reviewId: string,
    recommendationId: string,
    recommendationResourceId: string,
    options?: TriageResourcesGetOptionalParams,
  ) => Promise<TriageResource>;
}

function _getTriageResources(context: AdvisorManagementContext) {
  return {
    list: (
      reviewId: string,
      recommendationId: string,
      options?: TriageResourcesListOptionalParams,
    ) => list(context, reviewId, recommendationId, options),
    get: (
      reviewId: string,
      recommendationId: string,
      recommendationResourceId: string,
      options?: TriageResourcesGetOptionalParams,
    ) => get(context, reviewId, recommendationId, recommendationResourceId, options),
  };
}

export function _getTriageResourcesOperations(
  context: AdvisorManagementContext,
): TriageResourcesOperations {
  return {
    ..._getTriageResources(context),
  };
}
