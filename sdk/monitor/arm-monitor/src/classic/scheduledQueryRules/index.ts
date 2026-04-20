// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/scheduledQueryRules/operations.js";
import type {
  ScheduledQueryRulesListBySubscriptionOptionalParams,
  ScheduledQueryRulesListByResourceGroupOptionalParams,
  ScheduledQueryRulesDeleteOptionalParams,
  ScheduledQueryRulesUpdateOptionalParams,
  ScheduledQueryRulesCreateOrUpdateOptionalParams,
  ScheduledQueryRulesGetOptionalParams,
} from "../../api/scheduledQueryRules/options.js";
import type {
  MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
  MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
} from "../../models/microsoft/scheduledQueryRule/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScheduledQueryRules operations. */
export interface ScheduledQueryRulesOperations {
  /** Retrieve a scheduled query rule definitions in a subscription. */
  listBySubscription: (
    options?: ScheduledQueryRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>;
  /** Retrieve scheduled query rule definitions in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ScheduledQueryRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>;
  /** Deletes a scheduled query rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ruleName: string,
    options?: ScheduledQueryRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a scheduled query rule. */
  update: (
    resourceGroupName: string,
    ruleName: string,
    parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
    options?: ScheduledQueryRulesUpdateOptionalParams,
  ) => Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>;
  /** Creates or updates a scheduled query rule. */
  createOrUpdate: (
    resourceGroupName: string,
    ruleName: string,
    parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
    options?: ScheduledQueryRulesCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>;
  /** Retrieve an scheduled query rule definition. */
  get: (
    resourceGroupName: string,
    ruleName: string,
    options?: ScheduledQueryRulesGetOptionalParams,
  ) => Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource>;
}

function _getScheduledQueryRules(context: MonitorContext) {
  return {
    listBySubscription: (options?: ScheduledQueryRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ScheduledQueryRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ruleName: string,
      options?: ScheduledQueryRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ruleName, options),
    update: (
      resourceGroupName: string,
      ruleName: string,
      parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
      options?: ScheduledQueryRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ruleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ruleName: string,
      parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
      options?: ScheduledQueryRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ruleName, parameters, options),
    get: (
      resourceGroupName: string,
      ruleName: string,
      options?: ScheduledQueryRulesGetOptionalParams,
    ) => get(context, resourceGroupName, ruleName, options),
  };
}

export function _getScheduledQueryRulesOperations(
  context: MonitorContext,
): ScheduledQueryRulesOperations {
  return {
    ..._getScheduledQueryRules(context),
  };
}
