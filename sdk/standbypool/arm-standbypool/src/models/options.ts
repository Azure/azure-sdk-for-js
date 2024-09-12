// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinesGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolRuntimeViewsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams
  extends OperationOptions {}
