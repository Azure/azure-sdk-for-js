// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CapabilityType,
  capabilityTypeDeserializer,
  _CapabilityTypeListResult,
  _capabilityTypeListResultDeserializer,
} from "../../models/models.js";
import { CapabilityTypesListOptionalParams, CapabilityTypesGetOptionalParams } from "./options.js";
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
  targetTypeName: string,
  options: CapabilityTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}/capabilityTypes{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      targetTypeName: targetTypeName,
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
): Promise<_CapabilityTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _capabilityTypeListResultDeserializer(result.body);
}

/** Get a list of Capability Type resources for given Target Type and location. */
export function list(
  context: Client,
  location: string,
  targetTypeName: string,
  options: CapabilityTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CapabilityType> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, targetTypeName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  targetTypeName: string,
  capabilityTypeName: string,
  options: CapabilityTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}/capabilityTypes/{capabilityTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      targetTypeName: targetTypeName,
      capabilityTypeName: capabilityTypeName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CapabilityType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return capabilityTypeDeserializer(result.body);
}

/** Get a Capability Type resource for given Target Type and location. */
export async function get(
  context: Client,
  location: string,
  targetTypeName: string,
  capabilityTypeName: string,
  options: CapabilityTypesGetOptionalParams = { requestOptions: {} },
): Promise<CapabilityType> {
  const result = await _getSend(context, location, targetTypeName, capabilityTypeName, options);
  return _getDeserialize(result);
}
