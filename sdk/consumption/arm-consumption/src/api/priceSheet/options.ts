// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PriceSheetDownloadByBillingAccountPeriodOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PriceSheetGetOptionalParams extends OperationOptions {
  /** May be used to expand the properties/meterDetails within a price sheet. By default, these fields are not included when returning price sheet. */
  expand?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
  /** May be used to limit the number of results to the top N results. */
  top?: number;
}

/** Optional parameters. */
export interface PriceSheetGetByBillingPeriodOptionalParams extends OperationOptions {
  /** May be used to expand the properties/meterDetails within a price sheet. By default, these fields are not included when returning price sheet. */
  expand?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
  /** May be used to limit the number of results to the top N results. */
  top?: number;
}
