// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationsListByBillingProfileOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The number of reservations to skip from the list before returning results */
  skiptoken?: number;
  /** To indicate whether to refresh the roll up counts of the reservations group by provisioning states */
  refreshSummary?: string;
  /** The selected provisioning state */
  selectedState?: string;
  /** The number of reservations to return in API response. */
  take?: number;
}

/** Optional parameters. */
export interface ReservationsListByBillingAccountOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The number of reservations to skip from the list before returning results */
  skiptoken?: number;
  /** To indicate whether to refresh the roll up counts of the reservations group by provisioning states */
  refreshSummary?: string;
  /** The selected provisioning state */
  selectedState?: string;
  /** The number of reservations to return in API response. */
  take?: number;
}

/** Optional parameters. */
export interface ReservationsListByReservationOrderOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationsUpdateByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationsGetByReservationOrderOptionalParams extends OperationOptions {
  /** May be used to expand the detail information of some properties. */
  expand?: string;
}
