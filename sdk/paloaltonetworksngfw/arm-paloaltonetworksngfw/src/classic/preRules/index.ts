// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  resetCounters,
  refreshCounters,
  getCounters,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/preRules/operations.js";
import {
  PreRulesResetCountersOptionalParams,
  PreRulesRefreshCountersOptionalParams,
  PreRulesGetCountersOptionalParams,
  PreRulesListOptionalParams,
  PreRulesDeleteOptionalParams,
  PreRulesCreateOrUpdateOptionalParams,
  PreRulesGetOptionalParams,
} from "../../api/preRules/options.js";
import { RuleCounter, RuleCounterReset, PreRulesResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PreRules operations. */
export interface PreRulesOperations {
  /** Reset counters */
  resetCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesResetCountersOptionalParams,
  ) => Promise<RuleCounterReset>;
  /** Refresh counters */
  refreshCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesRefreshCountersOptionalParams,
  ) => Promise<void>;
  /** Get counters */
  getCounters: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesGetCountersOptionalParams,
  ) => Promise<RuleCounter>;
  /** List PreRulesResource resources by Tenant */
  list: (
    globalRulestackName: string,
    options?: PreRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<PreRulesResource>;
  /** Delete a PreRulesResource */
  delete: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a PreRulesResource */
  createOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PreRulesResource,
    options?: PreRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PreRulesResource>, PreRulesResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PreRulesResource,
    options?: PreRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PreRulesResource>, PreRulesResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    priority: string,
    resource: PreRulesResource,
    options?: PreRulesCreateOrUpdateOptionalParams,
  ) => Promise<PreRulesResource>;
  /** Get a PreRulesResource */
  get: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesGetOptionalParams,
  ) => Promise<PreRulesResource>;
}

function _getPreRules(context: PaloAltoNetworksCloudngfwContext) {
  return {
    resetCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesResetCountersOptionalParams,
    ) => resetCounters(context, globalRulestackName, priority, options),
    refreshCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesRefreshCountersOptionalParams,
    ) => refreshCounters(context, globalRulestackName, priority, options),
    getCounters: (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesGetCountersOptionalParams,
    ) => getCounters(context, globalRulestackName, priority, options),
    list: (globalRulestackName: string, options?: PreRulesListOptionalParams) =>
      list(context, globalRulestackName, options),
    delete: (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesDeleteOptionalParams,
    ) => $delete(context, globalRulestackName, priority, options),
    beginDelete: async (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, priority, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      priority: string,
      options?: PreRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, priority, options);
    },
    createOrUpdate: (
      globalRulestackName: string,
      priority: string,
      resource: PreRulesResource,
      options?: PreRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, priority, resource, options),
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      priority: string,
      resource: PreRulesResource,
      options?: PreRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, priority, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      priority: string,
      resource: PreRulesResource,
      options?: PreRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, priority, resource, options);
    },
    get: (globalRulestackName: string, priority: string, options?: PreRulesGetOptionalParams) =>
      get(context, globalRulestackName, priority, options),
  };
}

export function _getPreRulesOperations(
  context: PaloAltoNetworksCloudngfwContext,
): PreRulesOperations {
  return {
    ..._getPreRules(context),
  };
}
