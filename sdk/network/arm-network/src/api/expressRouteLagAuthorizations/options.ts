// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteLagAuthorizationsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagAuthorizationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteLagAuthorizationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteLagAuthorizationsGetOptionalParams extends OperationOptions {}
