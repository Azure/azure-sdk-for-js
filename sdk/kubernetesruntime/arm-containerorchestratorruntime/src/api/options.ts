// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageClassGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageClassCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageClassUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageClassDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageClassListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LoadBalancersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LoadBalancersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BgpPeersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BgpPeersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BgpPeersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BgpPeersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesListOptionalParams extends OperationOptions {}
