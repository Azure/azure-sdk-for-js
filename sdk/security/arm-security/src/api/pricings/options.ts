// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PricingsListOptionalParams extends OperationOptions {
  /** OData filter. Optional. */
  filter?: string;
}

/** Optional parameters. */
export interface PricingsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PricingsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PricingsGetOptionalParams extends OperationOptions {}
