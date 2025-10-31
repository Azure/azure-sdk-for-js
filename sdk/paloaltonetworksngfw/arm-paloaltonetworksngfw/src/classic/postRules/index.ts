// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  resetCounters,
  refreshCounters,
  getCounters,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/postRules/operations.js";
import type {
  PostRulesResetCountersOptionalParams,
  PostRulesRefreshCountersOptionalParams,
  PostRulesGetCountersOptionalParams,
  PostRulesListOptionalParams,
  PostRulesDeleteOptionalParams,
  PostRulesCreateOrUpdateOptionalParams,
  PostRulesGetOptionalParams,
} from "../../api/postRules/options.js";
import type { PostRulesResource, RuleCounter, RuleCounterReset } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PostRules operations. */
export interface PostRulesOperations {
  /** Reset counters */
  resetCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesResetCountersOptionalParams,
  ) => Promise<RuleCounterReset>;
  /** Refresh counters */
  refreshCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesRefreshCountersOptionalParams,
  ) => Promise<void>;
  /** Get counters */
  getCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesGetCountersOptionalParams,
  ) => Promise<RuleCounter>;
  /** List PostRulesResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: PostRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<PostRulesResource>;
  /** Delete a PostRulesResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PostRulesResource */
  createOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PostRulesResource,
    options?: PostRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PostRulesResource>, PostRulesResource>;
  /** Get a PostRulesResource */
  get: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesGetOptionalParams,
  ) => Promise<PostRulesResource>;
}

function _getPostRules(context: PaloAltoNetworksCloudngfwContext) {
  return {
    resetCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesResetCountersOptionalParams,
    ) => resetCounters(context, globalRulestackName, priority, options),
    refreshCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesRefreshCountersOptionalParams,
    ) => refreshCounters(context, globalRulestackName, priority, options),
    getCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesGetCountersOptionalParams,
    ) => getCounters(context, globalRulestackName, priority, options),
    list: (globalRulestackName: string, options?: PostRulesListOptionalParams) =>
      list(context, globalRulestackName, options),
    delete: (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesDeleteOptionalParams,
    ) => $delete(context, globalRulestackName, priority, options),
    createOrUpdate: (
      globalRulestackName: string,
      priority: string,
      resource: PostRulesResource,
      options?: PostRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, priority, resource, options),
    get: (globalRulestackName: string, priority: string, options?: PostRulesGetOptionalParams) =>
      get(context, globalRulestackName, priority, options),
  };
}

export function _getPostRulesOperations(
  context: PaloAltoNetworksCloudngfwContext,
): PostRulesOperations {
  return {
    ..._getPostRules(context),
  };
}
