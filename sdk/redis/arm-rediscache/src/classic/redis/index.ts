// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementContext } from "../../api/redisManagementContext.js";
import {
  checkNameAvailability,
  flushCache,
  exportData,
  importData,
  forceReboot,
  regenerateKey,
  listKeys,
  listUpgradeNotifications,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/redis/operations.js";
import {
  RedisCheckNameAvailabilityOptionalParams,
  RedisFlushCacheOptionalParams,
  RedisExportDataOptionalParams,
  RedisImportDataOptionalParams,
  RedisForceRebootOptionalParams,
  RedisRegenerateKeyOptionalParams,
  RedisListKeysOptionalParams,
  RedisListUpgradeNotificationsOptionalParams,
  RedisListBySubscriptionOptionalParams,
  RedisListByResourceGroupOptionalParams,
  RedisDeleteOptionalParams,
  RedisUpdateOptionalParams,
  RedisCreateOptionalParams,
  RedisGetOptionalParams,
} from "../../api/redis/options.js";
import {
  RedisResource,
  RedisAccessKeys,
  RedisCreateParameters,
  RedisUpdateParameters,
  UpgradeNotification,
  RedisRegenerateKeyParameters,
  RedisRebootParameters,
  RedisForceRebootResponse,
  ImportRDBParameters,
  ExportRDBParameters,
  OperationStatusResult,
  CheckNameAvailabilityParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Redis operations. */
export interface RedisOperations {
  /** Checks that the redis cache name is valid and is not already in use. */
  checkNameAvailability: (
    parameters: CheckNameAvailabilityParameters,
    options?: RedisCheckNameAvailabilityOptionalParams,
  ) => Promise<void>;
  /** Deletes all of the keys in a cache. */
  flushCache: (
    resourceGroupName: string,
    cacheName: string,
    options?: RedisFlushCacheOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use flushCache instead */
  beginFlushCache: (
    resourceGroupName: string,
    cacheName: string,
    options?: RedisFlushCacheOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use flushCache instead */
  beginFlushCacheAndWait: (
    resourceGroupName: string,
    cacheName: string,
    options?: RedisFlushCacheOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Export data from the redis cache to blobs in a container. */
  exportData: (
    resourceGroupName: string,
    name: string,
    parameters: ExportRDBParameters,
    options?: RedisExportDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use exportData instead */
  beginExportData: (
    resourceGroupName: string,
    name: string,
    parameters: ExportRDBParameters,
    options?: RedisExportDataOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use exportData instead */
  beginExportDataAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: ExportRDBParameters,
    options?: RedisExportDataOptionalParams,
  ) => Promise<void>;
  /** Import data into Redis cache. */
  importData: (
    resourceGroupName: string,
    name: string,
    parameters: ImportRDBParameters,
    options?: RedisImportDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use importData instead */
  beginImportData: (
    resourceGroupName: string,
    name: string,
    parameters: ImportRDBParameters,
    options?: RedisImportDataOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use importData instead */
  beginImportDataAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: ImportRDBParameters,
    options?: RedisImportDataOptionalParams,
  ) => Promise<void>;
  /** Reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. */
  forceReboot: (
    resourceGroupName: string,
    name: string,
    parameters: RedisRebootParameters,
    options?: RedisForceRebootOptionalParams,
  ) => Promise<RedisForceRebootResponse>;
  /** Regenerate Redis cache's access keys. This operation requires write permission to the cache resource. */
  regenerateKey: (
    resourceGroupName: string,
    name: string,
    parameters: RedisRegenerateKeyParameters,
    options?: RedisRegenerateKeyOptionalParams,
  ) => Promise<RedisAccessKeys>;
  /** Retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. */
  listKeys: (
    resourceGroupName: string,
    name: string,
    options?: RedisListKeysOptionalParams,
  ) => Promise<RedisAccessKeys>;
  /** [Deprecated] Gets any upgrade notifications for a Redis cache. */
  listUpgradeNotifications: (
    resourceGroupName: string,
    name: string,
    history: number,
    options?: RedisListUpgradeNotificationsOptionalParams,
  ) => PagedAsyncIterableIterator<UpgradeNotification>;
  /** Gets all Redis caches in the specified subscription. */
  listBySubscription: (
    options?: RedisListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RedisResource>;
  /** Lists all Redis caches in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RedisListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RedisResource>;
  /** Deletes a Redis cache. */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: RedisDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    name: string,
    options?: RedisDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    name: string,
    options?: RedisDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing Redis cache. */
  update: (
    resourceGroupName: string,
    name: string,
    parameters: RedisUpdateParameters,
    options?: RedisUpdateOptionalParams,
  ) => PollerLike<OperationState<RedisResource>, RedisResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    name: string,
    parameters: RedisUpdateParameters,
    options?: RedisUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RedisResource>, RedisResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: RedisUpdateParameters,
    options?: RedisUpdateOptionalParams,
  ) => Promise<RedisResource>;
  /** Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. */
  create: (
    resourceGroupName: string,
    name: string,
    parameters: RedisCreateParameters,
    options?: RedisCreateOptionalParams,
  ) => PollerLike<OperationState<RedisResource>, RedisResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    name: string,
    parameters: RedisCreateParameters,
    options?: RedisCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RedisResource>, RedisResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: RedisCreateParameters,
    options?: RedisCreateOptionalParams,
  ) => Promise<RedisResource>;
  /** Gets a Redis cache (resource description). */
  get: (
    resourceGroupName: string,
    name: string,
    options?: RedisGetOptionalParams,
  ) => Promise<RedisResource>;
}

function _getRedis(context: RedisManagementContext) {
  return {
    checkNameAvailability: (
      parameters: CheckNameAvailabilityParameters,
      options?: RedisCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, parameters, options),
    flushCache: (
      resourceGroupName: string,
      cacheName: string,
      options?: RedisFlushCacheOptionalParams,
    ) => flushCache(context, resourceGroupName, cacheName, options),
    beginFlushCache: async (
      resourceGroupName: string,
      cacheName: string,
      options?: RedisFlushCacheOptionalParams,
    ) => {
      const poller = flushCache(context, resourceGroupName, cacheName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFlushCacheAndWait: async (
      resourceGroupName: string,
      cacheName: string,
      options?: RedisFlushCacheOptionalParams,
    ) => {
      return await flushCache(context, resourceGroupName, cacheName, options);
    },
    exportData: (
      resourceGroupName: string,
      name: string,
      parameters: ExportRDBParameters,
      options?: RedisExportDataOptionalParams,
    ) => exportData(context, resourceGroupName, name, parameters, options),
    beginExportData: async (
      resourceGroupName: string,
      name: string,
      parameters: ExportRDBParameters,
      options?: RedisExportDataOptionalParams,
    ) => {
      const poller = exportData(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportDataAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: ExportRDBParameters,
      options?: RedisExportDataOptionalParams,
    ) => {
      return await exportData(context, resourceGroupName, name, parameters, options);
    },
    importData: (
      resourceGroupName: string,
      name: string,
      parameters: ImportRDBParameters,
      options?: RedisImportDataOptionalParams,
    ) => importData(context, resourceGroupName, name, parameters, options),
    beginImportData: async (
      resourceGroupName: string,
      name: string,
      parameters: ImportRDBParameters,
      options?: RedisImportDataOptionalParams,
    ) => {
      const poller = importData(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginImportDataAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: ImportRDBParameters,
      options?: RedisImportDataOptionalParams,
    ) => {
      return await importData(context, resourceGroupName, name, parameters, options);
    },
    forceReboot: (
      resourceGroupName: string,
      name: string,
      parameters: RedisRebootParameters,
      options?: RedisForceRebootOptionalParams,
    ) => forceReboot(context, resourceGroupName, name, parameters, options),
    regenerateKey: (
      resourceGroupName: string,
      name: string,
      parameters: RedisRegenerateKeyParameters,
      options?: RedisRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, name, parameters, options),
    listKeys: (resourceGroupName: string, name: string, options?: RedisListKeysOptionalParams) =>
      listKeys(context, resourceGroupName, name, options),
    listUpgradeNotifications: (
      resourceGroupName: string,
      name: string,
      history: number,
      options?: RedisListUpgradeNotificationsOptionalParams,
    ) => listUpgradeNotifications(context, resourceGroupName, name, history, options),
    listBySubscription: (options?: RedisListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RedisListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, name: string, options?: RedisDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      name: string,
      options?: RedisDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: RedisDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, name, options);
    },
    update: (
      resourceGroupName: string,
      name: string,
      parameters: RedisUpdateParameters,
      options?: RedisUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      name: string,
      parameters: RedisUpdateParameters,
      options?: RedisUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: RedisUpdateParameters,
      options?: RedisUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, name, parameters, options);
    },
    create: (
      resourceGroupName: string,
      name: string,
      parameters: RedisCreateParameters,
      options?: RedisCreateOptionalParams,
    ) => create(context, resourceGroupName, name, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      name: string,
      parameters: RedisCreateParameters,
      options?: RedisCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: RedisCreateParameters,
      options?: RedisCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, name, parameters, options);
    },
    get: (resourceGroupName: string, name: string, options?: RedisGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getRedisOperations(context: RedisManagementContext): RedisOperations {
  return {
    ..._getRedis(context),
  };
}
