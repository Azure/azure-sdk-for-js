// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TargetsListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface TargetsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsGetOptionalParams extends OperationOptions {}
