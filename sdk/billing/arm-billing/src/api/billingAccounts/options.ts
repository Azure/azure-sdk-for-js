// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BillingAccountsValidatePaymentTermsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
}

/** Optional parameters. */
export interface BillingAccountsConfirmTransitionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingAccountsCancelPaymentTermsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingAccountsAddPaymentTermsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingAccountsListOptionalParams extends OperationOptions {
  /** When true, results will include Billing Accounts that the user does not have a direct role assignment on if the user has one of the following AAD roles: Global Administrator, Global Reader, Billing Administrator. */
  includeAll?: boolean;
  /** When true, results will include Billing Accounts that are not fully created if the user has one of the following AAD roles: Global Administrator, Global Reader, Billing Administrator. */
  includeAllWithoutBillingProfiles?: boolean;
  /** When true, results will include any billing accounts in a deleted state. */
  includeDeleted?: boolean;
  /** Includes billing accounts with agreement pending signature that the user has access to. */
  includePendingAgreement?: boolean;
  /** Includes the customer's billing account of Microsoft Partner Agreement that the user has access to. */
  includeResellee?: boolean;
  /** Must be combined with legalOwnerOID, results will only include Billing Accounts for whom is legally responsible for the Billing Accounts. Optional. */
  legalOwnerTID?: string;
  /** Must be combined with legalOwnerTID, results will only include Billing Accounts for whom is legally responsible for the Billing Accounts. Optional. */
  legalOwnerOID?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** Expand is allowed for SoldTo and EnrollmentDetails/PONumber. */
  expand?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingAccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingAccountsGetOptionalParams extends OperationOptions {}
