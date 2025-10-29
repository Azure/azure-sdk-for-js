// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
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
import type {
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
import type {
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
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** Export data from the redis cache to blobs in a container. */
  exportData: (
    resourceGroupName: string,
    name: string,
    parameters: ExportRDBParameters,
    options?: RedisExportDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Import data into Redis cache. */
  importData: (
    resourceGroupName: string,
    name: string,
    parameters: ImportRDBParameters,
    options?: RedisImportDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: RedisDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an existing Redis cache. */
  update: (
    resourceGroupName: string,
    name: string,
    parameters: RedisUpdateParameters,
    options?: RedisUpdateOptionalParams,
  ) => PollerLike<OperationState<RedisResource>, RedisResource>;
  /** Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. */
  create: (
    resourceGroupName: string,
    name: string,
    parameters: RedisCreateParameters,
    options?: RedisCreateOptionalParams,
  ) => PollerLike<OperationState<RedisResource>, RedisResource>;
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
    exportData: (
      resourceGroupName: string,
      name: string,
      parameters: ExportRDBParameters,
      options?: RedisExportDataOptionalParams,
    ) => exportData(context, resourceGroupName, name, parameters, options),
    importData: (
      resourceGroupName: string,
      name: string,
      parameters: ImportRDBParameters,
      options?: RedisImportDataOptionalParams,
    ) => importData(context, resourceGroupName, name, parameters, options),
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
    update: (
      resourceGroupName: string,
      name: string,
      parameters: RedisUpdateParameters,
      options?: RedisUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, parameters, options),
    create: (
      resourceGroupName: string,
      name: string,
      parameters: RedisCreateParameters,
      options?: RedisCreateOptionalParams,
    ) => create(context, resourceGroupName, name, parameters, options),
    get: (resourceGroupName: string, name: string, options?: RedisGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getRedisOperations(context: RedisManagementContext): RedisOperations {
  return {
    ..._getRedis(context),
  };
}
