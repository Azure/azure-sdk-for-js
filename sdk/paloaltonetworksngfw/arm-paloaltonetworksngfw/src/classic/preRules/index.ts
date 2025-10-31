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
} from "../../api/preRules/operations.js";
import type {
  PreRulesResetCountersOptionalParams,
  PreRulesRefreshCountersOptionalParams,
  PreRulesGetCountersOptionalParams,
  PreRulesListOptionalParams,
  PreRulesDeleteOptionalParams,
  PreRulesCreateOrUpdateOptionalParams,
  PreRulesGetOptionalParams,
} from "../../api/preRules/options.js";
import type { RuleCounter, RuleCounterReset, PreRulesResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    priority: string,
    options?: PreRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PreRulesResource */
  createOrUpdate: (
    globalRulestackName: string,
    priority: string,
    resource: PreRulesResource,
    options?: PreRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PreRulesResource>, PreRulesResource>;
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
    createOrUpdate: (
      globalRulestackName: string,
      priority: string,
      resource: PreRulesResource,
      options?: PreRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, priority, resource, options),
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
