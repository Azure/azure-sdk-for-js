// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { get } from "../../api/triggeredAnalyticsRuleRun/operations.js";
import type { TriggeredAnalyticsRuleRunGetOptionalParams } from "../../api/triggeredAnalyticsRuleRun/options.js";
import type { TriggeredAnalyticsRuleRun } from "../../models/models.js";

/** Interface representing a TriggeredAnalyticsRuleRun operations. */
export interface TriggeredAnalyticsRuleRunOperations {
  /** Gets the triggered analytics rule run. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    ruleRunId: string,
    options?: TriggeredAnalyticsRuleRunGetOptionalParams,
  ) => Promise<TriggeredAnalyticsRuleRun>;
}

function _getTriggeredAnalyticsRuleRun(context: SecurityInsightsContext) {
  return {
    get: (
      resourceGroupName: string,
      workspaceName: string,
      ruleRunId: string,
      options?: TriggeredAnalyticsRuleRunGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, ruleRunId, options),
  };
}

export function _getTriggeredAnalyticsRuleRunOperations(
  context: SecurityInsightsContext,
): TriggeredAnalyticsRuleRunOperations {
  return {
    ..._getTriggeredAnalyticsRuleRun(context),
  };
}
