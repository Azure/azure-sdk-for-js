// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SyncGroupsListSyncDatabaseIdsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncGroupsTriggerSyncOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncGroupsRefreshHubSchemaOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncGroupsListLogsOptionalParams extends OperationOptions {
  /** The continuation token for this operation. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface SyncGroupsListHubSchemasOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncGroupsCancelSyncOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncGroupsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncGroupsGetOptionalParams extends OperationOptions {}
