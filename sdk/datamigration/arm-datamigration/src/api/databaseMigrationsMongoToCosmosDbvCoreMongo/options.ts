// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional force delete boolean. If this is provided as true, migration will be deleted even if active. */
  force?: boolean;
}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams extends OperationOptions {}
