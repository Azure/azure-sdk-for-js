// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/getTriggeredAnalyticsRuleRuns/operations.js";
import type { GetTriggeredAnalyticsRuleRunsListOptionalParams } from "../../api/getTriggeredAnalyticsRuleRuns/options.js";
import type { TriggeredAnalyticsRuleRun } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GetTriggeredAnalyticsRuleRuns operations. */
export interface GetTriggeredAnalyticsRuleRunsOperations {
  /** Gets the triggered analytics rule runs. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: GetTriggeredAnalyticsRuleRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<TriggeredAnalyticsRuleRun>;
}

function _getGetTriggeredAnalyticsRuleRuns(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: GetTriggeredAnalyticsRuleRunsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getGetTriggeredAnalyticsRuleRunsOperations(
  context: SecurityInsightsContext,
): GetTriggeredAnalyticsRuleRunsOperations {
  return {
    ..._getGetTriggeredAnalyticsRuleRuns(context),
  };
}
