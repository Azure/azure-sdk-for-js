// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GroupQuotaSubscriptionAllocationRequestListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GroupQuotaSubscriptionAllocationRequestGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
