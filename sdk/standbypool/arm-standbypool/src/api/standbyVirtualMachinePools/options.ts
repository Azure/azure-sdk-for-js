// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsGetOptionalParams extends OperationOptions {}
