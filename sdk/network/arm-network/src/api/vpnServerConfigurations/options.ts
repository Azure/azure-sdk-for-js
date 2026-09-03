// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VpnServerConfigurationsListRadiusSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnServerConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnServerConfigurationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnServerConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnServerConfigurationsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnServerConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnServerConfigurationsGetOptionalParams extends OperationOptions {}
