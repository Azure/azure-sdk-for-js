// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EventImpactedResource,
  _EventImpactedResourceListResult,
  _eventImpactedResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams,
  SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByTenantIdAndEventIdSend(
  context: Client,
  eventTrackingId: string,
  options: SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/listSecurityAdvisoryImpactedResources{?api%2Dversion,%24filter}",
    {
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
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

/** Lists impacted resources in the tenant by an event (Security Advisory). */
export function listByTenantIdAndEventId(
  context: Client,
  eventTrackingId: string,
  options: SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventImpactedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTenantIdAndEventIdSend(context, eventTrackingId, options),
    _listByTenantIdAndEventIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listBySubscriptionIdAndEventIdSend(
  context: Client,
  eventTrackingId: string,
  options: SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/listSecurityAdvisoryImpactedResources{?api%2Dversion,%24filter}",
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
  return context.path(path).post({
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

/** Lists impacted resources in the subscription by an event (Security Advisory). */
export function listBySubscriptionIdAndEventId(
  context: Client,
  eventTrackingId: string,
  options: SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EventImpactedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdAndEventIdSend(context, eventTrackingId, options),
    _listBySubscriptionIdAndEventIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
