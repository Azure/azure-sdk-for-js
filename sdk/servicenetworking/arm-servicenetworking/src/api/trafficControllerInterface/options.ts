// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TrafficControllerInterfaceListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrafficControllerInterfaceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TrafficControllerInterfaceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrafficControllerInterfaceGetOptionalParams extends OperationOptions {}
