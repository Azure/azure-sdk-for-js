// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  TableServiceProperties,
  tableServicePropertiesSerializer,
  tableServicePropertiesDeserializer,
  ListTableServices,
  listTableServicesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TableServicesListOptionalParams,
  TableServicesSetServicePropertiesOptionalParams,
  TableServicesGetServicePropertiesOptionalParams,
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
  options: TableServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<ListTableServices> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return listTableServicesDeserializer(result.body);
}

/** List all table services for the storage account. */
export async function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableServicesListOptionalParams = { requestOptions: {} },
): Promise<ListTableServices> {
  const result = await _listSend(context, resourceGroupName, accountName, options);
  return _listDeserialize(result);
}

export function _setServicePropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: TableServiceProperties,
  options: TableServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default{?api%2Dversion}",
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
    body: tableServicePropertiesSerializer(parameters),
  });
}

export async function _setServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<TableServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return tableServicePropertiesDeserializer(result.body);
}

/** Sets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function setServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: TableServiceProperties,
  options: TableServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<TableServiceProperties> {
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
  options: TableServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default{?api%2Dversion}",
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
): Promise<TableServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return tableServicePropertiesDeserializer(result.body);
}

/** Gets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: TableServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<TableServiceProperties> {
  const result = await _getServicePropertiesSend(context, resourceGroupName, accountName, options);
  return _getServicePropertiesDeserialize(result);
}
