// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/getRecommendations/operations.js";
import type { GetRecommendationsListOptionalParams } from "../../api/getRecommendations/options.js";
import type { Recommendation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GetRecommendations operations. */
export interface GetRecommendationsOperations {
  /** Gets a list of all recommendations. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GetRecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Recommendation>;
}

function _getGetRecommendations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: GetRecommendationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getGetRecommendationsOperations(
  context: SecurityInsightsContext,
): GetRecommendationsOperations {
  return {
    ..._getGetRecommendations(context),
  };
}
