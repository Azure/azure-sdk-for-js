// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApisListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface ApisDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApisCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApisHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApisGetOptionalParams extends OperationOptions {}
