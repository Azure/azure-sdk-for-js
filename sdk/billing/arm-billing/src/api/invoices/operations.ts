// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  Invoice,
  _InvoiceListResult,
  DocumentDownloadResult,
  DocumentDownloadRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  invoiceDeserializer,
  _invoiceListResultDeserializer,
  documentDownloadResultDeserializer,
  documentDownloadRequestArraySerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams,
  InvoicesGetOptionalParams,
  InvoicesDownloadByBillingSubscriptionOptionalParams,
  InvoicesListByBillingSubscriptionOptionalParams,
  InvoicesGetByBillingSubscriptionOptionalParams,
  InvoicesListByBillingProfileOptionalParams,
  InvoicesDownloadDocumentsByBillingAccountOptionalParams,
  InvoicesDownloadSummaryByBillingAccountOptionalParams,
  InvoicesDownloadByBillingAccountOptionalParams,
  InvoicesAmendOptionalParams,
  InvoicesListByBillingAccountOptionalParams,
  InvoicesGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _downloadDocumentsByBillingSubscriptionSend(
  context: Client,
  parameters: DocumentDownloadRequest[],
  options: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/downloadDocuments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: documentDownloadRequestArraySerializer(parameters),
  });
}

export async function _downloadDocumentsByBillingSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentDownloadResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return documentDownloadResultDeserializer(result.body);
}

/** Gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function downloadDocumentsByBillingSubscription(
  context: Client,
  parameters: DocumentDownloadRequest[],
  options: InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _downloadDocumentsByBillingSubscriptionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadDocumentsByBillingSubscriptionSend(context, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _getSend(
  context: Client,
  invoiceName: string,
  options: InvoicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/default/invoices/{invoiceName}{?api%2Dversion}",
    {
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Invoice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return invoiceDeserializer(result.body);
}

/** Gets an invoice by ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export async function get(
  context: Client,
  invoiceName: string,
  options: InvoicesGetOptionalParams = { requestOptions: {} },
): Promise<Invoice> {
  const result = await _getSend(context, invoiceName, options);
  return _getDeserialize(result);
}

export function _downloadByBillingSubscriptionSend(
  context: Client,
  invoiceName: string,
  options: InvoicesDownloadByBillingSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/invoices/{invoiceName}/download{?api%2Dversion,documentName}",
    {
      subscriptionId: context.subscriptionId,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      documentName: options?.documentName,
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

export async function _downloadByBillingSubscriptionDeserialize(
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

/** Gets a URL to download an invoice by billing subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function downloadByBillingSubscription(
  context: Client,
  invoiceName: string,
  options: InvoicesDownloadByBillingSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _downloadByBillingSubscriptionDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _downloadByBillingSubscriptionSend(context, invoiceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _listByBillingSubscriptionSend(
  context: Client,
  options: InvoicesListByBillingSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/invoices{?api%2Dversion,periodStartDate,periodEndDate,filter,orderBy,top,skip,count,search}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: !options?.periodStartDate
        ? options?.periodStartDate
        : options?.periodStartDate.toISOString().split("T")[0],
      periodEndDate: !options?.periodEndDate
        ? options?.periodEndDate
        : options?.periodEndDate.toISOString().split("T")[0],
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

export async function _listByBillingSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InvoiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _invoiceListResultDeserializer(result.body);
}

/** Lists the invoices for a subscription. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function listByBillingSubscription(
  context: Client,
  options: InvoicesListByBillingSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Invoice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingSubscriptionSend(context, options),
    _listByBillingSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingSubscriptionSend(
  context: Client,
  invoiceName: string,
  options: InvoicesGetByBillingSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/default/billingSubscriptions/{subscriptionId}/invoices/{invoiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByBillingSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Invoice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return invoiceDeserializer(result.body);
}

/** Gets an invoice by subscription ID and invoice ID. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export async function getByBillingSubscription(
  context: Client,
  invoiceName: string,
  options: InvoicesGetByBillingSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Invoice> {
  const result = await _getByBillingSubscriptionSend(context, invoiceName, options);
  return _getByBillingSubscriptionDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: InvoicesListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoices{?api%2Dversion,periodStartDate,periodEndDate,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: !options?.periodStartDate
        ? options?.periodStartDate
        : options?.periodStartDate.toISOString().split("T")[0],
      periodEndDate: !options?.periodEndDate
        ? options?.periodEndDate
        : options?.periodEndDate.toISOString().split("T")[0],
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
): Promise<_InvoiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _invoiceListResultDeserializer(result.body);
}

/** Lists the invoices for a billing profile for a given start date and end date. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: InvoicesListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Invoice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _downloadDocumentsByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  parameters: DocumentDownloadRequest[],
  options: InvoicesDownloadDocumentsByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/downloadDocuments{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: documentDownloadRequestArraySerializer(parameters),
  });
}

export async function _downloadDocumentsByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentDownloadResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return documentDownloadResultDeserializer(result.body);
}

/** Gets a URL to download multiple invoice documents (invoice pdf, tax receipts, credit notes) as a zip file. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function downloadDocumentsByBillingAccount(
  context: Client,
  billingAccountName: string,
  parameters: DocumentDownloadRequest[],
  options: InvoicesDownloadDocumentsByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _downloadDocumentsByBillingAccountDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadDocumentsByBillingAccountSend(context, billingAccountName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _downloadSummaryByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesDownloadSummaryByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/downloadSummary{?api%2Dversion}",
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

export async function _downloadSummaryByBillingAccountDeserialize(
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

/** Gets a URL to download the summary document for an invoice. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export function downloadSummaryByBillingAccount(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesDownloadSummaryByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _downloadSummaryByBillingAccountDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadSummaryByBillingAccountSend(context, billingAccountName, invoiceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _downloadByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesDownloadByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/download{?api%2Dversion,documentName}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      documentName: options?.documentName,
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

export async function _downloadByBillingAccountDeserialize(
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

/** Gets a URL to download an invoice document. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export function downloadByBillingAccount(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesDownloadByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult> {
  return getLongRunningPoller(
    context,
    _downloadByBillingAccountDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _downloadByBillingAccountSend(context, billingAccountName, invoiceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<DocumentDownloadResult>, DocumentDownloadResult>;
}

export function _amendSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesAmendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}/amend{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _amendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate an invoice by billing account name and invoice name. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export function amend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesAmendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _amendDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _amendSend(context, billingAccountName, invoiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: InvoicesListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices{?api%2Dversion,periodStartDate,periodEndDate,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      periodStartDate: !options?.periodStartDate
        ? options?.periodStartDate
        : options?.periodStartDate.toISOString().split("T")[0],
      periodEndDate: !options?.periodEndDate
        ? options?.periodEndDate
        : options?.periodEndDate.toISOString().split("T")[0],
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_InvoiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _invoiceListResultDeserializer(result.body);
}

/** Lists the invoices for a billing account for a given start date and end date. The operation is supported for all billing account types. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: InvoicesListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Invoice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/invoices/{invoiceName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      invoiceName: invoiceName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<Invoice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return invoiceDeserializer(result.body);
}

/** Gets an invoice by billing account name and ID. The operation is supported for all billing account types. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  invoiceName: string,
  options: InvoicesGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<Invoice> {
  const result = await _getByBillingAccountSend(context, billingAccountName, invoiceName, options);
  return _getByBillingAccountDeserialize(result);
}
