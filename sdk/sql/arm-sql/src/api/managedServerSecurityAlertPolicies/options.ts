// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedServerSecurityAlertPoliciesListByInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedServerSecurityAlertPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedServerSecurityAlertPoliciesGetOptionalParams extends OperationOptions {}
