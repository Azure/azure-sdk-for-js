// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectionPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectionPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface ProtectionPoliciesGetOptionalParams extends OperationOptions {}
