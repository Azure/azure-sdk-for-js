// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateAccessesListPrivateEndpointConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateAccessesGetAPrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateAccessesGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateAccessesListAllOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface PrivateAccessesListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface PrivateAccessesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateAccessesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateAccessesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateAccessesGetOptionalParams extends OperationOptions {}
