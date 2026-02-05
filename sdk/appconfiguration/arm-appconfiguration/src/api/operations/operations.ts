// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type {
  _OperationDefinitionListResult,
  OperationDefinition,
  CheckNameAvailabilityParameters,
  NameAvailabilityStatus,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _operationDefinitionListResultDeserializer,
  checkNameAvailabilityParametersSerializer,
  nameAvailabilityStatusDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OperationsRegionalCheckNameAvailabilityOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regionalCheckNameAvailabilitySend(
  context: Client,
  location: string,
  checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
  options: OperationsRegionalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityParametersSerializer(checkNameAvailabilityParameters),
  });
}

export async function _regionalCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityStatusDeserializer(result.body);
}

/** Checks whether the configuration store name is available for use. */
export async function regionalCheckNameAvailability(
  context: Client,
  location: string,
  checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
  options: OperationsRegionalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityStatus> {
  const result = await _regionalCheckNameAvailabilitySend(
    context,
    location,
    checkNameAvailabilityParameters,
    options,
  );
  return _regionalCheckNameAvailabilityDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
  options: OperationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityParametersSerializer(checkNameAvailabilityParameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nameAvailabilityStatusDeserializer(result.body);
}

/** Checks whether the configuration store name is available for use. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
  options: OperationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityStatus> {
  const result = await _checkNameAvailabilitySend(
    context,
    checkNameAvailabilityParameters,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AppConfiguration/operations{?api%2Dversion,%24skipToken}",
    {
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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
): Promise<_OperationDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operationDefinitionListResultDeserializer(result.body);
}

/** List the operations for the provider */
export function list(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OperationDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
