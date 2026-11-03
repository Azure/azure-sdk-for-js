// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CollectorPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CollectorPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CollectorPoliciesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CollectorPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CollectorPoliciesGetOptionalParams extends OperationOptions {}
