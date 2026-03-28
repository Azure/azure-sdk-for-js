// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CodeVersionsCreateOrGetStartPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeVersionsPublishOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CodeVersionsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
  /** If specified, return CodeVersion assets with specified content hash value, regardless of name */
  hash?: string;
  /** Hash algorithm version when listing by hash */
  hashVersion?: string;
}

/** Optional parameters. */
export interface CodeVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeVersionsGetOptionalParams extends OperationOptions {}
