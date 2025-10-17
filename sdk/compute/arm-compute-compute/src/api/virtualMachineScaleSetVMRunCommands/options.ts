// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
