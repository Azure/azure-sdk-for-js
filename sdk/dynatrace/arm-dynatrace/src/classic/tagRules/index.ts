// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DynatraceObservabilityContext } from "../../api/dynatraceObservabilityContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/tagRules/operations.js";
import type {
  TagRulesListOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "../../api/tagRules/options.js";
import type { TagRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a TagRule */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TagRule>, TagRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TagRule>, TagRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    resource: TagRule,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => Promise<TagRule>;
  /** Get a TagRule */
  get: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ) => Promise<TagRule>;
}

function _getTagRules(context: DynatraceObservabilityContext) {
  return {
    list: (resourceGroupName: string, monitorName: string, options?: TagRulesListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, ruleSetName, options),
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, ruleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, ruleSetName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      resource: TagRule,
      options?: TagRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, ruleSetName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      resource: TagRule,
      options?: TagRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        monitorName,
        ruleSetName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      resource: TagRule,
      options?: TagRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        monitorName,
        ruleSetName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, ruleSetName, options),
  };
}

export function _getTagRulesOperations(context: DynatraceObservabilityContext): TagRulesOperations {
  return {
    ..._getTagRules(context),
  };
}
