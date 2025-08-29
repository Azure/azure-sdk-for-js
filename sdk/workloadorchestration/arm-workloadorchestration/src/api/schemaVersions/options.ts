// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemaVersionsListBySchemaOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaVersionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaVersionsGetOptionalParams extends OperationOptions {}
