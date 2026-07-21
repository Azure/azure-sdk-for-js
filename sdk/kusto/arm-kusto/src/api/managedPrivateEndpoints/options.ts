// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedPrivateEndpointsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedPrivateEndpointsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedPrivateEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedPrivateEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedPrivateEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedPrivateEndpointsGetOptionalParams extends OperationOptions {}
