// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type {
  RegistryDevice,
  RegistryDeviceUpdate,
  _RegistryDeviceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  registryDeviceSerializer,
  registryDeviceDeserializer,
  registryDeviceUpdateSerializer,
  _registryDeviceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegistryDevicesListByNamespaceOptionalParams,
  RegistryDevicesDeleteOptionalParams,
  RegistryDevicesUpdateOptionalParams,
  RegistryDevicesCreateOrReplaceOptionalParams,
  RegistryDevicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: RegistryDevicesListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/registryDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_RegistryDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _registryDeviceListResultDeserializer(result.body);
}

/** List RegistryDevice resources by Namespace */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: RegistryDevicesListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegistryDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  options: RegistryDevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/registryDevices/{registryDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      registryDeviceName: registryDeviceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a RegistryDevice */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  options: RegistryDevicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, registryDeviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  properties: RegistryDeviceUpdate,
  options: RegistryDevicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/registryDevices/{registryDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      registryDeviceName: registryDeviceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: registryDeviceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RegistryDevice> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return registryDeviceDeserializer(result.body);
}

/** Update a RegistryDevice */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  properties: RegistryDeviceUpdate,
  options: RegistryDevicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RegistryDevice>, RegistryDevice> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        registryDeviceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<RegistryDevice>, RegistryDevice>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  resource: RegistryDevice,
  options: RegistryDevicesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/registryDevices/{registryDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      registryDeviceName: registryDeviceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: registryDeviceSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryDevice> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return registryDeviceDeserializer(result.body);
}

/** Create a RegistryDevice */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  resource: RegistryDevice,
  options: RegistryDevicesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RegistryDevice>, RegistryDevice> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        namespaceName,
        registryDeviceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<RegistryDevice>, RegistryDevice>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  options: RegistryDevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/registryDevices/{registryDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      registryDeviceName: registryDeviceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RegistryDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return registryDeviceDeserializer(result.body);
}

/** Get a RegistryDevice */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  registryDeviceName: string,
  options: RegistryDevicesGetOptionalParams = { requestOptions: {} },
): Promise<RegistryDevice> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    registryDeviceName,
    options,
  );
  return _getDeserialize(result);
}
