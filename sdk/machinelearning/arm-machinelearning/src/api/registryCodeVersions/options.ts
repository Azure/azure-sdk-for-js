// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryCodeVersionsCreateOrGetStartPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistryCodeVersionsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface RegistryCodeVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryCodeVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryCodeVersionsGetOptionalParams extends OperationOptions {}
