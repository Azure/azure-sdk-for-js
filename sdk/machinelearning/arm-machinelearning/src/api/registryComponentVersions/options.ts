// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryComponentVersionsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface RegistryComponentVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryComponentVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryComponentVersionsGetOptionalParams extends OperationOptions {}
