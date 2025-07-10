// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImpactContext as Client,
  ConnectorsCreateOrUpdateOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsGetOptionalParams,
  ConnectorsListBySubscriptionOptionalParams,
  ConnectorsUpdateOptionalParams,
} from "../index.js";
import {
  Connector,
  connectorSerializer,
  connectorDeserializer,
  errorResponseDeserializer,
  ConnectorUpdate,
  connectorUpdateSerializer,
  _ConnectorListResult,
  _connectorListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _connectorsListBySubscriptionSend(
  context: Client,
  options: ConnectorsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/connectors",
      context.subscriptionId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _connectorsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _connectorListResultDeserializer(result.body);
}

/** List Connector resources by subscription ID */
export function connectorsListBySubscription(
  context: Client,
  options: ConnectorsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connector> {
  return buildPagedAsyncIterator(
    context,
    () => _connectorsListBySubscriptionSend(context, options),
    _connectorsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _connectorsDeleteSend(
  context: Client,
  connectorName: string,
  options: ConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/connectors/{connectorName}",
      context.subscriptionId,
      connectorName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _connectorsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Connector */
export async function connectorsDelete(
  context: Client,
  connectorName: string,
  options: ConnectorsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _connectorsDeleteSend(context, connectorName, options);
  return _connectorsDeleteDeserialize(result);
}

export function _connectorsUpdateSend(
  context: Client,
  connectorName: string,
  properties: ConnectorUpdate,
  options: ConnectorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/connectors/{connectorName}",
      context.subscriptionId,
      connectorName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: connectorUpdateSerializer(properties),
    });
}

export async function _connectorsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Connector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Update a Connector */
export async function connectorsUpdate(
  context: Client,
  connectorName: string,
  properties: ConnectorUpdate,
  options: ConnectorsUpdateOptionalParams = { requestOptions: {} },
): Promise<Connector> {
  const result = await _connectorsUpdateSend(context, connectorName, properties, options);
  return _connectorsUpdateDeserialize(result);
}

export function _connectorsCreateOrUpdateSend(
  context: Client,
  connectorName: string,
  resource: Connector,
  options: ConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/connectors/{connectorName}",
      context.subscriptionId,
      connectorName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: connectorSerializer(resource),
    });
}

export async function _connectorsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Connector> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Create a Connector */
export function connectorsCreateOrUpdate(
  context: Client,
  connectorName: string,
  resource: Connector,
  options: ConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connector>, Connector> {
  return getLongRunningPoller(context, _connectorsCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _connectorsCreateOrUpdateSend(context, connectorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Connector>, Connector>;
}

export function _connectorsGetSend(
  context: Client,
  connectorName: string,
  options: ConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/connectors/{connectorName}",
      context.subscriptionId,
      connectorName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _connectorsGetDeserialize(result: PathUncheckedResponse): Promise<Connector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Get a Connector */
export async function connectorsGet(
  context: Client,
  connectorName: string,
  options: ConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<Connector> {
  const result = await _connectorsGetSend(context, connectorName, options);
  return _connectorsGetDeserialize(result);
}
