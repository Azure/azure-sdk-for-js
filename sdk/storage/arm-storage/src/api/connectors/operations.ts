// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer_1,
  Connector,
  connectorSerializer,
  connectorDeserializer,
  ConnectorUpdate,
  connectorUpdateSerializer,
  _ConnectorListResult,
  _connectorListResultDeserializer,
  TestExistingConnectionRequest,
  testExistingConnectionRequestSerializer,
  TestConnectionResponse,
  testConnectionResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectorsTestExistingConnectionOptionalParams,
  ConnectorsListByStorageAccountOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsUpdateOptionalParams,
  ConnectorsCreateOptionalParams,
  ConnectorsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _testExistingConnectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  body: TestExistingConnectionRequest,
  options: ConnectorsTestExistingConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}/testExistingConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: testExistingConnectionRequestSerializer(body),
    });
}

export async function _testExistingConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<TestConnectionResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return testConnectionResponseDeserializer(result.body);
}

/**
 * This method is used to verify that the connection to the backing data store works.
 * This API is designed to be used for monitoring and debugging purposes. From the caller’s perspective,
 * this method does the following: Calls List on the backing data store, attempting to list up to one blob/object/etc.
 * If the above succeeds, and if a blob/object/etc is found, calls Get on that object, attempting to download one byte.
 */
export function testExistingConnection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  body: TestExistingConnectionRequest,
  options: ConnectorsTestExistingConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TestConnectionResponse>, TestConnectionResponse> {
  return getLongRunningPoller(context, _testExistingConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testExistingConnectionSend(
        context,
        resourceGroupName,
        accountName,
        connectorName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<TestConnectionResponse>, TestConnectionResponse>;
}

export function _listByStorageAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ConnectorsListByStorageAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listByStorageAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _connectorListResultDeserializer(result.body);
}

/** List all Storage Connectors in a Storage Account. */
export function listByStorageAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ConnectorsListByStorageAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Connector> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStorageAccountSend(context, resourceGroupName, accountName, options),
    _listByStorageAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  options: ConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Storage Connector. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  options: ConnectorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, connectorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  properties: ConnectorUpdate,
  options: ConnectorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Connector> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Update a Storage Connector. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  properties: ConnectorUpdate,
  options: ConnectorsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connector>, Connector> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, connectorName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Connector>, Connector>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  resource: Connector,
  options: ConnectorsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectorSerializer(resource),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Connector> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Create a Storage Connector if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  resource: Connector,
  options: ConnectorsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Connector>, Connector> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, connectorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<Connector>, Connector>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  options: ConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectorName: connectorName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Connector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return connectorDeserializer(result.body);
}

/** Get the specified Storage Connector. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectorName: string,
  options: ConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<Connector> {
  const result = await _getSend(context, resourceGroupName, accountName, connectorName, options);
  return _getDeserialize(result);
}
