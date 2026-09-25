// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationEntitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationEntitiesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationEntitiesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationEntitiesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
