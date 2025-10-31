// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  resetCounters,
  refreshCounters,
  getCounters,
  listByLocalRulestacks,
  $delete,
  createOrUpdate,
  get,
} from "../../api/localRules/operations.js";
import type {
  LocalRulesResetCountersOptionalParams,
  LocalRulesRefreshCountersOptionalParams,
  LocalRulesGetCountersOptionalParams,
  LocalRulesListByLocalRulestacksOptionalParams,
  LocalRulesDeleteOptionalParams,
  LocalRulesCreateOrUpdateOptionalParams,
  LocalRulesGetOptionalParams,
} from "../../api/localRules/options.js";
import type { RuleCounter, RuleCounterReset, LocalRulesResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LocalRules operations. */
export interface LocalRulesOperations {
  /** Reset counters */
  resetCounters: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesResetCountersOptionalParams,
  ) => Promise<RuleCounterReset>;
  /** Refresh counters */
  refreshCounters: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesRefreshCountersOptionalParams,
  ) => Promise<void>;
  /** Get counters */
  getCounters: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesGetCountersOptionalParams,
  ) => Promise<RuleCounter>;
  /** List LocalRulesResource resources by LocalRulestacks */
  listByLocalRulestacks: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulesListByLocalRulestacksOptionalParams,
  ) => PagedAsyncIterableIterator<LocalRulesResource>;
  /** Delete a LocalRulesResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a LocalRulesResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    resource: LocalRulesResource,
    options?: LocalRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocalRulesResource>, LocalRulesResource>;
  /** Get a LocalRulesResource */
  get: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesGetOptionalParams,
  ) => Promise<LocalRulesResource>;
}

function _getLocalRules(context: PaloAltoNetworksCloudngfwContext) {
  return {
    resetCounters: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesResetCountersOptionalParams,
    ) => resetCounters(context, resourceGroupName, localRulestackName, priority, options),
    refreshCounters: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesRefreshCountersOptionalParams,
    ) => refreshCounters(context, resourceGroupName, localRulestackName, priority, options),
    getCounters: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesGetCountersOptionalParams,
    ) => getCounters(context, resourceGroupName, localRulestackName, priority, options),
    listByLocalRulestacks: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulesListByLocalRulestacksOptionalParams,
    ) => listByLocalRulestacks(context, resourceGroupName, localRulestackName, options),
    delete: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localRulestackName, priority, options),
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      resource: LocalRulesResource,
      options?: LocalRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, localRulestackName, priority, resource, options),
    get: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesGetOptionalParams,
    ) => get(context, resourceGroupName, localRulestackName, priority, options),
  };
}

export function _getLocalRulesOperations(
  context: PaloAltoNetworksCloudngfwContext,
): LocalRulesOperations {
  return {
    ..._getLocalRules(context),
  };
}
