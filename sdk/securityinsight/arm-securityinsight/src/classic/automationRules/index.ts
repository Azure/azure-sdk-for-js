// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/automationRules/operations.js";
import type {
  AutomationRulesListOptionalParams,
  AutomationRulesDeleteOptionalParams,
  AutomationRulesCreateOrUpdateOptionalParams,
  AutomationRulesGetOptionalParams,
} from "../../api/automationRules/options.js";
import type { AutomationRule, AutomationRulesDeleteResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutomationRules operations. */
export interface AutomationRulesOperations {
  /** Gets all automation rules. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: AutomationRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<AutomationRule>;
  /** Delete the automation rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    automationRuleId: string,
    options?: AutomationRulesDeleteOptionalParams,
  ) => Promise<AutomationRulesDeleteResponse>;
  /** Creates or updates the automation rule. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    automationRuleId: string,
    options?: AutomationRulesCreateOrUpdateOptionalParams,
  ) => Promise<AutomationRule>;
  /** Gets the automation rule. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    automationRuleId: string,
    options?: AutomationRulesGetOptionalParams,
  ) => Promise<AutomationRule>;
}

function _getAutomationRules(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: AutomationRulesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      automationRuleId: string,
      options?: AutomationRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, automationRuleId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      automationRuleId: string,
      options?: AutomationRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, automationRuleId, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      automationRuleId: string,
      options?: AutomationRulesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, automationRuleId, options),
  };
}

export function _getAutomationRulesOperations(
  context: SecurityInsightsContext,
): AutomationRulesOperations {
  return {
    ..._getAutomationRules(context),
  };
}
