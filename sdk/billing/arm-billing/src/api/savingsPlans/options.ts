// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SavingsPlansValidateUpdateByBillingAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlansListBySavingsPlanOrderOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlansUpdateByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SavingsPlansGetByBillingAccountOptionalParams extends OperationOptions {
  /** May be used to expand the planInformation. */
  expand?: string;
}

/** Optional parameters. */
export interface SavingsPlansListByBillingAccountOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The number of savings plans to skip from the list before returning results */
  skiptoken?: number;
  /** The number of savings plans to return */
  take?: number;
  /** The selected provisioning state */
  selectedState?: string;
  /** To indicate whether to refresh the roll up counts of the savings plans group by provisioning states */
  refreshSummary?: string;
}
