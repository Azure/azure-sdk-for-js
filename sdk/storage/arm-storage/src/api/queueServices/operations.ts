// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  QueueServiceProperties,
  queueServicePropertiesSerializer,
  queueServicePropertiesDeserializer,
  ListQueueServices,
  listQueueServicesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueueServicesListOptionalParams,
  QueueServicesSetServicePropertiesOptionalParams,
  QueueServicesGetServicePropertiesOptionalParams,
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
  accountName: string,
  options: QueueServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<ListQueueServices> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return listQueueServicesDeserializer(result.body);
}

/** List all queue services for the storage account */
export async function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: QueueServicesListOptionalParams = { requestOptions: {} },
): Promise<ListQueueServices> {
  const result = await _listSend(context, resourceGroupName, accountName, options);
  return _listDeserialize(result);
}

export function _setServicePropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: QueueServiceProperties,
  options: QueueServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queueServicePropertiesSerializer(parameters),
  });
}

export async function _setServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<QueueServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return queueServicePropertiesDeserializer(result.body);
}

/** Sets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function setServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: QueueServiceProperties,
  options: QueueServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<QueueServiceProperties> {
  const result = await _setServicePropertiesSend(
    context,
    resourceGroupName,
    accountName,
    parameters,
    options,
  );
  return _setServicePropertiesDeserialize(result);
}

export function _getServicePropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: QueueServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _getServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<QueueServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return queueServicePropertiesDeserializer(result.body);
}

/** Gets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: QueueServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<QueueServiceProperties> {
  const result = await _getServicePropertiesSend(context, resourceGroupName, accountName, options);
  return _getServicePropertiesDeserialize(result);
}
