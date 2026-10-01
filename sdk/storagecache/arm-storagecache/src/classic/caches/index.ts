// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  spaceAllocation,
  upgradeFirmware,
  resumePrimingJob,
  pausePrimingJob,
  stopPrimingJob,
  startPrimingJob,
  stop,
  start,
  flush,
  debugInfo,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/caches/operations.js";
import type {
  CachesSpaceAllocationOptionalParams,
  CachesUpgradeFirmwareOptionalParams,
  CachesResumePrimingJobOptionalParams,
  CachesPausePrimingJobOptionalParams,
  CachesStopPrimingJobOptionalParams,
  CachesStartPrimingJobOptionalParams,
  CachesStopOptionalParams,
  CachesStartOptionalParams,
  CachesFlushOptionalParams,
  CachesDebugInfoOptionalParams,
  CachesListOptionalParams,
  CachesListByResourceGroupOptionalParams,
  CachesDeleteOptionalParams,
  CachesUpdateOptionalParams,
  CachesCreateOrUpdateOptionalParams,
  CachesGetOptionalParams,
} from "../../api/caches/options.js";
import type { Cache } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Caches operations. */
export interface CachesOperations {
  /** Update cache space allocation. */
  spaceAllocation: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesSpaceAllocationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use spaceAllocation instead */
  beginSpaceAllocation: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesSpaceAllocationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use spaceAllocation instead */
  beginSpaceAllocationAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesSpaceAllocationOptionalParams,
  ) => Promise<void>;
  /** Upgrade a cache's firmware if a new version is available. Otherwise, this operation has no effect. */
  upgradeFirmware: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpgradeFirmwareOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgradeFirmware instead */
  beginUpgradeFirmware: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpgradeFirmwareOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgradeFirmware instead */
  beginUpgradeFirmwareAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpgradeFirmwareOptionalParams,
  ) => Promise<void>;
  /** Resumes a paused priming job. */
  resumePrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesResumePrimingJobOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resumePrimingJob instead */
  beginResumePrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesResumePrimingJobOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resumePrimingJob instead */
  beginResumePrimingJobAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesResumePrimingJobOptionalParams,
  ) => Promise<void>;
  /** Schedule a priming job to be paused. */
  pausePrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesPausePrimingJobOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use pausePrimingJob instead */
  beginPausePrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesPausePrimingJobOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use pausePrimingJob instead */
  beginPausePrimingJobAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesPausePrimingJobOptionalParams,
  ) => Promise<void>;
  /** Schedule a priming job for deletion. */
  stopPrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopPrimingJobOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stopPrimingJob instead */
  beginStopPrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopPrimingJobOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stopPrimingJob instead */
  beginStopPrimingJobAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopPrimingJobOptionalParams,
  ) => Promise<void>;
  /** Create a priming job. This operation is only allowed when the cache is healthy. */
  startPrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartPrimingJobOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startPrimingJob instead */
  beginStartPrimingJob: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartPrimingJobOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startPrimingJob instead */
  beginStartPrimingJobAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartPrimingJobOptionalParams,
  ) => Promise<void>;
  /** Tells an Active cache to transition to Stopped state. */
  stop: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStopOptionalParams,
  ) => Promise<void>;
  /** Tells a Stopped state cache to transition to Active state. */
  start: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesStartOptionalParams,
  ) => Promise<void>;
  /** Tells a cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete. */
  flush: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesFlushOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use flush instead */
  beginFlush: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesFlushOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use flush instead */
  beginFlushAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesFlushOptionalParams,
  ) => Promise<void>;
  /** Tells a cache to write generate debug info for support to process. */
  debugInfo: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDebugInfoOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use debugInfo instead */
  beginDebugInfo: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDebugInfoOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use debugInfo instead */
  beginDebugInfoAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDebugInfoOptionalParams,
  ) => Promise<void>;
  /** Returns all caches the user has access to under a subscription. */
  list: (options?: CachesListOptionalParams) => PagedAsyncIterableIterator<Cache>;
  /** Returns all caches the user has access to under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CachesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cache>;
  /** Schedules a cache for deletion. */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a cache instance. */
  update: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpdateOptionalParams,
  ) => PollerLike<OperationState<Cache>, Cache>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cache>, Cache>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesUpdateOptionalParams,
  ) => Promise<Cache>;
  /** Create or update a cache. */
  createOrUpdate: (
    resourceGroupName: string,
    cacheName: string,
    cache: Cache,
    options?: CachesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cache>, Cache>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    cacheName: string,
    cache: Cache,
    options?: CachesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cache>, Cache>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    cacheName: string,
    cache: Cache,
    options?: CachesCreateOrUpdateOptionalParams,
  ) => Promise<Cache>;
  /** Returns a cache. */
  get: (
    resourceGroupName: string,
    cacheName: string,
    options?: CachesGetOptionalParams,
  ) => Promise<Cache>;
}

function _getCaches(context: StorageCacheManagementContext) {
  return {
    spaceAllocation: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesSpaceAllocationOptionalParams,
    ) => spaceAllocation(context, resourceGroupName, cacheName, options),
    beginSpaceAllocation: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesSpaceAllocationOptionalParams,
    ) => {
      const poller = spaceAllocation(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSpaceAllocationAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesSpaceAllocationOptionalParams,
    ) => {
      return await spaceAllocation(context, resourceGroupName, cacheName, options);
    },
    upgradeFirmware: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesUpgradeFirmwareOptionalParams,
    ) => upgradeFirmware(context, resourceGroupName, cacheName, options),
    beginUpgradeFirmware: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesUpgradeFirmwareOptionalParams,
    ) => {
      const poller = upgradeFirmware(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeFirmwareAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesUpgradeFirmwareOptionalParams,
    ) => {
      return await upgradeFirmware(context, resourceGroupName, cacheName, options);
    },
    resumePrimingJob: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesResumePrimingJobOptionalParams,
    ) => resumePrimingJob(context, resourceGroupName, cacheName, options),
    beginResumePrimingJob: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesResumePrimingJobOptionalParams,
    ) => {
      const poller = resumePrimingJob(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumePrimingJobAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesResumePrimingJobOptionalParams,
    ) => {
      return await resumePrimingJob(context, resourceGroupName, cacheName, options);
    },
    pausePrimingJob: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesPausePrimingJobOptionalParams,
    ) => pausePrimingJob(context, resourceGroupName, cacheName, options),
    beginPausePrimingJob: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesPausePrimingJobOptionalParams,
    ) => {
      const poller = pausePrimingJob(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPausePrimingJobAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesPausePrimingJobOptionalParams,
    ) => {
      return await pausePrimingJob(context, resourceGroupName, cacheName, options);
    },
    stopPrimingJob: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStopPrimingJobOptionalParams,
    ) => stopPrimingJob(context, resourceGroupName, cacheName, options),
    beginStopPrimingJob: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStopPrimingJobOptionalParams,
    ) => {
      const poller = stopPrimingJob(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopPrimingJobAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStopPrimingJobOptionalParams,
    ) => {
      return await stopPrimingJob(context, resourceGroupName, cacheName, options);
    },
    startPrimingJob: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStartPrimingJobOptionalParams,
    ) => startPrimingJob(context, resourceGroupName, cacheName, options),
    beginStartPrimingJob: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStartPrimingJobOptionalParams,
    ) => {
      const poller = startPrimingJob(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartPrimingJobAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStartPrimingJobOptionalParams,
    ) => {
      return await startPrimingJob(context, resourceGroupName, cacheName, options);
    },
    stop: (resourceGroupName: string, cacheName: string, options?: CachesStopOptionalParams) =>
      stop(context, resourceGroupName, cacheName, options),
    beginStop: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, cacheName, options);
    },
    start: (resourceGroupName: string, cacheName: string, options?: CachesStartOptionalParams) =>
      start(context, resourceGroupName, cacheName, options),
    beginStart: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, cacheName, options);
    },
    flush: (resourceGroupName: string, cacheName: string, options?: CachesFlushOptionalParams) =>
      flush(context, resourceGroupName, cacheName, options),
    beginFlush: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesFlushOptionalParams,
    ) => {
      const poller = flush(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFlushAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesFlushOptionalParams,
    ) => {
      return await flush(context, resourceGroupName, cacheName, options);
    },
    debugInfo: (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesDebugInfoOptionalParams,
    ) => debugInfo(context, resourceGroupName, cacheName, options),
    beginDebugInfo: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesDebugInfoOptionalParams,
    ) => {
      const poller = debugInfo(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDebugInfoAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesDebugInfoOptionalParams,
    ) => {
      return await debugInfo(context, resourceGroupName, cacheName, options);
    },
    list: (options?: CachesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CachesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, cacheName: string, options?: CachesDeleteOptionalParams) =>
      $delete(context, resourceGroupName, cacheName, options),
    beginDelete: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, cacheName, options);
    },
    update: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) =>
      update(context, resourceGroupName, cacheName, options),
    beginUpdate: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: CachesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, cacheName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      cacheName: string,
      cache: Cache,
      options?: CachesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cacheName, cache, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      cacheName: string,
      cache: Cache,
      options?: CachesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, cacheName, cache, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      cache: Cache,
      options?: CachesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, cacheName, cache, options);
    },
    get: (resourceGroupName: string, cacheName: string, options?: CachesGetOptionalParams) =>
      get(context, resourceGroupName, cacheName, options),
  };
}

export function _getCachesOperations(context: StorageCacheManagementContext): CachesOperations {
  return {
    ..._getCaches(context),
  };
}
