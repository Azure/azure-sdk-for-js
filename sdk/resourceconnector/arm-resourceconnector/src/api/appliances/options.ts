// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AppliancesGetTelemetryConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesListOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesGetUpgradeGraphOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesListKeysOptionalParams extends OperationOptions {
  /** This sets the type of artifact being returned, when empty no artifact endpoint is returned. */
  artifactType?: string;
}

/** Optional parameters. */
export interface AppliancesListClusterUserCredentialOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppliancesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppliancesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppliancesGetOptionalParams extends OperationOptions {}
