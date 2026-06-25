// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Event,
  _Events,
  _eventsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EventsListBySingleResourceOptionalParams,
  EventsListByTenantIdOptionalParams,
  EventsListBySubscriptionIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySingleResourceSend(
  context: Client,
  resourceUri: string,
  options: EventsListBySingleResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ResourceHealth/events{?api%2Dversion,%24filter}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySingleResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_Events> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _eventsDeserializer(result.body);
}

/** Lists current service health events for given resource. */
export function listBySingleResource(
  context: Client,
  resourceUri: string,
  options: EventsListBySingleResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Event> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySingleResourceSend(context, resourceUri, options),
    _listBySingleResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listByTenantIdSend(
  context: Client,
  options: EventsListByTenantIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events{?api%2Dversion,%24filter,queryStartTime}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      queryStartTime: options?.queryStartTime,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByTenantIdDeserialize(result: PathUncheckedResponse): Promise<_Events> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _eventsDeserializer(result.body);
}

/** Lists current service health events in the tenant. */
export function listByTenantId(
  context: Client,
  options: EventsListByTenantIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Event> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTenantIdSend(context, options),
    _listByTenantIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listBySubscriptionIdSend(
  context: Client,
  options: EventsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events{?api%2Dversion,%24filter,queryStartTime}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      queryStartTime: options?.queryStartTime,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_Events> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _eventsDeserializer(result.body);
}

/** Lists service health events in the subscription. */
export function listBySubscriptionId(
  context: Client,
  options: EventsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Event> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
