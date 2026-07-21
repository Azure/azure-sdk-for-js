// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateDnsZoneGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateDnsZoneGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateDnsZoneGroupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateDnsZoneGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
