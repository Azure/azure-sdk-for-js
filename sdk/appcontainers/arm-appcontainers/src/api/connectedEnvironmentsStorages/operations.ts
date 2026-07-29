// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  errorResponseDeserializer,
  ConnectedEnvironmentStorage,
  connectedEnvironmentStorageSerializer,
  connectedEnvironmentStorageDeserializer,
  ConnectedEnvironmentStoragesCollection,
  connectedEnvironmentStoragesCollectionDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectedEnvironmentsStoragesListOptionalParams,
  ConnectedEnvironmentsStoragesDeleteOptionalParams,
  ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsStoragesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsStoragesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<ConnectedEnvironmentStoragesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectedEnvironmentStoragesCollectionDeserializer(result.body);
}

/** Get all storages for a connectedEnvironment. */
export async function list(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsStoragesListOptionalParams = { requestOptions: {} },
): Promise<ConnectedEnvironmentStoragesCollection> {
  const result = await _listSend(context, resourceGroupName, connectedEnvironmentName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  options: ConnectedEnvironmentsStoragesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete storage for a connectedEnvironment. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  options: ConnectedEnvironmentsStoragesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, connectedEnvironmentName, storageName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  storageEnvelope: ConnectedEnvironmentStorage,
  options: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectedEnvironmentStorageSerializer(storageEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedEnvironmentStorage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectedEnvironmentStorageDeserializer(result.body);
}

/** Create or update storage for a connectedEnvironment. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  storageEnvelope: ConnectedEnvironmentStorage,
  options: ConnectedEnvironmentsStoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedEnvironmentStorage>, ConnectedEnvironmentStorage> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        storageName,
        storageEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ConnectedEnvironmentStorage>, ConnectedEnvironmentStorage>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  options: ConnectedEnvironmentsStoragesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<ConnectedEnvironmentStorage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectedEnvironmentStorageDeserializer(result.body);
}

/** Get storage for a connectedEnvironment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  storageName: string,
  options: ConnectedEnvironmentsStoragesGetOptionalParams = { requestOptions: {} },
): Promise<ConnectedEnvironmentStorage> {
  const result = await _getSend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    storageName,
    options,
  );
  return _getDeserialize(result);
}
