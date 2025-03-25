// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PublicCloudConnectorsTestPermissionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicCloudConnectorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicCloudConnectorsGetOptionalParams extends OperationOptions {}
