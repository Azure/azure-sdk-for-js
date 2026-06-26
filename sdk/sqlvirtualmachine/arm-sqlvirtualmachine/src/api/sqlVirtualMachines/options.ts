// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlVirtualMachinesListBySqlVmGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlVirtualMachinesRedeployOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesFetchDCAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesStartAssessmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlVirtualMachinesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlVirtualMachinesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlVirtualMachinesGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}
