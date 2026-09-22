// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TenantAccessListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessRegenerateSecondaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessRegeneratePrimaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessListByServiceOptionalParams extends OperationOptions {
  /** Not used */
  filter?: string;
}

/** Optional parameters. */
export interface TenantAccessUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TenantAccessGetOptionalParams extends OperationOptions {}
