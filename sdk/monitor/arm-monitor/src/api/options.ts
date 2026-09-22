// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetTestNotificationsAtTenantActionGroupResourceLevelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateNotificationsAtTenantActionGroupResourceLevelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
