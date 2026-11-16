// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TrustedAccessRoleBindingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TrustedAccessRoleBindingsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrustedAccessRoleBindingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TrustedAccessRoleBindingsGetOptionalParams extends OperationOptions {}
