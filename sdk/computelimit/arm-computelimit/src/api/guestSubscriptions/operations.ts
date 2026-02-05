// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type { GuestSubscription, _GuestSubscriptionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  guestSubscriptionSerializer,
  guestSubscriptionDeserializer,
  _guestSubscriptionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  GuestSubscriptionsDeleteOptionalParams,
  GuestSubscriptionsCreateOptionalParams,
  GuestSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions{?api%2Dversion}",
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
): Promise<_GuestSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _guestSubscriptionListResultDeserializer(result.body);
}

/** Lists all guest subscriptions in a location. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GuestSubscription> {
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
  guestSubscriptionId: string,
  options: GuestSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      guestSubscriptionId: guestSubscriptionId,
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

/** Deletes a subscription as a guest to stop consuming the compute limits shared by the host subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  location: string,
  guestSubscriptionId: string,
  options: GuestSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, location, guestSubscriptionId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  location: string,
  guestSubscriptionId: string,
  resource: GuestSubscription,
  options: GuestSubscriptionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      guestSubscriptionId: guestSubscriptionId,
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
    body: guestSubscriptionSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<GuestSubscription> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guestSubscriptionDeserializer(result.body);
}

/** Adds a subscription as a guest to consume the compute limits shared by the host subscription. */
export async function create(
  context: Client,
  location: string,
  guestSubscriptionId: string,
  resource: GuestSubscription,
  options: GuestSubscriptionsCreateOptionalParams = { requestOptions: {} },
): Promise<GuestSubscription> {
  const result = await _createSend(context, location, guestSubscriptionId, resource, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  guestSubscriptionId: string,
  options: GuestSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/guestSubscriptions/{guestSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      guestSubscriptionId: guestSubscriptionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GuestSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guestSubscriptionDeserializer(result.body);
}

/** Gets the properties of a guest subscription. */
export async function get(
  context: Client,
  location: string,
  guestSubscriptionId: string,
  options: GuestSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<GuestSubscription> {
  const result = await _getSend(context, location, guestSubscriptionId, options);
  return _getDeserialize(result);
}
