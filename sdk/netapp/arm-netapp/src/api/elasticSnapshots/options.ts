// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ElasticSnapshotsListByElasticVolumeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ElasticSnapshotsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticSnapshotsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticSnapshotsGetOptionalParams extends OperationOptions {}
