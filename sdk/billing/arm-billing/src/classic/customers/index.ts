// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  getByBillingAccount,
  listByBillingProfile,
  get,
} from "../../api/customers/operations.js";
import type {
  CustomersListByBillingAccountOptionalParams,
  CustomersGetByBillingAccountOptionalParams,
  CustomersListByBillingProfileOptionalParams,
  CustomersGetOptionalParams,
} from "../../api/customers/options.js";
import type { Customer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Customers operations. */
export interface CustomersOperations {
  /** Lists the customers that are billed to a billing account. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: CustomersListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Customer>;
  /** Gets a customer by its ID at billing account level. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  getByBillingAccount: (
    billingAccountName: string,
    customerName: string,
    options?: CustomersGetByBillingAccountOptionalParams,
  ) => Promise<Customer>;
  /** Lists the customers that are billed to a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: CustomersListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Customer>;
  /** Gets a customer by its ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: CustomersGetOptionalParams,
  ) => Promise<Customer>;
}

function _getCustomers(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: CustomersListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      customerName: string,
      options?: CustomersGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, customerName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: CustomersListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: CustomersGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, customerName, options),
  };
}

export function _getCustomersOperations(context: BillingManagementContext): CustomersOperations {
  return {
    ..._getCustomers(context),
  };
}
