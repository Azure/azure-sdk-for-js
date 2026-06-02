// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SyncAgentsListLinkedDatabasesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncAgentsGenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncAgentsListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SyncAgentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncAgentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SyncAgentsGetOptionalParams extends OperationOptions {}
