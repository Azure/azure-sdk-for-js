// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SavingsPlanOrdersListByBillingAccountOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The number of savings plans to skip from the list before returning results */
  skiptoken?: number;
}

/** Optional parameters. */
export interface SavingsPlanOrdersGetByBillingAccountOptionalParams extends OperationOptions {
  /** May be used to expand the planInformation. */
  expand?: string;
}
