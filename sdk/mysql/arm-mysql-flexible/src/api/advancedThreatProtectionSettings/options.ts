// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdvancedThreatProtectionSettingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AdvancedThreatProtectionSettingsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AdvancedThreatProtectionSettingsUpdatePutOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AdvancedThreatProtectionSettingsGetOptionalParams extends OperationOptions {}
