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
  ScheduledQueryRuleApiScheduledQueryRuleResource,
  ScheduledQueryRuleApiScheduledQueryRuleResourcePatch,
} from "../../models/scheduledQueryRuleApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScheduledQueryRules operations. */
export interface ScheduledQueryRulesOperations {
  /** Retrieve a scheduled query rule definitions in a subscription. */
  listBySubscription: (
    options?: ScheduledQueryRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledQueryRuleApiScheduledQueryRuleResource>;
  /** Retrieve scheduled query rule definitions in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ScheduledQueryRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledQueryRuleApiScheduledQueryRuleResource>;
  /** Deletes a scheduled query rule. */
  delete: (
    resourceGroupName: string,
    ruleName: string,
    options?: ScheduledQueryRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a scheduled query rule. */
  update: (
    resourceGroupName: string,
    ruleName: string,
    parameters: ScheduledQueryRuleApiScheduledQueryRuleResourcePatch,
    options?: ScheduledQueryRulesUpdateOptionalParams,
  ) => Promise<ScheduledQueryRuleApiScheduledQueryRuleResource>;
  /** Creates or updates a scheduled query rule. */
  createOrUpdate: (
    resourceGroupName: string,
    ruleName: string,
    parameters: ScheduledQueryRuleApiScheduledQueryRuleResource,
    options?: ScheduledQueryRulesCreateOrUpdateOptionalParams,
  ) => Promise<ScheduledQueryRuleApiScheduledQueryRuleResource>;
  /** Retrieve an scheduled query rule definition. */
  get: (
    resourceGroupName: string,
    ruleName: string,
    options?: ScheduledQueryRulesGetOptionalParams,
  ) => Promise<ScheduledQueryRuleApiScheduledQueryRuleResource>;
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
      parameters: ScheduledQueryRuleApiScheduledQueryRuleResourcePatch,
      options?: ScheduledQueryRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, ruleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ruleName: string,
      parameters: ScheduledQueryRuleApiScheduledQueryRuleResource,
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
