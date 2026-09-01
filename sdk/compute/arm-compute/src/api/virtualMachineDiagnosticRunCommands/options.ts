// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineDiagnosticRunCommandsDiagnosticListByVirtualMachineOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
/** Optional parameters. */
export interface VirtualMachineDiagnosticRunCommandsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineDiagnosticRunCommandsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineDiagnosticRunCommandsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface VirtualMachineDiagnosticRunCommandsGetByVirtualMachineOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
