// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/iotSecuritySolutionsAnalyticsRecommendation/operations.js";
import type {
  IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
} from "../../api/iotSecuritySolutionsAnalyticsRecommendation/options.js";
import type { IoTSecurityAggregatedRecommendation } from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IotSecuritySolutionsAnalyticsRecommendation operations. */
export interface IotSecuritySolutionsAnalyticsRecommendationOperations {
  /** Use this method to get the list of aggregated security analytics recommendations of yours IoT Security solution. */
  list: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  ) => PagedAsyncIterableIterator<IoTSecurityAggregatedRecommendation>;
  /** Use this method to get the aggregated security analytics recommendation of yours IoT Security solution. This aggregation is performed by recommendation name. */
  get: (
    resourceGroupName: string,
    solutionName: string,
    aggregatedRecommendationName: string,
    options?: IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
  ) => Promise<IoTSecurityAggregatedRecommendation>;
}

function _getIotSecuritySolutionsAnalyticsRecommendation(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
    ) => list(context, resourceGroupName, solutionName, options),
    get: (
      resourceGroupName: string,
      solutionName: string,
      aggregatedRecommendationName: string,
      options?: IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
    ) => get(context, resourceGroupName, solutionName, aggregatedRecommendationName, options),
  };
}

export function _getIotSecuritySolutionsAnalyticsRecommendationOperations(
  context: SecurityCenterContext,
): IotSecuritySolutionsAnalyticsRecommendationOperations {
  return {
    ..._getIotSecuritySolutionsAnalyticsRecommendation(context),
  };
}
