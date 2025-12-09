// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WidgetAnalyticsContext as Client } from "../index.js";
import type {
  WidgetSuite,
  ResourceOperationStatusWidgetSuiteWidgetSuiteError,
  _PagedWidgetSuite} from "../../models/models.js";
import {
  widgetSuiteSerializer,
  widgetSuiteDeserializer,
  resourceOperationStatusWidgetSuiteWidgetSuiteErrorDeserializer,
  _pagedWidgetSuiteDeserializer,
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WidgetsListWidgetsOptionalParams,
  WidgetsDeleteWidgetOptionalParams,
  WidgetsCreateOrUpdateWidgetOptionalParams,
  WidgetsGetWidgetOperationStatusOptionalParams,
  WidgetsGetWidgetOptionalParams,
} from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listWidgetsSend(
  context: Client,
  options: WidgetsListWidgetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/widgets{?api%2Dversion}",
    {
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

export async function _listWidgetsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedWidgetSuite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedWidgetSuiteDeserializer(result.body);
}

/** List Widget resources */
export function listWidgets(
  context: Client,
  options: WidgetsListWidgetsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WidgetSuite> {
  return buildPagedAsyncIterator(
    context,
    () => _listWidgetsSend(context, options),
    _listWidgetsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteWidgetSend(
  context: Client,
  widgetName: string,
  options: WidgetsDeleteWidgetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/widgets/{widgetName}{?api%2Dversion}",
    {
      widgetName: widgetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteWidgetDeserialize(
  result: PathUncheckedResponse,
): Promise<WidgetSuite> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return widgetSuiteDeserializer(result.body.result);
}

/** Delete a Widget asynchronously. */
export function deleteWidget(
  context: Client,
  widgetName: string,
  options: WidgetsDeleteWidgetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WidgetSuite>, WidgetSuite> {
  return getLongRunningPoller(context, _deleteWidgetDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteWidgetSend(context, widgetName, options),
    resourceLocationConfig: "operation-location",
  }) as PollerLike<OperationState<WidgetSuite>, WidgetSuite>;
}

export function _createOrUpdateWidgetSend(
  context: Client,
  widgetName: string,
  resource: WidgetSuite,
  options: WidgetsCreateOrUpdateWidgetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/widgets/{widgetName}{?api%2Dversion}",
    {
      widgetName: widgetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: widgetSuiteSerializer(resource),
  });
}

export async function _createOrUpdateWidgetDeserialize(
  result: PathUncheckedResponse,
): Promise<WidgetSuite> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return widgetSuiteDeserializer(result.body.result);
}

/** Creates or updates a Widget asynchronously. */
export function createOrUpdateWidget(
  context: Client,
  widgetName: string,
  resource: WidgetSuite,
  options: WidgetsCreateOrUpdateWidgetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WidgetSuite>, WidgetSuite> {
  return getLongRunningPoller(context, _createOrUpdateWidgetDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateWidgetSend(context, widgetName, resource, options),
    resourceLocationConfig: "operation-location",
  }) as PollerLike<OperationState<WidgetSuite>, WidgetSuite>;
}

export function _getWidgetOperationStatusSend(
  context: Client,
  widgetName: string,
  operationId: string,
  options: WidgetsGetWidgetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/widgets/{widgetName}/operations/{operationId}{?api%2Dversion}",
    {
      widgetName: widgetName,
      operationId: operationId,
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

export async function _getWidgetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceOperationStatusWidgetSuiteWidgetSuiteError> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return resourceOperationStatusWidgetSuiteWidgetSuiteErrorDeserializer(result.body);
}

/** Gets status of a Widget operation. */
export async function getWidgetOperationStatus(
  context: Client,
  widgetName: string,
  operationId: string,
  options: WidgetsGetWidgetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceOperationStatusWidgetSuiteWidgetSuiteError> {
  const result = await _getWidgetOperationStatusSend(context, widgetName, operationId, options);
  return _getWidgetOperationStatusDeserialize(result);
}

export function _getWidgetSend(
  context: Client,
  widgetName: string,
  options: WidgetsGetWidgetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/widgets/{widgetName}{?api%2Dversion}",
    {
      widgetName: widgetName,
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

export async function _getWidgetDeserialize(result: PathUncheckedResponse): Promise<WidgetSuite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return widgetSuiteDeserializer(result.body);
}

/** Fetch a Widget by name. */
export async function getWidget(
  context: Client,
  widgetName: string,
  options: WidgetsGetWidgetOptionalParams = { requestOptions: {} },
): Promise<WidgetSuite> {
  const result = await _getWidgetSend(context, widgetName, options);
  return _getWidgetDeserialize(result);
}
