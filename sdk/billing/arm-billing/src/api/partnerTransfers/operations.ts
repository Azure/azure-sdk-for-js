// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  PartnerTransferDetails,
  PartnerInitiateTransferRequest,
  _PartnerTransferDetailsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  partnerTransferDetailsDeserializer,
  partnerInitiateTransferRequestSerializer,
  _partnerTransferDetailsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PartnerTransfersCancelOptionalParams,
  PartnerTransfersListOptionalParams,
  PartnerTransfersInitiateOptionalParams,
  PartnerTransfersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  transferName: string,
  options: PartnerTransfersCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/transfers/{transferName}/cancel{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerTransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTransferDetailsDeserializer(result.body);
}

/** Cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function cancel(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  transferName: string,
  options: PartnerTransfersCancelOptionalParams = { requestOptions: {} },
): Promise<PartnerTransferDetails> {
  const result = await _cancelSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    transferName,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: PartnerTransfersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/transfers{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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
): Promise<_PartnerTransferDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerTransferDetailsListResultDeserializer(result.body);
}

/** Lists the transfer requests sent to a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export function list(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: PartnerTransfersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerTransferDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountName, billingProfileName, customerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _initiateSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  transferName: string,
  parameters: PartnerInitiateTransferRequest,
  options: PartnerTransfersInitiateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/transfers/{transferName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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
    body: partnerInitiateTransferRequestSerializer(parameters),
  });
}

export async function _initiateDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerTransferDetails> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTransferDetailsDeserializer(result.body);
}

/** Sends a request to a user in a customer's billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function initiate(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  transferName: string,
  parameters: PartnerInitiateTransferRequest,
  options: PartnerTransfersInitiateOptionalParams = { requestOptions: {} },
): Promise<PartnerTransferDetails> {
  const result = await _initiateSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
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
  customerName: string,
  transferName: string,
  options: PartnerTransfersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/transfers/{transferName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerTransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTransferDetailsDeserializer(result.body);
}

/** Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  transferName: string,
  options: PartnerTransfersGetOptionalParams = { requestOptions: {} },
): Promise<PartnerTransferDetails> {
  const result = await _getSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    transferName,
    options,
  );
  return _getDeserialize(result);
}
