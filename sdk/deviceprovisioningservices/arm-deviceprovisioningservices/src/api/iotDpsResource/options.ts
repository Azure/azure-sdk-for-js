// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListPrivateEndpointConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceDeletePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotDpsResourceGetPrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListKeysForKeyNameOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListValidSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotDpsResourceUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotDpsResourceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotDpsResourceGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotDpsResourceGetOperationResultOptionalParams extends OperationOptions {}
