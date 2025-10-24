// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type {
  NamespaceDiscoveredDevice,
  NamespaceDiscoveredDeviceUpdate,
  _NamespaceDiscoveredDeviceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  namespaceDiscoveredDeviceSerializer,
  namespaceDiscoveredDeviceDeserializer,
  namespaceDiscoveredDeviceUpdateSerializer,
  _namespaceDiscoveredDeviceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamespaceDiscoveredDevicesListByResourceGroupOptionalParams,
  NamespaceDiscoveredDevicesDeleteOptionalParams,
  NamespaceDiscoveredDevicesUpdateOptionalParams,
  NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams,
  NamespaceDiscoveredDevicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceDiscoveredDevicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NamespaceDiscoveredDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _namespaceDiscoveredDeviceListResultDeserializer(result.body);
}

/** List NamespaceDiscoveredDevice resources by Namespace */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NamespaceDiscoveredDevicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NamespaceDiscoveredDevice> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, namespaceName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  options: NamespaceDiscoveredDevicesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredDeviceName: discoveredDeviceName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a NamespaceDiscoveredDevice */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  options: NamespaceDiscoveredDevicesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, discoveredDeviceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  properties: NamespaceDiscoveredDeviceUpdate,
  options: NamespaceDiscoveredDevicesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredDeviceName: discoveredDeviceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namespaceDiscoveredDeviceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredDevice> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredDeviceDeserializer(result.body);
}

/** Update a NamespaceDiscoveredDevice */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  properties: NamespaceDiscoveredDeviceUpdate,
  options: NamespaceDiscoveredDevicesUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        discoveredDeviceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  resource: NamespaceDiscoveredDevice,
  options: NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredDeviceName: discoveredDeviceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namespaceDiscoveredDeviceSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredDevice> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredDeviceDeserializer(result.body);
}

/** Create a NamespaceDiscoveredDevice */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  resource: NamespaceDiscoveredDevice,
  options: NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        namespaceName,
        discoveredDeviceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NamespaceDiscoveredDevice>, NamespaceDiscoveredDevice>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  options: NamespaceDiscoveredDevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      discoveredDeviceName: discoveredDeviceName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NamespaceDiscoveredDevice> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return namespaceDiscoveredDeviceDeserializer(result.body);
}

/** Get a NamespaceDiscoveredDevice */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  discoveredDeviceName: string,
  options: NamespaceDiscoveredDevicesGetOptionalParams = { requestOptions: {} },
): Promise<NamespaceDiscoveredDevice> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    discoveredDeviceName,
    options,
  );
  return _getDeserialize(result);
}
