// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectCatalogImageDefinitionsBuildImageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogImageDefinitionsGetErrorDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectCatalogImageDefinitionsListByProjectCatalogOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface ProjectCatalogImageDefinitionsGetByProjectCatalogOptionalParams extends OperationOptions {}
