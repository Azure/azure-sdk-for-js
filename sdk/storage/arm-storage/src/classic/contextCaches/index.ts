// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/contextCaches/operations.js";
import type {
  ContextCachesListBySubscriptionOptionalParams,
  ContextCachesListByResourceGroupOptionalParams,
  ContextCachesDeleteOptionalParams,
  ContextCachesUpdateOptionalParams,
  ContextCachesCreateOrUpdateOptionalParams,
  ContextCachesGetOptionalParams,
} from "../../api/contextCaches/options.js";
import type { ContextCache, ContextCacheUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContextCaches operations. */
export interface ContextCachesOperations {
  /** List Context Caches by subscription. */
  listBySubscription: (
    options?: ContextCachesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ContextCache>;
  /** List Context Caches by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContextCachesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContextCache>;
  /** Delete a Context Cache. */
  delete: (
    resourceGroupName: string,
    contextCacheName: string,
    options?: ContextCachesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    contextCacheName: string,
    options?: ContextCachesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    options?: ContextCachesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Context Cache. */
  update: (
    resourceGroupName: string,
    contextCacheName: string,
    properties: ContextCacheUpdate,
    options?: ContextCachesUpdateOptionalParams,
  ) => PollerLike<OperationState<ContextCache>, ContextCache>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    properties: ContextCacheUpdate,
    options?: ContextCachesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContextCache>, ContextCache>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    properties: ContextCacheUpdate,
    options?: ContextCachesUpdateOptionalParams,
  ) => Promise<ContextCache>;
  /** Create or update a Context Cache. */
  createOrUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    resource: ContextCache,
    options?: ContextCachesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ContextCache>, ContextCache>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    contextCacheName: string,
    resource: ContextCache,
    options?: ContextCachesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContextCache>, ContextCache>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    contextCacheName: string,
    resource: ContextCache,
    options?: ContextCachesCreateOrUpdateOptionalParams,
  ) => Promise<ContextCache>;
  /** Get a Context Cache. */
  get: (
    resourceGroupName: string,
    contextCacheName: string,
    options?: ContextCachesGetOptionalParams,
  ) => Promise<ContextCache>;
}

function _getContextCaches(context: StorageManagementContext) {
  return {
    listBySubscription: (options?: ContextCachesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContextCachesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      contextCacheName: string,
      options?: ContextCachesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextCacheName, options),
    beginDelete: async (
      resourceGroupName: string,
      contextCacheName: string,
      options?: ContextCachesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, contextCacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      options?: ContextCachesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, contextCacheName, options);
    },
    update: (
      resourceGroupName: string,
      contextCacheName: string,
      properties: ContextCacheUpdate,
      options?: ContextCachesUpdateOptionalParams,
    ) => update(context, resourceGroupName, contextCacheName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      contextCacheName: string,
      properties: ContextCacheUpdate,
      options?: ContextCachesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, contextCacheName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      properties: ContextCacheUpdate,
      options?: ContextCachesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, contextCacheName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      contextCacheName: string,
      resource: ContextCache,
      options?: ContextCachesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, contextCacheName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      contextCacheName: string,
      resource: ContextCache,
      options?: ContextCachesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        contextCacheName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      contextCacheName: string,
      resource: ContextCache,
      options?: ContextCachesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, contextCacheName, resource, options);
    },
    get: (
      resourceGroupName: string,
      contextCacheName: string,
      options?: ContextCachesGetOptionalParams,
    ) => get(context, resourceGroupName, contextCacheName, options),
  };
}

export function _getContextCachesOperations(
  context: StorageManagementContext,
): ContextCachesOperations {
  return {
    ..._getContextCaches(context),
  };
}
