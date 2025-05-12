// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProtectedItemPlannedFailoverOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectedItemListOptionalParams extends OperationOptions {
  /** OData options. */
  odataOptions?: string;
  /** Continuation token. */
  continuationToken?: string;
  /** Page size. */
  pageSize?: number;
}

/** Optional parameters. */
export interface ProtectedItemDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A flag indicating whether to do force delete or not. */
  forceDelete?: boolean;
}

/** Optional parameters. */
export interface ProtectedItemUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectedItemCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProtectedItemGetOptionalParams extends OperationOptions {}
