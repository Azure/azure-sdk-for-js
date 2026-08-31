// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/usagePlans/operations.js";
import type {
  UsagePlansListBySubscriptionOptionalParams,
  UsagePlansListByResourceGroupOptionalParams,
  UsagePlansDeleteOptionalParams,
  UsagePlansUpdateOptionalParams,
  UsagePlansCreateOrUpdateOptionalParams,
  UsagePlansGetOptionalParams,
} from "../../api/usagePlans/options.js";
import type { UsagePlan, UsagePlanTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UsagePlans operations. */
export interface UsagePlansOperations {
  /** List UsagePlan resources by subscription ID */
  listBySubscription: (
    options?: UsagePlansListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<UsagePlan>;
  /** List UsagePlan resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: UsagePlansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<UsagePlan>;
  /** Delete a UsagePlan */
  delete: (
    resourceGroupName: string,
    usagePlanName: string,
    options?: UsagePlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    usagePlanName: string,
    options?: UsagePlansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    usagePlanName: string,
    options?: UsagePlansDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a UsagePlan */
  update: (
    resourceGroupName: string,
    usagePlanName: string,
    properties: UsagePlanTagsUpdate,
    options?: UsagePlansUpdateOptionalParams,
  ) => PollerLike<OperationState<UsagePlan>, UsagePlan>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    usagePlanName: string,
    properties: UsagePlanTagsUpdate,
    options?: UsagePlansUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<UsagePlan>, UsagePlan>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    usagePlanName: string,
    properties: UsagePlanTagsUpdate,
    options?: UsagePlansUpdateOptionalParams,
  ) => Promise<UsagePlan>;
  /** Create a UsagePlan */
  createOrUpdate: (
    resourceGroupName: string,
    usagePlanName: string,
    resource: UsagePlan,
    options?: UsagePlansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<UsagePlan>, UsagePlan>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    usagePlanName: string,
    resource: UsagePlan,
    options?: UsagePlansCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<UsagePlan>, UsagePlan>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    usagePlanName: string,
    resource: UsagePlan,
    options?: UsagePlansCreateOrUpdateOptionalParams,
  ) => Promise<UsagePlan>;
  /** Get a UsagePlan */
  get: (
    resourceGroupName: string,
    usagePlanName: string,
    options?: UsagePlansGetOptionalParams,
  ) => Promise<UsagePlan>;
}

function _getUsagePlans(context: AzureResilienceManagementContext) {
  return {
    listBySubscription: (options?: UsagePlansListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: UsagePlansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      usagePlanName: string,
      options?: UsagePlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, usagePlanName, options),
    beginDelete: async (
      resourceGroupName: string,
      usagePlanName: string,
      options?: UsagePlansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, usagePlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      usagePlanName: string,
      options?: UsagePlansDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, usagePlanName, options);
    },
    update: (
      resourceGroupName: string,
      usagePlanName: string,
      properties: UsagePlanTagsUpdate,
      options?: UsagePlansUpdateOptionalParams,
    ) => update(context, resourceGroupName, usagePlanName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      usagePlanName: string,
      properties: UsagePlanTagsUpdate,
      options?: UsagePlansUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, usagePlanName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      usagePlanName: string,
      properties: UsagePlanTagsUpdate,
      options?: UsagePlansUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, usagePlanName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      usagePlanName: string,
      resource: UsagePlan,
      options?: UsagePlansCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, usagePlanName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      usagePlanName: string,
      resource: UsagePlan,
      options?: UsagePlansCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, usagePlanName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      usagePlanName: string,
      resource: UsagePlan,
      options?: UsagePlansCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, usagePlanName, resource, options);
    },
    get: (
      resourceGroupName: string,
      usagePlanName: string,
      options?: UsagePlansGetOptionalParams,
    ) => get(context, resourceGroupName, usagePlanName, options),
  };
}

export function _getUsagePlansOperations(
  context: AzureResilienceManagementContext,
): UsagePlansOperations {
  return {
    ..._getUsagePlans(context),
  };
}
