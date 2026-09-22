// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecurityPartnerProvidersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecurityPartnerProvidersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecurityPartnerProvidersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SecurityPartnerProvidersUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SecurityPartnerProvidersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SecurityPartnerProvidersGetOptionalParams extends OperationOptions {}
