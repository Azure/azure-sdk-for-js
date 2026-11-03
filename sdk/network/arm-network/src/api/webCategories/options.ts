// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebCategoriesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebCategoriesGetOptionalParams extends OperationOptions {
  /** Expands resourceIds back referenced by the azureWebCategory resource. */
  expand?: string;
}
