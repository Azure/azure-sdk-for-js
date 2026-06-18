// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  ManagedEnvironmentStorage,
  managedEnvironmentStorageSerializer,
  managedEnvironmentStorageDeserializer,
  ManagedEnvironmentStoragesCollection,
  managedEnvironmentStoragesCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedEnvironmentsStoragesListOptionalParams,
  ManagedEnvironmentsStoragesDeleteOptionalParams,
  ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams,
  ManagedEnvironmentsStoragesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsStoragesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages{?api%2Dversion}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironmentStoragesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedEnvironmentStoragesCollectionDeserializer(result.body);
}

/** Get all storages for a managedEnvironment. */
export async function list(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsStoragesListOptionalParams = { requestOptions: {} },
): Promise<ManagedEnvironmentStoragesCollection> {
  const result = await _listSend(context, resourceGroupName, environmentName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  options: ManagedEnvironmentsStoragesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
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
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete storage for a managedEnvironment. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  options: ManagedEnvironmentsStoragesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    environmentName,
    storageName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  storageEnvelope: ManagedEnvironmentStorage,
  options: ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
      body: managedEnvironmentStorageSerializer(storageEnvelope),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironmentStorage> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedEnvironmentStorageDeserializer(result.body);
}

/** Create or update storage for a managedEnvironment. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  storageEnvelope: ManagedEnvironmentStorage,
  options: ManagedEnvironmentsStoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedEnvironmentStorage> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    environmentName,
    storageName,
    storageEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  options: ManagedEnvironmentsStoragesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironmentStorage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedEnvironmentStorageDeserializer(result.body);
}

/** Get storage for a managedEnvironment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  storageName: string,
  options: ManagedEnvironmentsStoragesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedEnvironmentStorage> {
  const result = await _getSend(context, resourceGroupName, environmentName, storageName, options);
  return _getDeserialize(result);
}
