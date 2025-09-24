// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudVmClustersListPrivateIpAddressesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudVmClustersRemoveVmsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudVmClustersAddVmsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudVmClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudVmClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudVmClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudVmClustersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudVmClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudVmClustersListBySubscriptionOptionalParams extends OperationOptions {}
