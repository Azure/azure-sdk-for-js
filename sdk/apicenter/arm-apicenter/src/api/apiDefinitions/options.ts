// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiDefinitionsExportSpecificationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiDefinitionsImportSpecificationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiDefinitionsListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface ApiDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiDefinitionsHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiDefinitionsGetOptionalParams extends OperationOptions {}
