// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EventImpactedResource,
  eventImpactedResourceDeserializer,
  _EventImpactedResourceListResult,
  _eventImpactedResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
  ImpactedResourcesGetOptionalParams,
  ImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  ImpactedResourcesGetByTenantIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionIdAndEventIdSend(
  context: Client,
  eventTrackingId: string,
  options: ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
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

export async function _listBySubscriptionIdAndEventIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_EventImpactedResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _eventImpactedResourceListResultDeserializer(result.body);
}

/** Lists impacted resources in the subscription by an event. */
export function listBySubscriptionIdAndEventId(
  context: Client,
  eventTrackingId: string,
  options: ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventImpactedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdAndEventIdSend(context, eventTrackingId, options),
    _listBySubscriptionIdAndEventIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  eventTrackingId: string,
  impactedResourceName: string,
  options: ImpactedResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources/{impactedResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      eventTrackingId: eventTrackingId,
      impactedResourceName: impactedResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<EventImpactedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventImpactedResourceDeserializer(result.body);
}

/** Gets the specific impacted resource in the subscription by an event. */
export async function get(
  context: Client,
  eventTrackingId: string,
  impactedResourceName: string,
  options: ImpactedResourcesGetOptionalParams = { requestOptions: {} },
): Promise<EventImpactedResource> {
  const result = await _getSend(context, eventTrackingId, impactedResourceName, options);
  return _getDeserialize(result);
}

export function _listByTenantIdAndEventIdSend(
  context: Client,
  eventTrackingId: string,
  options: ImpactedResourcesListByTenantIdAndEventIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources{?api%2Dversion,%24filter}",
    {
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
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

export async function _listByTenantIdAndEventIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_EventImpactedResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _eventImpactedResourceListResultDeserializer(result.body);
}

/** Lists impacted resources in the tenant by an event. */
export function listByTenantIdAndEventId(
  context: Client,
  eventTrackingId: string,
  options: ImpactedResourcesListByTenantIdAndEventIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventImpactedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTenantIdAndEventIdSend(context, eventTrackingId, options),
    _listByTenantIdAndEventIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getByTenantIdSend(
  context: Client,
  eventTrackingId: string,
  impactedResourceName: string,
  options: ImpactedResourcesGetByTenantIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/impactedResources/{impactedResourceName}{?api%2Dversion}",
    {
      eventTrackingId: eventTrackingId,
      impactedResourceName: impactedResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getByTenantIdDeserialize(
  result: PathUncheckedResponse,
): Promise<EventImpactedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventImpactedResourceDeserializer(result.body);
}

/** Gets the specific impacted resource in the tenant by an event. */
export async function getByTenantId(
  context: Client,
  eventTrackingId: string,
  impactedResourceName: string,
  options: ImpactedResourcesGetByTenantIdOptionalParams = { requestOptions: {} },
): Promise<EventImpactedResource> {
  const result = await _getByTenantIdSend(context, eventTrackingId, impactedResourceName, options);
  return _getByTenantIdDeserialize(result);
}
