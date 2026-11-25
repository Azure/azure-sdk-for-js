// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SaasTenantLevelListAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SaasTenantLevelListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SaasTenantLevelDeleteResourceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasTenantLevelUpdateResourceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SaasTenantLevelGetResourceOptionalParams extends OperationOptions {
  /** When `true`, the response includes customer-data (PII) fields such as `purchaserEmail`. Defaults to `false`. */
  expandCustomerData?: boolean;
}
