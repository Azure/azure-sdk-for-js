// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SovereignContext as Client } from "../index.js";
import type {
  _OperationListResult,
  Operation,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import {
  _operationListResultDeserializer,
  errorResponseDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OperationsCheckNameAvailabilityLocalOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkNameAvailabilityLocalSend(
  context: Client,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: OperationsCheckNameAvailabilityLocalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityLocalDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Implements local CheckNameAvailability operations */
export async function checkNameAvailabilityLocal(
  context: Client,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: OperationsCheckNameAvailabilityLocalOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilityLocalSend(context, location, body, options);
  return _checkNameAvailabilityLocalDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: OperationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Implements global CheckNameAvailability operations */
export async function checkNameAvailability(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: OperationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, body, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Sovereign/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
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
): Promise<_OperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _operationListResultDeserializer(result.body);
}

/** List the operations for the provider */
export function list(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-31-preview",
    },
  );
}
