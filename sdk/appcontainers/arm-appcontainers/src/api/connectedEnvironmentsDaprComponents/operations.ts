// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  errorResponseDeserializer,
  DaprComponent,
  daprComponentSerializer,
  daprComponentDeserializer,
  _DaprComponentsCollection,
  _daprComponentsCollectionDeserializer,
  DaprSecretsCollection,
  daprSecretsCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams,
  ConnectedEnvironmentsDaprComponentsListOptionalParams,
  ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
  ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsDaprComponentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      componentName: componentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<DaprSecretsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return daprSecretsCollectionDeserializer(result.body);
}

/** List secrets for a dapr component */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams = { requestOptions: {} },
): Promise<DaprSecretsCollection> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    componentName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsDaprComponentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents{?api%2Dversion}",
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
): Promise<_DaprComponentsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _daprComponentsCollectionDeserializer(result.body);
}

/** Get the Dapr Components for a connected environment. */
export function list(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsDaprComponentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DaprComponent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, connectedEnvironmentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      componentName: componentName,
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

/** Delete a Dapr Component from a connected environment. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, connectedEnvironmentName, componentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  daprComponentEnvelope: DaprComponent,
  options: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      componentName: componentName,
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
    body: daprComponentSerializer(daprComponentEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DaprComponent> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return daprComponentDeserializer(result.body);
}

/** Creates or updates a Dapr Component in a connected environment. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  daprComponentEnvelope: DaprComponent,
  options: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DaprComponent>, DaprComponent> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        daprComponentEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<DaprComponent>, DaprComponent>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      componentName: componentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DaprComponent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return daprComponentDeserializer(result.body);
}

/** Get a dapr component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  componentName: string,
  options: ConnectedEnvironmentsDaprComponentsGetOptionalParams = { requestOptions: {} },
): Promise<DaprComponent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    componentName,
    options,
  );
  return _getDeserialize(result);
}
