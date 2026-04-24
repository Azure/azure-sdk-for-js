// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, update, get } from "../../api/alertsSuppressionRules/operations.js";
import type {
  AlertsSuppressionRulesListOptionalParams,
  AlertsSuppressionRulesDeleteOptionalParams,
  AlertsSuppressionRulesUpdateOptionalParams,
  AlertsSuppressionRulesGetOptionalParams,
} from "../../api/alertsSuppressionRules/options.js";
import type { AlertsSuppressionRulesAPIAlertsSuppressionRule } from "../../models/alertsSuppressionRulesAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertsSuppressionRules operations. */
export interface AlertsSuppressionRulesOperations {
  /** List of all the dismiss rules for the given subscription */
  list: (
    options?: AlertsSuppressionRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<AlertsSuppressionRulesAPIAlertsSuppressionRule>;
  /** Delete dismiss alert rule for this subscription. */
  delete: (
    alertsSuppressionRuleName: string,
    options?: AlertsSuppressionRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update existing rule or create new rule if it doesn't exist */
  update: (
    alertsSuppressionRuleName: string,
    alertsSuppressionRule: AlertsSuppressionRulesAPIAlertsSuppressionRule,
    options?: AlertsSuppressionRulesUpdateOptionalParams,
  ) => Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule>;
  /** Get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription */
  get: (
    alertsSuppressionRuleName: string,
    options?: AlertsSuppressionRulesGetOptionalParams,
  ) => Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule>;
}

function _getAlertsSuppressionRules(context: SecurityCenterContext) {
  return {
    list: (options?: AlertsSuppressionRulesListOptionalParams) => list(context, options),
    delete: (
      alertsSuppressionRuleName: string,
      options?: AlertsSuppressionRulesDeleteOptionalParams,
    ) => $delete(context, alertsSuppressionRuleName, options),
    update: (
      alertsSuppressionRuleName: string,
      alertsSuppressionRule: AlertsSuppressionRulesAPIAlertsSuppressionRule,
      options?: AlertsSuppressionRulesUpdateOptionalParams,
    ) => update(context, alertsSuppressionRuleName, alertsSuppressionRule, options),
    get: (alertsSuppressionRuleName: string, options?: AlertsSuppressionRulesGetOptionalParams) =>
      get(context, alertsSuppressionRuleName, options),
  };
}

export function _getAlertsSuppressionRulesOperations(
  context: SecurityCenterContext,
): AlertsSuppressionRulesOperations {
  return {
    ..._getAlertsSuppressionRules(context),
  };
}
