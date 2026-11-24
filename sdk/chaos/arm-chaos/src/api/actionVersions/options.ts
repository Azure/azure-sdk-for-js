// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ActionVersionsListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface ActionVersionsGetOptionalParams extends OperationOptions {}
