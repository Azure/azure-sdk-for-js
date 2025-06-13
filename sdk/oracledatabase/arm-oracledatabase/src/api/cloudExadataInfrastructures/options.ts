// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudExadataInfrastructuresAddStorageCapacityOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudExadataInfrastructuresListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface CloudExadataInfrastructuresDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudExadataInfrastructuresUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudExadataInfrastructuresGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudExadataInfrastructuresCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudExadataInfrastructuresListBySubscriptionOptionalParams
  extends OperationOptions {}
