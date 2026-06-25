// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationTransactionsListByBillingProfileOptionalParams extends OperationOptions {
  /** Filter reservation transactions by date range. The properties/EventDate for start date and end date. The filter supports 'le' and  'ge'. Note: API returns data for the entire start date's and end date's billing month. For example, filter properties/eventDate+ge+2020-01-01+AND+properties/eventDate+le+2020-12-29 will include data for entire December 2020 month (i.e. will contain records for dates December 30 and 31) */
  filter?: string;
}

/** Optional parameters. */
export interface ReservationTransactionsListOptionalParams extends OperationOptions {
  /** Filter reservation transactions by date range. The properties/EventDate for start date and end date. The filter supports 'le' and  'ge'. Note: API returns data for the entire start date's and end date's billing month. For example, filter properties/eventDate+ge+2020-01-01+AND+properties/eventDate+le+2020-12-29 will include data for the entire December 2020 month (i.e. will contain records for dates December 30 and 31) */
  filter?: string;
  /** Applies mark up to the transactions if the caller is a partner. */
  useMarkupIfPartner?: boolean;
  /** Preview markup percentage to be applied. */
  previewMarkupPercentage?: number;
}
