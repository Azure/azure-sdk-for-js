// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerFarmSiloResourcesGetServerFarmSiloOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerFarmSiloResourcesListServerFarmSilosOptionalParams extends OperationOptions {}
