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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    options?: LocalRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a LocalRulesResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    resource: LocalRulesResource,
    options?: LocalRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocalRulesResource>, LocalRulesResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    resource: LocalRulesResource,
    options?: LocalRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LocalRulesResource>, LocalRulesResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    localRulestackName: string,
    priority: string,
    resource: LocalRulesResource,
    options?: LocalRulesCreateOrUpdateOptionalParams,
  ) => Promise<LocalRulesResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, localRulestackName, priority, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      options?: LocalRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, localRulestackName, priority, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      resource: LocalRulesResource,
      options?: LocalRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, localRulestackName, priority, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      resource: LocalRulesResource,
      options?: LocalRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        priority,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      localRulestackName: string,
      priority: string,
      resource: LocalRulesResource,
      options?: LocalRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        localRulestackName,
        priority,
        resource,
        options,
      );
    },
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
