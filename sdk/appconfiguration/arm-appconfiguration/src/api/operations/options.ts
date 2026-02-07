// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsRegionalCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {
  /** A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}
