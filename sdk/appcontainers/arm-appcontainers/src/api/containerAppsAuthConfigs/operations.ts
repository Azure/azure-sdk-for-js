// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  AuthConfig,
  authConfigSerializer,
  authConfigDeserializer,
  _AuthConfigCollection,
  _authConfigCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsAuthConfigsListByContainerAppOptionalParams,
  ContainerAppsAuthConfigsDeleteOptionalParams,
  ContainerAppsAuthConfigsCreateOrUpdateOptionalParams,
  ContainerAppsAuthConfigsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByContainerAppSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsAuthConfigsListByContainerAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
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

export async function _listByContainerAppDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthConfigCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _authConfigCollectionDeserializer(result.body);
}

/** Get the Container App AuthConfigs in a given resource group. */
export function listByContainerApp(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsAuthConfigsListByContainerAppOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthConfig> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContainerAppSend(context, resourceGroupName, containerAppName, options),
    _listByContainerAppDeserialize,
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
  containerAppName: string,
  authConfigName: string,
  options: ContainerAppsAuthConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      authConfigName: authConfigName,
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

/** Delete a Container App AuthConfig. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  authConfigName: string,
  options: ContainerAppsAuthConfigsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    containerAppName,
    authConfigName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  authConfigName: string,
  authConfigEnvelope: AuthConfig,
  options: ContainerAppsAuthConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      authConfigName: authConfigName,
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
    body: authConfigSerializer(authConfigEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return authConfigDeserializer(result.body);
}

/** Create or update the AuthConfig for a Container App. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  authConfigName: string,
  authConfigEnvelope: AuthConfig,
  options: ContainerAppsAuthConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AuthConfig> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    containerAppName,
    authConfigName,
    authConfigEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  authConfigName: string,
  options: ContainerAppsAuthConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      authConfigName: authConfigName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AuthConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return authConfigDeserializer(result.body);
}

/** Get a AuthConfig of a Container App. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  authConfigName: string,
  options: ContainerAppsAuthConfigsGetOptionalParams = { requestOptions: {} },
): Promise<AuthConfig> {
  const result = await _getSend(
    context,
    resourceGroupName,
    containerAppName,
    authConfigName,
    options,
  );
  return _getDeserialize(result);
}
