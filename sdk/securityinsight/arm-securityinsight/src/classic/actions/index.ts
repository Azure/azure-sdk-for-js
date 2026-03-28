// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { listByAlertRule, $delete, createOrUpdate, get } from "../../api/actions/operations.js";
import type {
  ActionsListByAlertRuleOptionalParams,
  ActionsDeleteOptionalParams,
  ActionsCreateOrUpdateOptionalParams,
  ActionsGetOptionalParams,
} from "../../api/actions/options.js";
import type { ActionResponse, ActionRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Actions operations. */
export interface ActionsOperations {
  /** Gets all actions of alert rule. */
  listByAlertRule: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    options?: ActionsListByAlertRuleOptionalParams,
  ) => PagedAsyncIterableIterator<ActionResponse>;
  /** Delete the action of alert rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    actionId: string,
    options?: ActionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the action of alert rule. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    actionId: string,
    action: ActionRequest,
    options?: ActionsCreateOrUpdateOptionalParams,
  ) => Promise<ActionResponse>;
  /** Gets the action of alert rule. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    ruleId: string,
    actionId: string,
    options?: ActionsGetOptionalParams,
  ) => Promise<ActionResponse>;
}

function _getActions(context: SecurityInsightsContext) {
  return {
    listByAlertRule: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      options?: ActionsListByAlertRuleOptionalParams,
    ) => listByAlertRule(context, resourceGroupName, workspaceName, ruleId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      actionId: string,
      options?: ActionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, ruleId, actionId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      actionId: string,
      action: ActionRequest,
      options?: ActionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, ruleId, actionId, action, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      ruleId: string,
      actionId: string,
      options?: ActionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, ruleId, actionId, options),
  };
}

export function _getActionsOperations(context: SecurityInsightsContext): ActionsOperations {
  return {
    ..._getActions(context),
  };
}
