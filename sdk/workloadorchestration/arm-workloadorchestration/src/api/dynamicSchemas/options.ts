// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DynamicSchemasListBySchemaOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DynamicSchemasDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DynamicSchemasUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DynamicSchemasCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DynamicSchemasGetOptionalParams extends OperationOptions {}
