// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnvironmentsListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface EnvironmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentsHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentsGetOptionalParams extends OperationOptions {}
