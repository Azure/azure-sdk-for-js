// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SitesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SitesGetOptionalParams extends OperationOptions {}
