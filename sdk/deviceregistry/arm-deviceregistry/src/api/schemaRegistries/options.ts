// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemaRegistriesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaRegistriesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaRegistriesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaRegistriesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaRegistriesCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaRegistriesGetOptionalParams extends OperationOptions {}
