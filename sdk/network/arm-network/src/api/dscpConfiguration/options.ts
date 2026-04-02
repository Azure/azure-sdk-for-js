// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscpConfigurationListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscpConfigurationListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscpConfigurationDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DscpConfigurationCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DscpConfigurationGetOptionalParams extends OperationOptions {}
