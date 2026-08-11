// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkServicesListPrivateEndpointConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesDeletePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkServicesUpdatePrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesGetPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

/** Optional parameters. */
export interface PrivateLinkServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinkServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkServicesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
