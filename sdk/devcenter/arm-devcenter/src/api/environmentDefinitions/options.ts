// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnvironmentDefinitionsGetErrorDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentDefinitionsListByCatalogOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface EnvironmentDefinitionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentDefinitionsListByProjectCatalogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentDefinitionsGetByProjectCatalogOptionalParams extends OperationOptions {}
