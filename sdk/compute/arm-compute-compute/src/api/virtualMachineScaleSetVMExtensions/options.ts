// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
