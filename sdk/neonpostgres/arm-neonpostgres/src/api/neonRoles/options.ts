// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeonRolesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeonRolesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeonRolesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NeonRolesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NeonRolesGetOptionalParams extends OperationOptions {}
