// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceEndpointPolicyDefinitionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceEndpointPolicyDefinitionsGetOptionalParams extends OperationOptions {}
