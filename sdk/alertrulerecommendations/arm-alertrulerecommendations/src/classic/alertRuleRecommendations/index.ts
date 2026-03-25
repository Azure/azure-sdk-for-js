// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertRuleRecommendationsManagementContext } from "../../api/alertRuleRecommendationsManagementContext.js";
import { listByTargetType, listByResource } from "../../api/alertRuleRecommendations/operations.js";
import type {
  AlertRuleRecommendationsListByTargetTypeOptionalParams,
  AlertRuleRecommendationsListByResourceOptionalParams,
} from "../../api/alertRuleRecommendations/options.js";
import type { AlertRuleRecommendationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertRuleRecommendations operations. */
export interface AlertRuleRecommendationsOperations {
  /** Retrieve alert rule recommendations for a target type. */
  listByTargetType: (
    targetType: string,
    options?: AlertRuleRecommendationsListByTargetTypeOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleRecommendationResource>;
  /** Retrieve alert rule recommendations for a resource. */
  listByResource: (
    resourceUri: string,
    options?: AlertRuleRecommendationsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleRecommendationResource>;
}

function _getAlertRuleRecommendations(context: AlertRuleRecommendationsManagementContext) {
  return {
    listByTargetType: (
      targetType: string,
      options?: AlertRuleRecommendationsListByTargetTypeOptionalParams,
    ) => listByTargetType(context, targetType, options),
    listByResource: (
      resourceUri: string,
      options?: AlertRuleRecommendationsListByResourceOptionalParams,
    ) => listByResource(context, resourceUri, options),
  };
}

export function _getAlertRuleRecommendationsOperations(
  context: AlertRuleRecommendationsManagementContext,
): AlertRuleRecommendationsOperations {
  return {
    ..._getAlertRuleRecommendations(context),
  };
}
