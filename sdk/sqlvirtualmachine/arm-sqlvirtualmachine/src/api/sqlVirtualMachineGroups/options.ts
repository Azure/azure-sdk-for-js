// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlVirtualMachineGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlVirtualMachineGroupsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SqlVirtualMachineGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachineGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachineGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachineGroupsGetOptionalParams extends OperationOptions {}
