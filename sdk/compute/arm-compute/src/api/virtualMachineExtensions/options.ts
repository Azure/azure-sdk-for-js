// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineExtensionsListOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Optional parameters. */
export interface VirtualMachineExtensionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineExtensionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineExtensionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineExtensionsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}
