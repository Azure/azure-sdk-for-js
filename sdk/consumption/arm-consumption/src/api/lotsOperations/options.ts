// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LotsOperationsListByCustomerOptionalParams extends OperationOptions {
  /** May be used to filter the lots by Status, Source etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. Tag filter is a key value pair string where key and value is separated by a colon (:). */
  filter?: string;
}

/** Optional parameters. */
export interface LotsOperationsListByBillingAccountOptionalParams extends OperationOptions {
  /** May be used to filter the lots by Status, Source etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:). */
  filter?: string;
}

/** Optional parameters. */
export interface LotsOperationsListByBillingProfileOptionalParams extends OperationOptions {}
