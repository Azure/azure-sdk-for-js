// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByInvoiceSection,
  listByCustomer,
  listByBillingProfile,
  getTransactionSummaryByInvoice,
  transactionsDownloadByInvoice,
  listByInvoice,
} from "../../api/transactions/operations.js";
import type {
  TransactionsListByInvoiceSectionOptionalParams,
  TransactionsListByCustomerOptionalParams,
  TransactionsListByBillingProfileOptionalParams,
  TransactionsGetTransactionSummaryByInvoiceOptionalParams,
  TransactionsTransactionsDownloadByInvoiceOptionalParams,
  TransactionsListByInvoiceOptionalParams,
} from "../../api/transactions/options.js";
import type {
  DocumentDownloadResult,
  Transaction,
  TransactionSummary,
  TransactionType,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Transactions operations. */
export interface TransactionsOperations {
  /** Lists the billed or unbilled transactions by invoice section name for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    periodStartDate: Date,
    periodEndDate: Date,
    typeParam: TransactionType,
    options?: TransactionsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<Transaction>;
  /** Lists the billed or unbilled transactions by customer id for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    periodStartDate: Date,
    periodEndDate: Date,
    typeParam: TransactionType,
    options?: TransactionsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<Transaction>;
  /** Lists the billed or unbilled transactions by billing profile name for given start and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    periodStartDate: Date,
    periodEndDate: Date,
    typeParam: TransactionType,
    options?: TransactionsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Transaction>;
  /** Gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges. */
  getTransactionSummaryByInvoice: (
    billingAccountName: string,
    invoiceName: string,
    options?: TransactionsGetTransactionSummaryByInvoiceOptionalParams,
  ) => Promise<TransactionSummary>;
  /** Gets a URL to download the transactions document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  transactionsDownloadByInvoice: (
    billingAccountName: string,
    invoiceName: string,
    options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
  ) => PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
  /** @deprecated use transactionsDownloadByInvoice instead */
  beginTransactionsDownloadByInvoice: (
    billingAccountName: string,
    invoiceName: string,
    options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>>;
  /** @deprecated use transactionsDownloadByInvoice instead */
  beginTransactionsDownloadByInvoiceAndWait: (
    billingAccountName: string,
    invoiceName: string,
    options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
  ) => Promise<DocumentDownloadResult>;
  /** Lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges. */
  listByInvoice: (
    billingAccountName: string,
    invoiceName: string,
    options?: TransactionsListByInvoiceOptionalParams,
  ) => PagedAsyncIterableIterator<Transaction>;
}

function _getTransactions(context: BillingManagementContext) {
  return {
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      periodStartDate: Date,
      periodEndDate: Date,
      typeParam: TransactionType,
      options?: TransactionsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      periodStartDate: Date,
      periodEndDate: Date,
      typeParam: TransactionType,
      options?: TransactionsListByCustomerOptionalParams,
    ) =>
      listByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      periodStartDate: Date,
      periodEndDate: Date,
      typeParam: TransactionType,
      options?: TransactionsListByBillingProfileOptionalParams,
    ) =>
      listByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    getTransactionSummaryByInvoice: (
      billingAccountName: string,
      invoiceName: string,
      options?: TransactionsGetTransactionSummaryByInvoiceOptionalParams,
    ) => getTransactionSummaryByInvoice(context, billingAccountName, invoiceName, options),
    transactionsDownloadByInvoice: (
      billingAccountName: string,
      invoiceName: string,
      options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
    ) => transactionsDownloadByInvoice(context, billingAccountName, invoiceName, options),
    beginTransactionsDownloadByInvoice: async (
      billingAccountName: string,
      invoiceName: string,
      options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
    ) => {
      const poller = transactionsDownloadByInvoice(
        context,
        billingAccountName,
        invoiceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTransactionsDownloadByInvoiceAndWait: async (
      billingAccountName: string,
      invoiceName: string,
      options?: TransactionsTransactionsDownloadByInvoiceOptionalParams,
    ) => {
      return await transactionsDownloadByInvoice(context, billingAccountName, invoiceName, options);
    },
    listByInvoice: (
      billingAccountName: string,
      invoiceName: string,
      options?: TransactionsListByInvoiceOptionalParams,
    ) => listByInvoice(context, billingAccountName, invoiceName, options),
  };
}

export function _getTransactionsOperations(
  context: BillingManagementContext,
): TransactionsOperations {
  return {
    ..._getTransactions(context),
  };
}
