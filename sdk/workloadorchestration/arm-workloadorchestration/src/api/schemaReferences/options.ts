// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemaReferencesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaReferencesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaReferencesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaReferencesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SchemaReferencesGetOptionalParams extends OperationOptions {}
