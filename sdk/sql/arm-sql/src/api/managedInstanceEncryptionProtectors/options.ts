// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedInstanceEncryptionProtectorsRevalidateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstanceEncryptionProtectorsListByInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstanceEncryptionProtectorsGetOptionalParams extends OperationOptions {}
