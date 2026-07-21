// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationListAllOptionalParams extends OperationOptions {
  /** May be used to filter by reservation properties. The filter supports 'eq', 'or', and 'and'. It does not currently support 'ne', 'gt', 'le', 'ge', or 'not'. Reservation properties include sku/name, properties/{appliedScopeType, archived, displayName, displayProvisioningState, effectiveDateTime, expiryDate, expiryDateTime, provisioningState, quantity, renew, reservedResourceType, term, userFriendlyAppliedScopeType, userFriendlyRenewState} */
  filter?: string;
  /** May be used to sort order by reservation properties. */
  orderby?: string;
  /** To indicate whether to refresh the roll up counts of the reservations group by provisioning states */
  refreshSummary?: string;
  /** The number of reservations to skip from the list before returning results */
  skiptoken?: number;
  /** The selected provisioning state */
  selectedState?: string;
  /** To number of reservations to return */
  take?: number;
}

/** Optional parameters. */
export interface ReservationMergeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationSplitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationListRevisionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationUnarchiveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationArchiveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationAvailableScopesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReservationUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReservationGetOptionalParams extends OperationOptions {
  /** Supported value of this query is renewProperties */
  expand?: string;
}
