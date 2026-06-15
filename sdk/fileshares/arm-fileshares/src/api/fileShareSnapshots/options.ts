// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileShareSnapshotsListByFileShareOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileShareSnapshotsDeleteFileShareSnapshotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileShareSnapshotsUpdateFileShareSnapshotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileShareSnapshotsGetFileShareSnapshotOptionalParams extends OperationOptions {}
