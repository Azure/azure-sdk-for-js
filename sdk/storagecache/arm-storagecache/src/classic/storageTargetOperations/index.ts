// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import {
  invalidate,
  resume,
  suspend,
  flush,
} from "../../api/storageTargetOperations/operations.js";
import type {
  StorageTargetOperationsInvalidateOptionalParams,
  StorageTargetOperationsResumeOptionalParams,
  StorageTargetOperationsSuspendOptionalParams,
  StorageTargetOperationsFlushOptionalParams,
} from "../../api/storageTargetOperations/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTargetOperations operations. */
export interface StorageTargetOperationsOperations {
  /** Invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request. */
  invalidate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsInvalidateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invalidate instead */
  beginInvalidate: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsInvalidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invalidate instead */
  beginInvalidateAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsInvalidateOptionalParams,
  ) => Promise<void>;
  /** Resumes client access to a previously suspended storage target. */
  resume: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsResumeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsResumeOptionalParams,
  ) => Promise<void>;
  /** Suspends client access to a storage target. */
  suspend: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsSuspendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use suspend instead */
  beginSuspend: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsSuspendOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use suspend instead */
  beginSuspendAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsSuspendOptionalParams,
  ) => Promise<void>;
  /** Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes. */
  flush: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsFlushOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use flush instead */
  beginFlush: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsFlushOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use flush instead */
  beginFlushAndWait: (
    resourceGroupName: string,
    cacheName: string,
    storageTargetName: string,
    options?: StorageTargetOperationsFlushOptionalParams,
  ) => Promise<void>;
}

function _getStorageTargetOperations(context: StorageCacheManagementContext) {
  return {
    invalidate: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsInvalidateOptionalParams,
    ) => invalidate(context, resourceGroupName, cacheName, storageTargetName, options),
    beginInvalidate: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsInvalidateOptionalParams,
    ) => {
      const poller = invalidate(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvalidateAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsInvalidateOptionalParams,
    ) => {
      return await invalidate(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    resume: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsResumeOptionalParams,
    ) => resume(context, resourceGroupName, cacheName, storageTargetName, options),
    beginResume: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsResumeOptionalParams,
    ) => {
      const poller = resume(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsResumeOptionalParams,
    ) => {
      return await resume(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    suspend: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, cacheName, storageTargetName, options),
    beginSuspend: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsSuspendOptionalParams,
    ) => {
      const poller = suspend(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSuspendAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsSuspendOptionalParams,
    ) => {
      return await suspend(context, resourceGroupName, cacheName, storageTargetName, options);
    },
    flush: (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsFlushOptionalParams,
    ) => flush(context, resourceGroupName, cacheName, storageTargetName, options),
    beginFlush: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsFlushOptionalParams,
    ) => {
      const poller = flush(context, resourceGroupName, cacheName, storageTargetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFlushAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      storageTargetName: string,
      options?: StorageTargetOperationsFlushOptionalParams,
    ) => {
      return await flush(context, resourceGroupName, cacheName, storageTargetName, options);
    },
  };
}

export function _getStorageTargetOperationsOperations(
  context: StorageCacheManagementContext,
): StorageTargetOperationsOperations {
  return {
    ..._getStorageTargetOperations(context),
  };
}
