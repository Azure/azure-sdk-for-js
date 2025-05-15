// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TargetType,
  targetTypeDeserializer,
  _TargetTypeListResult,
  _targetTypeListResultDeserializer,
} from "../../models/models.js";
import { TargetTypesListOptionalParams, TargetTypesGetOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: TargetTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      continuationToken: options?.continuationToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _targetTypeListResultDeserializer(result.body);
}

/** Get a list of Target Type resources for given location. */
export function list(
  context: Client,
  location: string,
  options: TargetTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TargetType> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  targetTypeName: string,
  options: TargetTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      targetTypeName: targetTypeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TargetType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return targetTypeDeserializer(result.body);
}

/** Get a Target Type resources for given location. */
export async function get(
  context: Client,
  location: string,
  targetTypeName: string,
  options: TargetTypesGetOptionalParams = { requestOptions: {} },
): Promise<TargetType> {
  const result = await _getSend(context, location, targetTypeName, options);
  return _getDeserialize(result);
}
