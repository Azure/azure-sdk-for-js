// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationsDetailsListOptionalParams extends OperationOptions {
  /** Start date. Only applicable when querying with billing profile */
  startDate?: string;
  /** End date. Only applicable when querying with billing profile */
  endDate?: string;
  /** Filter reservation details by date range. The properties/UsageDate for start date and end date. The filter supports 'le' and  'ge'. Not applicable when querying with billing profile */
  filter?: string;
  /** Reservation Id GUID. Only valid if reservationOrderId is also provided. Filter to a specific reservation */
  reservationId?: string;
  /** Reservation Order Id GUID. Required if reservationId is provided. Filter to a specific reservation order */
  reservationOrderId?: string;
}

/** Optional parameters. */
export interface ReservationsDetailsListByReservationOrderAndReservationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsDetailsListByReservationOrderOptionalParams extends OperationOptions {}
