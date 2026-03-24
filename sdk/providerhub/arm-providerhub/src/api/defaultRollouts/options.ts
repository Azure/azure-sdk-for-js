// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DefaultRolloutsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefaultRolloutsListByProviderRegistrationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefaultRolloutsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefaultRolloutsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DefaultRolloutsGetOptionalParams extends OperationOptions {}
