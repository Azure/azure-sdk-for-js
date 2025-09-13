// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemasListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasRemoveVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasCreateVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemasDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemasUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemasGetOptionalParams extends OperationOptions {}
