// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  _EventTypesListResult,
  EventType,
  TopicTypeInfo,
  _TopicTypesListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _eventTypesListResultDeserializer,
  topicTypeInfoDeserializer,
  _topicTypesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TopicTypesListEventTypesOptionalParams,
  TopicTypesListOptionalParams,
  TopicTypesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listEventTypesSend(
  context: Client,
  topicTypeName: string,
  options: TopicTypesListEventTypesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventTypes{?api%2Dversion}",
    {
      topicTypeName: topicTypeName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _listEventTypesDeserialize(
  result: PathUncheckedResponse,
): Promise<_EventTypesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _eventTypesListResultDeserializer(result.body);
}

/** List event types for a topic type. */
export function listEventTypes(
  context: Client,
  topicTypeName: string,
  options: TopicTypesListEventTypesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventType> {
  return buildPagedAsyncIterator(
    context,
    () => _listEventTypesSend(context, topicTypeName, options),
    _listEventTypesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listSend(
  context: Client,
  options: TopicTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.EventGrid/topicTypes{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
): Promise<_TopicTypesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _topicTypesListResultDeserializer(result.body);
}

/** List all registered topic types. */
export function list(
  context: Client,
  options: TopicTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopicTypeInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  topicTypeName: string,
  options: TopicTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}{?api%2Dversion}",
    {
      topicTypeName: topicTypeName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TopicTypeInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return topicTypeInfoDeserializer(result.body);
}

/** Get information about a topic type. */
export async function get(
  context: Client,
  topicTypeName: string,
  options: TopicTypesGetOptionalParams = { requestOptions: {} },
): Promise<TopicTypeInfo> {
  const result = await _getSend(context, topicTypeName, options);
  return _getDeserialize(result);
}
