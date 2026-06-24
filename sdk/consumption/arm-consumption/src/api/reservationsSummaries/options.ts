// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationsSummariesListOptionalParams extends OperationOptions {
  /** Start date. Only applicable when querying with billing profile */
  startDate?: string;
  /** End date. Only applicable when querying with billing profile */
  endDate?: string;
  /** Required only for daily grain. The properties/UsageDate for start date and end date. The filter supports 'le' and  'ge'. Not applicable when querying with billing profile */
  filter?: string;
  /** Reservation Id GUID. Only valid if reservationOrderId is also provided. Filter to a specific reservation */
  reservationId?: string;
  /** Reservation Order Id GUID. Required if reservationId is provided. Filter to a specific reservation order */
  reservationOrderId?: string;
}

/** Optional parameters. */
export interface ReservationsSummariesListByReservationOrderAndReservationOptionalParams extends OperationOptions {
  /** Required only for daily grain. The properties/UsageDate for start date and end date. The filter supports 'le' and  'ge' */
  filter?: string;
}

/** Optional parameters. */
export interface ReservationsSummariesListByReservationOrderOptionalParams extends OperationOptions {
  /** Required only for daily grain. The properties/UsageDate for start date and end date. The filter supports 'le' and  'ge' */
  filter?: string;
}
