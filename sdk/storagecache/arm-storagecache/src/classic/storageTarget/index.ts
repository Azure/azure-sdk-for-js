// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { invalidate, resume, suspend, flush } from "../../api/storageTarget/operations.js";
import type {
  StorageTargetInvalidateOptionalParams,
  StorageTargetResumeOptionalParams,
  StorageTargetSuspendOptionalParams,
  StorageTargetFlushOptionalParams,
} from "../../api/storageTarget/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTarget operations. */
export interface StorageTargetOperations {
  /** Invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request. */
  invalidate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetInvalidateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invalidate instead */
  beginInvalidate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetInvalidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invalidate instead */
  beginInvalidateAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetInvalidateOptionalParams,
  ) => Promise<void>;
  /** Resumes client access to a previously suspended storage target. */
  resume: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetResumeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetResumeOptionalParams,
  ) => Promise<void>;
  /** Suspends client access to a storage target. */
  suspend: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetSuspendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use suspend instead */
  beginSuspend: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetSuspendOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use suspend instead */
  beginSuspendAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetSuspendOptionalParams,
  ) => Promise<void>;
  /** Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes. */
  flush: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetFlushOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use flush instead */
  beginFlush: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetFlushOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use flush instead */
  beginFlushAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetFlushOptionalParams,
  ) => Promise<void>;
}

function _getStorageTarget(context: StorageCacheManagementContext) {
  return {
    invalidate: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetInvalidateOptionalParams,
    ) => invalidate(context, resourceGroupName, cacheName, storageTargetName, options),
    beginInvalidate: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetInvalidateOptionalParams,
    ) => {
      const poller = invalidate(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvalidateAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetInvalidateOptionalParams,
    ) => {
      return await invalidate(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    resume: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetResumeOptionalParams,
    ) => resume(context, resourceGroupName, cacheName, storageTargetName, options),
    beginResume: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetResumeOptionalParams,
    ) => {
      const poller = resume(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetResumeOptionalParams,
    ) => {
      return await resume(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    suspend: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, cacheName, storageTargetName, options),
    beginSuspend: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetSuspendOptionalParams,
    ) => {
      const poller = suspend(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSuspendAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetSuspendOptionalParams,
    ) => {
      return await suspend(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    flush: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetFlushOptionalParams,
    ) => flush(context, resourceGroupName, cacheName, storageTargetName, options),
    beginFlush: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetFlushOptionalParams,
    ) => {
      const poller = flush(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFlushAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetFlushOptionalParams,
    ) => {
      return await flush(context, resourceGroupName, cacheName, storageTargetName, options);
    },
  };
}

export function _getStorageTargetOperations(
  context: StorageCacheManagementContext,
): StorageTargetOperations {
  return {
    ..._getStorageTarget(context),
  };
}
