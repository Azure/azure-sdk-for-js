// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import {
  listByNewRelicMonitorResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/tagRules/operations.js";
import type {
  TagRulesListByNewRelicMonitorResourceOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesUpdateOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "../../api/tagRules/options.js";
import type { TagRule, TagRuleUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TagRules operations. */
export interface TagRulesOperations {
  /** Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring */
  listByNewRelicMonitorResource: (
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
  ) => PagedAsyncIterableIterator<TagRule>;
  /** Deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored */
  update: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    properties: TagRuleUpdate,
    options?: TagRulesUpdateOptionalParams,
  ) => Promise<TagRule>;
  /** Creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TagRule>, TagRule>;
  /** Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status */
  get: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ) => Promise<TagRule>;
}

function _getTagRules(context: NewRelicObservabilityContext) {
  return {
    listByNewRelicMonitorResource: (
      resourceGroupName: string,
      monitorName: string,
      options?: TagRulesListByNewRelicMonitorResourceOptionalParams,
    ) => listByNewRelicMonitorResource(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, ruleSetName, options),
    update: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      properties: TagRuleUpdate,
      options?: TagRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, ruleSetName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      resource: TagRule,
      options?: TagRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, ruleSetName, resource, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, ruleSetName, options),
  };
}

export function _getTagRulesOperations(context: NewRelicObservabilityContext): TagRulesOperations {
  return {
    ..._getTagRules(context),
  };
}
