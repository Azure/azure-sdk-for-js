// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageSyncServiceUpdateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageSyncServicesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageSyncServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageSyncServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageSyncServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageSyncServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Storage Sync Service resource. */
  parameters?: StorageSyncServiceUpdateParameters;
}

/** Optional parameters. */
export interface StorageSyncServicesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageSyncServicesGetOptionalParams extends OperationOptions {}
