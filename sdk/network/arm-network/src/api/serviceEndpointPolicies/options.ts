// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceEndpointPoliciesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceEndpointPoliciesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceEndpointPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceEndpointPoliciesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceEndpointPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceEndpointPoliciesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
