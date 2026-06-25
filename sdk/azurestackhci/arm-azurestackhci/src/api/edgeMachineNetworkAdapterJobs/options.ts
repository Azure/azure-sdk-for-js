// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EdgeMachineNetworkAdapterJobsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachineNetworkAdapterJobsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachineNetworkAdapterJobsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeMachineNetworkAdapterJobsGetOptionalParams extends OperationOptions {}
