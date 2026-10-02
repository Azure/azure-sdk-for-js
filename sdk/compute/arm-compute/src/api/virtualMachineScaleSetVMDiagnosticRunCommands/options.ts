// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
/** Optional parameters. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
