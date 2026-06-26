// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  restoreDefaults,
  dnsRefresh,
  listByCache,
  $delete,
  createOrUpdate,
  get,
} from "../../api/storageTargets/operations.js";
import {
  StorageTargetsRestoreDefaultsOptionalParams,
  StorageTargetsDnsRefreshOptionalParams,
  StorageTargetsListByCacheOptionalParams,
  StorageTargetsDeleteOptionalParams,
  StorageTargetsCreateOrUpdateOptionalParams,
  StorageTargetsGetOptionalParams,
} from "../../api/storageTargets/options.js";
import { StorageTarget } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTargets operations. */
export interface StorageTargetsOperations {
  /** Tells a storage target to restore its settings to their default values. */
  restoreDefaults: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsRestoreDefaultsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreDefaults instead */
  beginRestoreDefaults: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsRestoreDefaultsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreDefaults instead */
  beginRestoreDefaultsAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsRestoreDefaultsOptionalParams,
  ) => Promise<void>;
  /** Tells a storage target to refresh its DNS information. */
  dnsRefresh: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDnsRefreshOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use dnsRefresh instead */
  beginDnsRefresh: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDnsRefreshOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use dnsRefresh instead */
  beginDnsRefreshAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDnsRefreshOptionalParams,
  ) => Promise<void>;
  /** Returns a list of Storage Targets for the specified cache. */
  listByCache: (
    resourceGroupName: string,
    cacheName: string,
    options?: StorageTargetsListByCacheOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTarget>;
  /** Removes a Storage Target from a cache. This operation is allowed at any time, but if the cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the cache is healthy again. Note that if the cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted. */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Storage Target. This operation is allowed at any time, but if the cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the cache is healthy again. */
  createOrUpdate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    storagetarget: StorageTarget,
    options?: StorageTargetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageTarget>, StorageTarget>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    storagetarget: StorageTarget,
    options?: StorageTargetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageTarget>, StorageTarget>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    storagetarget: StorageTarget,
    options?: StorageTargetsCreateOrUpdateOptionalParams,
  ) => Promise<StorageTarget>;
  /** Returns a Storage Target from a cache. */
  get: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetsGetOptionalParams,
  ) => Promise<StorageTarget>;
}

function _getStorageTargets(context: StorageCacheManagementContext) {
  return {
    restoreDefaults: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsRestoreDefaultsOptionalParams,
    ) => restoreDefaults(context, resourceGroupName, cacheName, storageTargetName, options),
    beginRestoreDefaults: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsRestoreDefaultsOptionalParams,
    ) => {
      const poller = restoreDefaults(
        context,
        resourceGroupName,
        cacheName,
        storageTargetName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreDefaultsAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsRestoreDefaultsOptionalParams,
    ) => {
      return await restoreDefaults(
        context,
        resourceGroupName,
        cacheName,
        storageTargetName,
        options,
      );
    },
    dnsRefresh: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDnsRefreshOptionalParams,
    ) => dnsRefresh(context, resourceGroupName, cacheName, storageTargetName, options),
    beginDnsRefresh: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDnsRefreshOptionalParams,
    ) => {
      const poller = dnsRefresh(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDnsRefreshAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDnsRefreshOptionalParams,
    ) => {
      return await dnsRefresh(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    listByCache: (
      resourceGroupName: string,
      cacheName: string,
      options?: StorageTargetsListByCacheOptionalParams,
    ) => listByCache(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cacheName, storageTargetName, options),
    beginDelete: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      storagetarget: StorageTarget,
      options?: StorageTargetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cacheName,
        storageTargetName,
        storagetarget,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      storagetarget: StorageTarget,
      options?: StorageTargetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        cacheName,
        storageTargetName,
        storagetarget,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      storagetarget: StorageTarget,
      options?: StorageTargetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        cacheName,
        storageTargetName,
        storagetarget,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetsGetOptionalParams,
    ) => get(context, resourceGroupName, cacheName, storageTargetName, options),
  };
}

export function _getStorageTargetsOperations(
  context: StorageCacheManagementContext,
): StorageTargetsOperations {
  return {
    ..._getStorageTargets(context),
  };
}
