// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { triggerRuleRun } from "../../api/alertRule/operations.js";
import type { AlertRuleTriggerRuleRunOptionalParams } from "../../api/alertRule/options.js";
import type { AlertRuleUnion, AnalyticsRuleRunTrigger } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AlertRule operations. */
export interface AlertRuleOperations {
  /** triggers analytics rule run */
  triggerRuleRun: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    analyticsRuleRunTriggerParameter: AnalyticsRuleRunTrigger,
    options?: AlertRuleTriggerRuleRunOptionalParams,
  ) => PollerLike<OperationState<AlertRuleUnion>, AlertRuleUnion>;
}

function _getAlertRule(context: SecurityInsightsContext) {
  return {
    triggerRuleRun: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      analyticsRuleRunTriggerParameter: AnalyticsRuleRunTrigger,
      options?: AlertRuleTriggerRuleRunOptionalParams,
    ) =>
      triggerRuleRun(
        context,
        resourceGroupName,
        workspaceName,
        ruleId,
        analyticsRuleRunTriggerParameter,
        options,
      ),
  };
}

export function _getAlertRuleOperations(context: SecurityInsightsContext): AlertRuleOperations {
  return {
    ..._getAlertRule(context),
  };
}
