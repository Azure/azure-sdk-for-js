// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type { SharedLimit, _SharedLimitListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  sharedLimitSerializer,
  sharedLimitDeserializer,
  _sharedLimitListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SharedLimitsListBySubscriptionLocationResourceOptionalParams,
  SharedLimitsDeleteOptionalParams,
  SharedLimitsCreateOptionalParams,
  SharedLimitsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: SharedLimitsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedLimitListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sharedLimitListResultDeserializer(result.body);
}

/** Lists all compute limits shared by the host subscription with its guest subscriptions. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: SharedLimitsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SharedLimit> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  location: string,
  name: string,
  options: SharedLimitsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Disables sharing of a compute limit by the host subscription with its guest subscriptions. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  location: string,
  name: string,
  options: SharedLimitsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, location, name, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  location: string,
  name: string,
  resource: SharedLimit,
  options: SharedLimitsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sharedLimitSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SharedLimit> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedLimitDeserializer(result.body);
}

/** Enables sharing of a compute limit by the host subscription with its guest subscriptions. */
export async function create(
  context: Client,
  location: string,
  name: string,
  resource: SharedLimit,
  options: SharedLimitsCreateOptionalParams = { requestOptions: {} },
): Promise<SharedLimit> {
  const result = await _createSend(context, location, name, resource, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  name: string,
  options: SharedLimitsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimits/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SharedLimit> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedLimitDeserializer(result.body);
}

/** Gets the properties of a compute limit shared by the host subscription with its guest subscriptions. */
export async function get(
  context: Client,
  location: string,
  name: string,
  options: SharedLimitsGetOptionalParams = { requestOptions: {} },
): Promise<SharedLimit> {
  const result = await _getSend(context, location, name, options);
  return _getDeserialize(result);
}
