// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachinesGetAsyncOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachinesRestartHostsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualMachinesListHostsOptionalParams extends OperationOptions {}
