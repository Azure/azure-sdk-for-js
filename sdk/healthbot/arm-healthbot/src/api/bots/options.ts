// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BotsRegenerateApiJwtSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BotsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BotsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BotsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BotsGetOptionalParams extends OperationOptions {}
