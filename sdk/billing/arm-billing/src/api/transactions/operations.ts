// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  DocumentDownloadResult,
  _TransactionListResult,
  Transaction,
  TransactionSummary,
  TransactionType,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  documentDownloadResultDeserializer,
  _transactionListResultDeserializer,
  transactionSummaryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TransactionsListByInvoiceSectionOptionalParams,
  TransactionsListByCustomerOptionalParams,
  TransactionsListByBillingProfileOptionalParams,
  TransactionsGetTransactionSummaryByInvoiceOptionalParams,
  TransactionsTransactionsDownloadByInvoiceOptionalParams,
  TransactionsListByInvoiceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/transactions{?api%2Dversion,periodStartDate,periodEndDate,type,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: periodStartDate.toISOString().split("T")[0],
      periodEndDate: periodEndDate.toISOString().split("T")[0],
      type: typeParam,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
      search: options?.search,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransactionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _transactionListResultDeserializer(result.body);
}

/** Lists the billed or unbilled transactions by invoice section name for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
export function listByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Transaction> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByInvoiceSectionSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    _listByInvoiceSectionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/transactions{?api%2Dversion,periodStartDate,periodEndDate,type,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: periodStartDate.toISOString().split("T")[0],
      periodEndDate: periodEndDate.toISOString().split("T")[0],
      type: typeParam,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
      search: options?.search,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransactionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _transactionListResultDeserializer(result.body);
}

/** Lists the billed or unbilled transactions by customer id for given start date and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
export function listByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Transaction> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCustomerSend(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/transactions{?api%2Dversion,periodStartDate,periodEndDate,type,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: periodStartDate.toISOString().split("T")[0],
      periodEndDate: periodEndDate.toISOString().split("T")[0],
      type: typeParam,
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
      search: options?.search,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransactionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _transactionListResultDeserializer(result.body);
}

/** Lists the billed or unbilled transactions by billing profile name for given start and end date. Transactions include purchases, refunds and Azure usage charges. Unbilled transactions are listed under pending invoice Id and do not include tax. Tax is added to the amount once an invoice is generated. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  periodStartDate: Date,
  periodEndDate: Date,
  typeParam: TransactionType,
  options: TransactionsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Transaction> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByBillingProfileSend(
        context,
        billingAccountName,
        billingProfileName,
        periodStartDate,
        periodEndDate,
        typeParam,
        options,
      ),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getTransactionSummaryByInvoiceSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsGetTransactionSummaryByInvoiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/transactionSummary{?api%2Dversion,filter,search}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      search: options?.search,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTransactionSummaryByInvoiceDeserialize(
  result: PathUncheckedResponse,
): Promise<TransactionSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transactionSummaryDeserializer(result.body);
}

/** Gets the transaction summary for an invoice. Transactions include purchases, refunds and Azure usage charges. */
export async function getTransactionSummaryByInvoice(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsGetTransactionSummaryByInvoiceOptionalParams = { requestOptions: {} },
): Promise<TransactionSummary> {
  const result = await _getTransactionSummaryByInvoiceSend(
    context,
    billingAccountName,
    invoiceName,
    options,
  );
  return _getTransactionSummaryByInvoiceDeserialize(result);
}

export function _transactionsDownloadByInvoiceSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsTransactionsDownloadByInvoiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/transactionsDownload{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _transactionsDownloadByInvoiceDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentDownloadResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return documentDownloadResultDeserializer(result.body);
}

/** Gets a URL to download the transactions document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export function transactionsDownloadByInvoice(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsTransactionsDownloadByInvoiceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _transactionsDownloadByInvoiceDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _transactionsDownloadByInvoiceSend(context, billingAccountName, invoiceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _listByInvoiceSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsListByInvoiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/transactions{?api%2Dversion,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
      search: options?.search,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByInvoiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransactionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _transactionListResultDeserializer(result.body);
}

/** Lists the transactions for an invoice. Transactions include purchases, refunds and Azure usage charges. */
export function listByInvoice(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: TransactionsListByInvoiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Transaction> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInvoiceSend(context, billingAccountName, invoiceName, options),
    _listByInvoiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}
