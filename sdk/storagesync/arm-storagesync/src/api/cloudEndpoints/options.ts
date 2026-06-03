// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudEndpointsTriggerChangeDetectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsPostRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsRestoreHeartbeatOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudEndpointsPreRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsPostBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsPreBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsListBySyncGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudEndpointsGetOptionalParams extends OperationOptions {}
