// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityContext } from "../../api/observabilityContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/tagRules/operations.js";
import type {
  TagRulesListOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "../../api/tagRules/options.js";
import type { TagRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TagRules operations. */
export interface TagRulesOperations {
  /** List all TagRule by monitorName */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<TagRule>;
  /** Delete a TagRule */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a TagRule */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TagRule>, TagRule>;
  /** Get a TagRule */
  get: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ) => Promise<TagRule>;
}

function _getTagRules(context: ObservabilityContext) {
  return {
    list: (resourceGroupName: string, monitorName: string, options?: TagRulesListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, ruleSetName, options),
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

export function _getTagRulesOperations(context: ObservabilityContext): TagRulesOperations {
  return {
    ..._getTagRules(context),
  };
}
