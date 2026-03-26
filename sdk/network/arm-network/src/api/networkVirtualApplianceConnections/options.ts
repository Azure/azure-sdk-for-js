// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkVirtualApplianceConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkVirtualApplianceConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkVirtualApplianceConnectionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
