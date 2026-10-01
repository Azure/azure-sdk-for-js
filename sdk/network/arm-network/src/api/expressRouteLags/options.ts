// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteLagsMembersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsMembersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsLinksListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsLinksGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsGenerateLoaOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteLagsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteLagsGetOptionalParams extends OperationOptions {}
