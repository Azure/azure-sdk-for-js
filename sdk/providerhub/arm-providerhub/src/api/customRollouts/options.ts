// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomRolloutsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomRolloutsListByProviderRegistrationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomRolloutsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomRolloutsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomRolloutsGetOptionalParams extends OperationOptions {}
