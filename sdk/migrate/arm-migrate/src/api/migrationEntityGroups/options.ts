// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationEntityGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationEntityGroupsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationEntityGroupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationEntityGroupsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
