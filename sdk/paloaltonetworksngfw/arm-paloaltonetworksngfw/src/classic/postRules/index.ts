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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    priority: string,
    options?: PostRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a PostRulesResource */
  createOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PostRulesResource,
    options?: PostRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PostRulesResource>, PostRulesResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PostRulesResource,
    options?: PostRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PostRulesResource>, PostRulesResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    priority: string,
    resource: PostRulesResource,
    options?: PostRulesCreateOrUpdateOptionalParams,
  ) => Promise<PostRulesResource>;
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
    beginDelete: async (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, priority, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      priority: string,
      options?: PostRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, priority, options);
    },
    createOrUpdate: (
      globalRulestackName: string,
      priority: string,
      resource: PostRulesResource,
      options?: PostRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, priority, resource, options),
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      priority: string,
      resource: PostRulesResource,
      options?: PostRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, priority, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      priority: string,
      resource: PostRulesResource,
      options?: PostRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, priority, resource, options);
    },
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
