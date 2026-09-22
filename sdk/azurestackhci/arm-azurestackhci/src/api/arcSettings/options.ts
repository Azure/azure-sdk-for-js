// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ArcSettingsInitializeDisableProcessOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcSettingsReconcileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcSettingsCreateIdentityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcSettingsGeneratePasswordOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcSettingsListByClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcSettingsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ArcSettingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcSettingsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ArcSettingsGetOptionalParams extends OperationOptions {}
