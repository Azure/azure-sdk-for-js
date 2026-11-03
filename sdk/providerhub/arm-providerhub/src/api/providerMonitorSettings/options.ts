// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProviderMonitorSettingsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderMonitorSettingsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderMonitorSettingsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderMonitorSettingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderMonitorSettingsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProviderMonitorSettingsGetOptionalParams extends OperationOptions {}
