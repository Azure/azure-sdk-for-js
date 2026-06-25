// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import { errorResponseDeserializer, Event, eventDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EventFetchDetailsByTenantIdAndTrackingIdOptionalParams,
  EventGetByTenantIdAndTrackingIdOptionalParams,
  EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams,
  EventGetBySubscriptionIdAndTrackingIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _fetchDetailsByTenantIdAndTrackingIdSend(
  context: Client,
  eventTrackingId: string,
  options: EventFetchDetailsByTenantIdAndTrackingIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchEventDetails{?api%2Dversion}",
    {
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _fetchDetailsByTenantIdAndTrackingIdDeserialize(
  result: PathUncheckedResponse,
): Promise<Event> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return eventDeserializer(result.body);
}

/** Service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
export async function fetchDetailsByTenantIdAndTrackingId(
  context: Client,
  eventTrackingId: string,
  options: EventFetchDetailsByTenantIdAndTrackingIdOptionalParams = { requestOptions: {} },
): Promise<Event> {
  const result = await _fetchDetailsByTenantIdAndTrackingIdSend(context, eventTrackingId, options);
  return _fetchDetailsByTenantIdAndTrackingIdDeserialize(result);
}

export function _getByTenantIdAndTrackingIdSend(
  context: Client,
  eventTrackingId: string,
  options: EventGetByTenantIdAndTrackingIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/events/{eventTrackingId}{?api%2Dversion,%24filter,queryStartTime}",
    {
      eventTrackingId: eventTrackingId,
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

export async function _getByTenantIdAndTrackingIdDeserialize(
  result: PathUncheckedResponse,
): Promise<Event> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return eventDeserializer(result.body);
}

/** Service health event in the tenant by event tracking id */
export async function getByTenantIdAndTrackingId(
  context: Client,
  eventTrackingId: string,
  options: EventGetByTenantIdAndTrackingIdOptionalParams = { requestOptions: {} },
): Promise<Event> {
  const result = await _getByTenantIdAndTrackingIdSend(context, eventTrackingId, options);
  return _getByTenantIdAndTrackingIdDeserialize(result);
}

export function _fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdSend(
  context: Client,
  eventTrackingId: string,
  options: EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchBillingCommunicationDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdDeserialize(
  result: PathUncheckedResponse,
): Promise<Event> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return eventDeserializer(result.body);
}

/** Service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type. */
export async function fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId(
  context: Client,
  eventTrackingId: string,
  options: EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams = {
    requestOptions: {},
  },
): Promise<Event> {
  const result = await _fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdSend(
    context,
    eventTrackingId,
    options,
  );
  return _fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdDeserialize(result);
}

export function _fetchDetailsBySubscriptionIdAndTrackingIdSend(
  context: Client,
  eventTrackingId: string,
  options: EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}/fetchEventDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      eventTrackingId: eventTrackingId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _fetchDetailsBySubscriptionIdAndTrackingIdDeserialize(
  result: PathUncheckedResponse,
): Promise<Event> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return eventDeserializer(result.body);
}

/** Service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access */
export async function fetchDetailsBySubscriptionIdAndTrackingId(
  context: Client,
  eventTrackingId: string,
  options: EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams = { requestOptions: {} },
): Promise<Event> {
  const result = await _fetchDetailsBySubscriptionIdAndTrackingIdSend(
    context,
    eventTrackingId,
    options,
  );
  return _fetchDetailsBySubscriptionIdAndTrackingIdDeserialize(result);
}

export function _getBySubscriptionIdAndTrackingIdSend(
  context: Client,
  eventTrackingId: string,
  options: EventGetBySubscriptionIdAndTrackingIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/events/{eventTrackingId}{?api%2Dversion,%24filter,queryStartTime}",
    {
      subscriptionId: context.subscriptionId,
      eventTrackingId: eventTrackingId,
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

export async function _getBySubscriptionIdAndTrackingIdDeserialize(
  result: PathUncheckedResponse,
): Promise<Event> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return eventDeserializer(result.body);
}

/** Service health event in the subscription by event tracking id */
export async function getBySubscriptionIdAndTrackingId(
  context: Client,
  eventTrackingId: string,
  options: EventGetBySubscriptionIdAndTrackingIdOptionalParams = { requestOptions: {} },
): Promise<Event> {
  const result = await _getBySubscriptionIdAndTrackingIdSend(context, eventTrackingId, options);
  return _getBySubscriptionIdAndTrackingIdDeserialize(result);
}
