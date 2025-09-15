// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DynamicSchemaVersionsListByDynamicSchemaOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DynamicSchemaVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DynamicSchemaVersionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DynamicSchemaVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DynamicSchemaVersionsGetOptionalParams extends OperationOptions {}
