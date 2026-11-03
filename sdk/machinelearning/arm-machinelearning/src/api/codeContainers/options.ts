// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CodeContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface CodeContainersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeContainersCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeContainersGetOptionalParams extends OperationOptions {}
