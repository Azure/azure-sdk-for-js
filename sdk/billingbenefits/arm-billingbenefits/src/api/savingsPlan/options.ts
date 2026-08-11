// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SavingsPlanListAllOptionalParams extends OperationOptions {
  /** May be used to filter by reservation properties. The filter supports 'eq', 'or', and 'and'. It does not currently support 'ne', 'gt', 'le', 'ge', or 'not'. Reservation properties include sku/name, properties/{appliedScopeType, archived, displayName, displayProvisioningState, effectiveDateTime, expiryDate, provisioningState, quantity, renew, reservedResourceType, term, userFriendlyAppliedScopeType, userFriendlyRenewState} */
  filter?: string;
  /** May be used to sort order by reservation properties. */
  orderby?: string;
  /** To indicate whether to refresh the roll up counts of the savings plans group by provisioning states */
  refreshSummary?: string;
  /** The number of savings plans to skip from the list before returning results */
  skiptoken?: number;
  /** The selected provisioning state */
  selectedState?: string;
  /** To number of savings plans to return */
  take?: number;
}

/** Optional parameters. */
export interface SavingsPlanValidateUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlanListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlanUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SavingsPlanGetOptionalParams extends OperationOptions {
  /** May be used to expand the detail information of some properties. */
  expand?: string;
}
