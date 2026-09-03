// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams extends OperationOptions {}
