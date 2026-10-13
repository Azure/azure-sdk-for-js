// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiVersionsListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface ApiVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionsHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionsGetOptionalParams extends OperationOptions {}
