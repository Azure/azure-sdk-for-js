// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SitesByServiceGroupDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesByServiceGroupUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesByServiceGroupCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SitesByServiceGroupGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SitesByServiceGroupListByServiceGroupOptionalParams extends OperationOptions {}
