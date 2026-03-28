// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByUser,
  deleteByUser,
  getByUser,
  listByBillingProfile,
  getByBillingProfile,
  listByBillingAccount,
  getByBillingAccount,
} from "../../api/paymentMethods/operations.js";
import type {
  PaymentMethodsListByUserOptionalParams,
  PaymentMethodsDeleteByUserOptionalParams,
  PaymentMethodsGetByUserOptionalParams,
  PaymentMethodsListByBillingProfileOptionalParams,
  PaymentMethodsGetByBillingProfileOptionalParams,
  PaymentMethodsListByBillingAccountOptionalParams,
  PaymentMethodsGetByBillingAccountOptionalParams,
} from "../../api/paymentMethods/options.js";
import type { PaymentMethod, PaymentMethodLink } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PaymentMethods operations. */
export interface PaymentMethodsOperations {
  /** Lists the payment methods owned by the caller. */
  listByUser: (
    options?: PaymentMethodsListByUserOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentMethod>;
  /** Deletes a payment method owned by the caller. */
  deleteByUser: (
    paymentMethodName: string,
    options?: PaymentMethodsDeleteByUserOptionalParams,
  ) => Promise<void>;
  /** Gets a payment method owned by the caller. */
  getByUser: (
    paymentMethodName: string,
    options?: PaymentMethodsGetByUserOptionalParams,
  ) => Promise<PaymentMethod>;
  /** Lists payment methods attached to a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: PaymentMethodsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentMethodLink>;
  /** Gets a payment method linked with a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    paymentMethodName: string,
    options?: PaymentMethodsGetByBillingProfileOptionalParams,
  ) => Promise<PaymentMethodLink>;
  /** Lists the payment methods available for a billing account. Along with the payment methods owned by the caller, these payment methods can be attached to a billing profile to make payments. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: PaymentMethodsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentMethod>;
  /** Gets a payment method available for a billing account. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  getByBillingAccount: (
    billingAccountName: string,
    paymentMethodName: string,
    options?: PaymentMethodsGetByBillingAccountOptionalParams,
  ) => Promise<PaymentMethod>;
}

function _getPaymentMethods(context: BillingManagementContext) {
  return {
    listByUser: (options?: PaymentMethodsListByUserOptionalParams) => listByUser(context, options),
    deleteByUser: (paymentMethodName: string, options?: PaymentMethodsDeleteByUserOptionalParams) =>
      deleteByUser(context, paymentMethodName, options),
    getByUser: (paymentMethodName: string, options?: PaymentMethodsGetByUserOptionalParams) =>
      getByUser(context, paymentMethodName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: PaymentMethodsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      paymentMethodName: string,
      options?: PaymentMethodsGetByBillingProfileOptionalParams,
    ) =>
      getByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        paymentMethodName,
        options,
      ),
    listByBillingAccount: (
      billingAccountName: string,
      options?: PaymentMethodsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      paymentMethodName: string,
      options?: PaymentMethodsGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, paymentMethodName, options),
  };
}

export function _getPaymentMethodsOperations(
  context: BillingManagementContext,
): PaymentMethodsOperations {
  return {
    ..._getPaymentMethods(context),
  };
}
