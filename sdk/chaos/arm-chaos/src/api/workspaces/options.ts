// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacesEvaluateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesDiscoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesListAllOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface WorkspacesListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Use '*' to create the resource only if it does not exist. If the resource exists, the request fails with HTTP 412 and error code PreconditionFailed in the standard Azure error body. A failed condition starts no resource change or asynchronous operation. Omit both condition headers for an unconditional create or update. Other effective conditions must be honored if supported or rejected with 412 if they cannot be verified; they must not be silently ignored. This contract does not introduce entity-tag matching. */
  ifNoneMatch?: string;
  /** Use '*' to update the resource only if it exists. If the resource does not exist, the request fails with HTTP 412 and error code PreconditionFailed in the standard Azure error body. A failed condition starts no resource change or asynchronous operation. Omit both condition headers for an unconditional create or update. Other effective conditions must be honored if supported or rejected with 412 if they cannot be verified; they must not be silently ignored. This contract does not introduce entity-tag matching. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspacesGetOptionalParams extends OperationOptions {}
