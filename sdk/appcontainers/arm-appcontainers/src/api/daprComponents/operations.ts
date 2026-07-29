// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
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
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DaprComponentsListSecretsOptionalParams,
  DaprComponentsListOptionalParams,
  DaprComponentsDeleteOptionalParams,
  DaprComponentsCreateOrUpdateOptionalParams,
  DaprComponentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  options: DaprComponentsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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
  environmentName: string,
  componentName: string,
  options: DaprComponentsListSecretsOptionalParams = { requestOptions: {} },
): Promise<DaprSecretsCollection> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: DaprComponentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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

/** Get the Dapr Components for a managed environment. */
export function list(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: DaprComponentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DaprComponent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, environmentName, options),
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
  environmentName: string,
  componentName: string,
  options: DaprComponentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Dapr Component from a Managed Environment. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  options: DaprComponentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  daprComponentEnvelope: DaprComponent,
  options: DaprComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return daprComponentDeserializer(result.body);
}

/** Creates or updates a Dapr Component in a Managed Environment. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  daprComponentEnvelope: DaprComponent,
  options: DaprComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DaprComponent> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    daprComponentEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  componentName: string,
  options: DaprComponentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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
  environmentName: string,
  componentName: string,
  options: DaprComponentsGetOptionalParams = { requestOptions: {} },
): Promise<DaprComponent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    environmentName,
    componentName,
    options,
  );
  return _getDeserialize(result);
}
