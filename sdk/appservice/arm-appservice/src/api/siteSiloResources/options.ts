// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SiteSiloResourcesRefreshSiteSilosOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SiteSiloResourcesDeleteSiteSiloOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SiteSiloResourcesUpdateSiteSiloOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SiteSiloResourcesCreateOrUpdateSiteSiloOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SiteSiloResourcesGetSiteSiloOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SiteSiloResourcesListSiteSilosOptionalParams extends OperationOptions {}
