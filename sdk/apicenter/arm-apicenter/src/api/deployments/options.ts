// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentsListOptionalParams extends OperationOptions {
  /** OData filter parameter. */
  filter?: string;
}

/** Optional parameters. */
export interface DeploymentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsHeadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsGetOptionalParams extends OperationOptions {}
