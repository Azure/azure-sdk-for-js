// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  TransferDetails,
  InitiateTransferRequest,
  _TransferDetailsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  transferDetailsDeserializer,
  initiateTransferRequestSerializer,
  _transferDetailsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TransfersCancelOptionalParams,
  TransfersListOptionalParams,
  TransfersInitiateOptionalParams,
  TransfersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  options: TransfersCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/transfers/{transferName}/cancel{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      transferName: transferName,
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

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<TransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transferDetailsDeserializer(result.body);
}

/** Cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function cancel(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  options: TransfersCancelOptionalParams = { requestOptions: {} },
): Promise<TransferDetails> {
  const result = await _cancelSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    transferName,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: TransfersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/transfers{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransferDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _transferDetailsListResultDeserializer(result.body);
}

/** Lists the transfer requests for an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function list(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: TransfersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TransferDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _initiateSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  parameters: InitiateTransferRequest,
  options: TransfersInitiateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/transfers/{transferName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      transferName: transferName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: initiateTransferRequestSerializer(parameters),
  });
}

export async function _initiateDeserialize(
  result: PathUncheckedResponse,
): Promise<TransferDetails> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transferDetailsDeserializer(result.body);
}

/** Sends a request to a user in another billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function initiate(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  parameters: InitiateTransferRequest,
  options: TransfersInitiateOptionalParams = { requestOptions: {} },
): Promise<TransferDetails> {
  const result = await _initiateSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    transferName,
    parameters,
    options,
  );
  return _initiateDeserialize(result);
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  options: TransfersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/transfers/{transferName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      transferName: transferName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return transferDetailsDeserializer(result.body);
}

/** Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  transferName: string,
  options: TransfersGetOptionalParams = { requestOptions: {} },
): Promise<TransferDetails> {
  const result = await _getSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    transferName,
    options,
  );
  return _getDeserialize(result);
}
