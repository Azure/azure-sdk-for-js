// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AuthenticationPoliciesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthenticationPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthenticationPoliciesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthenticationPoliciesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthenticationPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AuthenticationPoliciesGetOptionalParams extends OperationOptions {}
