// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbRUMongoListForScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional force delete boolean. If this is provided as true, migration will be deleted even if active. */
  force?: boolean;
}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams extends OperationOptions {}
