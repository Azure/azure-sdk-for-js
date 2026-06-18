// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ActionsListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface ActionsGetOptionalParams extends OperationOptions {}
