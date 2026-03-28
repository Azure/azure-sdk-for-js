// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type {
  _LocationListResult,
  Location,
  Subscription,
  _SubscriptionListResult,
  CheckZonePeersRequest,
  CheckZonePeersResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  _locationListResultDeserializer,
  subscriptionDeserializer,
  _subscriptionListResultDeserializer,
  checkZonePeersRequestSerializer,
  checkZonePeersResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionsCheckZonePeersOptionalParams,
  SubscriptionsListOptionalParams,
  SubscriptionsGetOptionalParams,
  SubscriptionsListLocationsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkZonePeersSend(
  context: Client,
  subscriptionId: string,
  parameters: CheckZonePeersRequest,
  options: SubscriptionsCheckZonePeersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/checkZonePeers/{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkZonePeersRequestSerializer(parameters),
  });
}

export async function _checkZonePeersDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckZonePeersResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkZonePeersResultDeserializer(result.body);
}

/** Compares a subscriptions logical zone mapping */
export async function checkZonePeers(
  context: Client,
  subscriptionId: string,
  parameters: CheckZonePeersRequest,
  options: SubscriptionsCheckZonePeersOptionalParams = { requestOptions: {} },
): Promise<CheckZonePeersResult> {
  const result = await _checkZonePeersSend(context, subscriptionId, parameters, options);
  return _checkZonePeersDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SubscriptionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
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
): Promise<_SubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _subscriptionListResultDeserializer(result.body);
}

/** Gets all subscriptions for a tenant. */
export function list(
  context: Client,
  options: SubscriptionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Subscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-12-01" },
  );
}

export function _getSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Subscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return subscriptionDeserializer(result.body);
}

/** Gets details about a specified subscription. */
export async function get(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<Subscription> {
  const result = await _getSend(context, subscriptionId, options);
  return _getDeserialize(result);
}

export function _listLocationsSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsListLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/locations{?api%2Dversion,includeExtendedLocations}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
      includeExtendedLocations: options?.includeExtendedLocations,
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

export async function _listLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LocationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _locationListResultDeserializer(result.body);
}

/** This operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list. */
export function listLocations(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsListLocationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Location> {
  return buildPagedAsyncIterator(
    context,
    () => _listLocationsSend(context, subscriptionId, options),
    _listLocationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-12-01" },
  );
}
