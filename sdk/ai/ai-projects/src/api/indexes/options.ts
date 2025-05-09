// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IndexesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IndexesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IndexesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IndexesListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface IndexesListVersionsOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  continuationToken?: string;
}
