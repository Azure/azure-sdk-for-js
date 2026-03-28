// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  validatePaymentTerms,
  listInvoiceSectionsByCreateSubscriptionPermission,
  confirmTransition,
  cancelPaymentTerms,
  addPaymentTerms,
  list,
  update,
  get,
} from "../../api/billingAccounts/operations.js";
import type {
  BillingAccountsValidatePaymentTermsOptionalParams,
  BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams,
  BillingAccountsConfirmTransitionOptionalParams,
  BillingAccountsCancelPaymentTermsOptionalParams,
  BillingAccountsAddPaymentTermsOptionalParams,
  BillingAccountsListOptionalParams,
  BillingAccountsUpdateOptionalParams,
  BillingAccountsGetOptionalParams,
} from "../../api/billingAccounts/options.js";
import type {
  BillingAccount,
  BillingAccountPatch,
  PaymentTerm,
  TransitionDetails,
  InvoiceSectionWithCreateSubPermission,
  PaymentTermsEligibilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingAccounts operations. */
export interface BillingAccountsOperations {
  /** Validates payment terms on a billing account with agreement type 'Microsoft Customer Agreement' and account type 'Enterprise'. */
  validatePaymentTerms: (
    billingAccountName: string,
    parameters: PaymentTerm[],
    options?: BillingAccountsValidatePaymentTermsOptionalParams,
  ) => Promise<PaymentTermsEligibilityResult>;
  /** Lists the invoice sections for which the user has permission to create Azure subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listInvoiceSectionsByCreateSubscriptionPermission: (
    billingAccountName: string,
    options?: BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams,
  ) => PagedAsyncIterableIterator<InvoiceSectionWithCreateSubPermission>;
  /** Gets the transition details for a billing account that has transitioned from agreement type Microsoft Online Services Program to agreement type Microsoft Customer Agreement. */
  confirmTransition: (
    billingAccountName: string,
    options?: BillingAccountsConfirmTransitionOptionalParams,
  ) => Promise<TransitionDetails>;
  /** Cancels all the payment terms on billing account that falls after the cancellation date in the request. Currently, cancel payment terms is only served by admin actions and is not a self-serve action. */
  cancelPaymentTerms: (
    billingAccountName: string,
    parameters: Date,
    options?: BillingAccountsCancelPaymentTermsOptionalParams,
  ) => PollerLike<OperationState<BillingAccount>, BillingAccount>;
  /** @deprecated use cancelPaymentTerms instead */
  beginCancelPaymentTerms: (
    billingAccountName: string,
    parameters: Date,
    options?: BillingAccountsCancelPaymentTermsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingAccount>, BillingAccount>>;
  /** @deprecated use cancelPaymentTerms instead */
  beginCancelPaymentTermsAndWait: (
    billingAccountName: string,
    parameters: Date,
    options?: BillingAccountsCancelPaymentTermsOptionalParams,
  ) => Promise<BillingAccount>;
  /** Adds payment terms to all the billing profiles under the billing account. Currently, payment terms can be added only on billing accounts that have Agreement Type as 'Microsoft Customer Agreement' and AccountType as 'Enterprise'. This action needs pre-authorization and only Field Sellers are authorized to add the payment terms and is not a self-serve action. */
  addPaymentTerms: (
    billingAccountName: string,
    parameters: PaymentTerm[],
    options?: BillingAccountsAddPaymentTermsOptionalParams,
  ) => PollerLike<OperationState<BillingAccount>, BillingAccount>;
  /** @deprecated use addPaymentTerms instead */
  beginAddPaymentTerms: (
    billingAccountName: string,
    parameters: PaymentTerm[],
    options?: BillingAccountsAddPaymentTermsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingAccount>, BillingAccount>>;
  /** @deprecated use addPaymentTerms instead */
  beginAddPaymentTermsAndWait: (
    billingAccountName: string,
    parameters: PaymentTerm[],
    options?: BillingAccountsAddPaymentTermsOptionalParams,
  ) => Promise<BillingAccount>;
  /** Lists the billing accounts that a user has access to. */
  list: (options?: BillingAccountsListOptionalParams) => PagedAsyncIterableIterator<BillingAccount>;
  /** Updates the properties of a billing account. Currently, displayName and address can be updated for billing accounts with agreement type Microsoft Customer Agreement. Currently address and notification email address can be updated for billing accounts with agreement type Microsoft Online Services Agreement. Currently, purchase order number can be edited for billing accounts with agreement type Enterprise Agreement. */
  update: (
    billingAccountName: string,
    parameters: BillingAccountPatch,
    options?: BillingAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<BillingAccount>, BillingAccount>;
  /** @deprecated use update instead */
  beginUpdate: (
    billingAccountName: string,
    parameters: BillingAccountPatch,
    options?: BillingAccountsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingAccount>, BillingAccount>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    billingAccountName: string,
    parameters: BillingAccountPatch,
    options?: BillingAccountsUpdateOptionalParams,
  ) => Promise<BillingAccount>;
  /** Gets a billing account by its ID. */
  get: (
    billingAccountName: string,
    options?: BillingAccountsGetOptionalParams,
  ) => Promise<BillingAccount>;
}

function _getBillingAccounts(context: BillingManagementContext) {
  return {
    validatePaymentTerms: (
      billingAccountName: string,
      parameters: PaymentTerm[],
      options?: BillingAccountsValidatePaymentTermsOptionalParams,
    ) => validatePaymentTerms(context, billingAccountName, parameters, options),
    listInvoiceSectionsByCreateSubscriptionPermission: (
      billingAccountName: string,
      options?: BillingAccountsListInvoiceSectionsByCreateSubscriptionPermissionOptionalParams,
    ) => listInvoiceSectionsByCreateSubscriptionPermission(context, billingAccountName, options),
    confirmTransition: (
      billingAccountName: string,
      options?: BillingAccountsConfirmTransitionOptionalParams,
    ) => confirmTransition(context, billingAccountName, options),
    cancelPaymentTerms: (
      billingAccountName: string,
      parameters: Date,
      options?: BillingAccountsCancelPaymentTermsOptionalParams,
    ) => cancelPaymentTerms(context, billingAccountName, parameters, options),
    beginCancelPaymentTerms: async (
      billingAccountName: string,
      parameters: Date,
      options?: BillingAccountsCancelPaymentTermsOptionalParams,
    ) => {
      const poller = cancelPaymentTerms(context, billingAccountName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelPaymentTermsAndWait: async (
      billingAccountName: string,
      parameters: Date,
      options?: BillingAccountsCancelPaymentTermsOptionalParams,
    ) => {
      return await cancelPaymentTerms(context, billingAccountName, parameters, options);
    },
    addPaymentTerms: (
      billingAccountName: string,
      parameters: PaymentTerm[],
      options?: BillingAccountsAddPaymentTermsOptionalParams,
    ) => addPaymentTerms(context, billingAccountName, parameters, options),
    beginAddPaymentTerms: async (
      billingAccountName: string,
      parameters: PaymentTerm[],
      options?: BillingAccountsAddPaymentTermsOptionalParams,
    ) => {
      const poller = addPaymentTerms(context, billingAccountName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddPaymentTermsAndWait: async (
      billingAccountName: string,
      parameters: PaymentTerm[],
      options?: BillingAccountsAddPaymentTermsOptionalParams,
    ) => {
      return await addPaymentTerms(context, billingAccountName, parameters, options);
    },
    list: (options?: BillingAccountsListOptionalParams) => list(context, options),
    update: (
      billingAccountName: string,
      parameters: BillingAccountPatch,
      options?: BillingAccountsUpdateOptionalParams,
    ) => update(context, billingAccountName, parameters, options),
    beginUpdate: async (
      billingAccountName: string,
      parameters: BillingAccountPatch,
      options?: BillingAccountsUpdateOptionalParams,
    ) => {
      const poller = update(context, billingAccountName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      billingAccountName: string,
      parameters: BillingAccountPatch,
      options?: BillingAccountsUpdateOptionalParams,
    ) => {
      return await update(context, billingAccountName, parameters, options);
    },
    get: (billingAccountName: string, options?: BillingAccountsGetOptionalParams) =>
      get(context, billingAccountName, options),
  };
}

export function _getBillingAccountsOperations(
  context: BillingManagementContext,
): BillingAccountsOperations {
  return {
    ..._getBillingAccounts(context),
  };
}
