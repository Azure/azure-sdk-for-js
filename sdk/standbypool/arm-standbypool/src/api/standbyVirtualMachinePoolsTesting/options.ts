// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsTestingGetOptionalParams extends OperationOptions {}
