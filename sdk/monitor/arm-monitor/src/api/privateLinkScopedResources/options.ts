// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams extends OperationOptions {
  /** The kind of the private link resource. Not specifying a kind will return scoped resources of all kinds. */
  kind?: string;
}

/** Optional parameters. */
export interface PrivateLinkScopedResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkScopedResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinkScopedResourcesGetOptionalParams extends OperationOptions {}
