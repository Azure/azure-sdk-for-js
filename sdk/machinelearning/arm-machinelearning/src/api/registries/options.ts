// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistriesRemoveRegionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistriesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistriesGetOptionalParams extends OperationOptions {}
