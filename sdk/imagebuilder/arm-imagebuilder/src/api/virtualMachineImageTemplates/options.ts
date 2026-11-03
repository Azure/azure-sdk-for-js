// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineImageTemplatesListRunOutputsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesGetRunOutputOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachineImageTemplatesGetOptionalParams extends OperationOptions {}
