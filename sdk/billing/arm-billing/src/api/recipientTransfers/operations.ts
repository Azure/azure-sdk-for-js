// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  RecipientTransferDetails,
  _RecipientTransferDetailsListResult,
  AcceptTransferRequest,
  ValidateTransferListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  recipientTransferDetailsDeserializer,
  _recipientTransferDetailsListResultDeserializer,
  acceptTransferRequestSerializer,
  validateTransferListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecipientTransfersDeclineOptionalParams,
  RecipientTransfersValidateOptionalParams,
  RecipientTransfersAcceptOptionalParams,
  RecipientTransfersListOptionalParams,
  RecipientTransfersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _declineSend(
  context: Client,
  transferName: string,
  options: RecipientTransfersDeclineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/transfers/{transferName}/decline{?api%2Dversion}",
    {
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

export async function _declineDeserialize(
  result: PathUncheckedResponse,
): Promise<RecipientTransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientTransferDetailsDeserializer(result.body);
}

/** Declines a transfer request. */
export async function decline(
  context: Client,
  transferName: string,
  options: RecipientTransfersDeclineOptionalParams = { requestOptions: {} },
): Promise<RecipientTransferDetails> {
  const result = await _declineSend(context, transferName, options);
  return _declineDeserialize(result);
}

export function _validateSend(
  context: Client,
  transferName: string,
  parameters: AcceptTransferRequest,
  options: RecipientTransfersValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/transfers/{transferName}/validate{?api%2Dversion}",
    {
      transferName: transferName,
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
    body: acceptTransferRequestSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateTransferListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateTransferListResponseDeserializer(result.body);
}

/** Validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation. */
export async function validate(
  context: Client,
  transferName: string,
  parameters: AcceptTransferRequest,
  options: RecipientTransfersValidateOptionalParams = { requestOptions: {} },
): Promise<ValidateTransferListResponse> {
  const result = await _validateSend(context, transferName, parameters, options);
  return _validateDeserialize(result);
}

export function _acceptSend(
  context: Client,
  transferName: string,
  parameters: AcceptTransferRequest,
  options: RecipientTransfersAcceptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/transfers/{transferName}/accept{?api%2Dversion}",
    {
      transferName: transferName,
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
    body: acceptTransferRequestSerializer(parameters),
  });
}

export async function _acceptDeserialize(
  result: PathUncheckedResponse,
): Promise<RecipientTransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientTransferDetailsDeserializer(result.body);
}

/** Accepts a transfer request. */
export async function accept(
  context: Client,
  transferName: string,
  parameters: AcceptTransferRequest,
  options: RecipientTransfersAcceptOptionalParams = { requestOptions: {} },
): Promise<RecipientTransferDetails> {
  const result = await _acceptSend(context, transferName, parameters, options);
  return _acceptDeserialize(result);
}

export function _listSend(
  context: Client,
  options: RecipientTransfersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/transfers{?api%2Dversion}",
    {
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
): Promise<_RecipientTransferDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _recipientTransferDetailsListResultDeserializer(result.body);
}

/** Lists the transfer requests received by the caller. */
export function list(
  context: Client,
  options: RecipientTransfersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecipientTransferDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getSend(
  context: Client,
  transferName: string,
  options: RecipientTransfersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/transfers/{transferName}{?api%2Dversion}",
    {
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
): Promise<RecipientTransferDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientTransferDetailsDeserializer(result.body);
}

/** Gets a transfer request by ID. The caller must be the recipient of the transfer request. */
export async function get(
  context: Client,
  transferName: string,
  options: RecipientTransfersGetOptionalParams = { requestOptions: {} },
): Promise<RecipientTransferDetails> {
  const result = await _getSend(context, transferName, options);
  return _getDeserialize(result);
}
