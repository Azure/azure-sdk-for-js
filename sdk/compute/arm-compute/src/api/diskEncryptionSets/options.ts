// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiskEncryptionSetsListAssociatedResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskEncryptionSetsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskEncryptionSetsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskEncryptionSetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskEncryptionSetsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskEncryptionSetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskEncryptionSetsGetOptionalParams extends OperationOptions {}
