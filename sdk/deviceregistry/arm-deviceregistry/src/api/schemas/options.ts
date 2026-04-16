// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemasListBySchemaRegistryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemasCreateOrReplaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemasGetOptionalParams extends OperationOptions {}
