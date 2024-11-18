// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeidServicesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeidServicesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DeidServicesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DeidServicesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeidServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeidServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionsCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsListByDeidServiceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinksListByDeidServiceOptionalParams
  extends OperationOptions {}
