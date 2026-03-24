// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/alertRules/operations.js";
import type {
  AlertRulesListOptionalParams,
  AlertRulesDeleteOptionalParams,
  AlertRulesCreateOrUpdateOptionalParams,
  AlertRulesGetOptionalParams,
} from "../../api/alertRules/options.js";
import type { AlertRuleUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertRules operations. */
export interface AlertRulesOperations {
  /** Gets all alert rules. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: AlertRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<AlertRuleUnion>;
  /** Delete the alert rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    options?: AlertRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the alert rule. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    alertRule: AlertRuleUnion,
    options?: AlertRulesCreateOrUpdateOptionalParams,
  ) => Promise<AlertRuleUnion>;
  /** Gets the alert rule. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    options?: AlertRulesGetOptionalParams,
  ) => Promise<AlertRuleUnion>;
}

function _getAlertRules(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: AlertRulesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      options?: AlertRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, ruleId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      alertRule: AlertRuleUnion,
      options?: AlertRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, ruleId, alertRule, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      options?: AlertRulesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, ruleId, options),
  };
}

export function _getAlertRulesOperations(context: SecurityInsightsContext): AlertRulesOperations {
  return {
    ..._getAlertRules(context),
  };
}
