// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerConfigurationOptionsListByManagedInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerConfigurationOptionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerConfigurationOptionsGetOptionalParams extends OperationOptions {}
