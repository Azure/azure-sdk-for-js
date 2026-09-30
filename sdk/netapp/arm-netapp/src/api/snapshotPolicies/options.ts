// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SnapshotPoliciesListVolumesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SnapshotPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SnapshotPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SnapshotPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SnapshotPoliciesCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SnapshotPoliciesGetOptionalParams extends OperationOptions {}
