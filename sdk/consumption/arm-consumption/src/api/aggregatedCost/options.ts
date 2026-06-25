// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AggregatedCostGetByManagementGroupOptionalParams extends OperationOptions {
  /** Required only for daily grain. The properties/UsageDate for start date and end date. The filter supports 'le' and  'ge' */
  filter?: string;
}
