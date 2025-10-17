// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineRunCommandsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineRunCommandsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineRunCommandsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineRunCommandsGetByVirtualMachineOptionalParams
  extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
