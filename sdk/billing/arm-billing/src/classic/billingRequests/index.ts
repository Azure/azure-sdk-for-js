// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByInvoiceSection,
  listByCustomer,
  listByBillingProfile,
  listByBillingAccount,
  listByUser,
  createOrUpdate,
  get,
} from "../../api/billingRequests/operations.js";
import type {
  BillingRequestsListByInvoiceSectionOptionalParams,
  BillingRequestsListByCustomerOptionalParams,
  BillingRequestsListByBillingProfileOptionalParams,
  BillingRequestsListByBillingAccountOptionalParams,
  BillingRequestsListByUserOptionalParams,
  BillingRequestsCreateOrUpdateOptionalParams,
  BillingRequestsGetOptionalParams,
} from "../../api/billingRequests/options.js";
import type { BillingRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingRequests operations. */
export interface BillingRequestsOperations {
  /** The list of billing requests submitted for the invoice section. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRequestsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRequest>;
  /** The list of billing requests submitted for the customer. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRequestsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRequest>;
  /** The list of billing requests submitted for the billing profile. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRequestsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRequest>;
  /** The list of billing requests submitted for the billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingRequestsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRequest>;
  /** The list of billing requests submitted by a user. */
  listByUser: (
    options?: BillingRequestsListByUserOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRequest>;
  /** Create or update a billing request. */
  createOrUpdate: (
    billingRequestName: string,
    parameters: BillingRequest,
    options?: BillingRequestsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BillingRequest>, BillingRequest>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    billingRequestName: string,
    parameters: BillingRequest,
    options?: BillingRequestsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRequest>, BillingRequest>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    billingRequestName: string,
    parameters: BillingRequest,
    options?: BillingRequestsCreateOrUpdateOptionalParams,
  ) => Promise<BillingRequest>;
  /** Gets a billing request by its ID. */
  get: (
    billingRequestName: string,
    options?: BillingRequestsGetOptionalParams,
  ) => Promise<BillingRequest>;
}

function _getBillingRequests(context: BillingManagementContext) {
  return {
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRequestsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRequestsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRequestsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingRequestsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    listByUser: (options?: BillingRequestsListByUserOptionalParams) => listByUser(context, options),
    createOrUpdate: (
      billingRequestName: string,
      parameters: BillingRequest,
      options?: BillingRequestsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, billingRequestName, parameters, options),
    beginCreateOrUpdate: async (
      billingRequestName: string,
      parameters: BillingRequest,
      options?: BillingRequestsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, billingRequestName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      billingRequestName: string,
      parameters: BillingRequest,
      options?: BillingRequestsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, billingRequestName, parameters, options);
    },
    get: (billingRequestName: string, options?: BillingRequestsGetOptionalParams) =>
      get(context, billingRequestName, options),
  };
}

export function _getBillingRequestsOperations(
  context: BillingManagementContext,
): BillingRequestsOperations {
  return {
    ..._getBillingRequests(context),
  };
}
