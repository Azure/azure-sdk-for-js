// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedHsmsCheckMhsmNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedHsmsListDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedHsmsPurgeDeletedOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedHsmsGetDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedHsmsListBySubscriptionOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface ManagedHsmsListByResourceGroupOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface ManagedHsmsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedHsmsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedHsmsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedHsmsGetOptionalParams extends OperationOptions {}
