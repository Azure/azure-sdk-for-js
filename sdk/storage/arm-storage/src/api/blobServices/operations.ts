// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BlobServiceProperties,
  blobServicePropertiesSerializer,
  blobServicePropertiesDeserializer,
  _BlobServiceItems,
  _blobServiceItemsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BlobServicesListOptionalParams,
  BlobServicesSetServicePropertiesOptionalParams,
  BlobServicesGetServicePropertiesOptionalParams,
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
  options: BlobServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_BlobServiceItems> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _blobServiceItemsDeserializer(result.body);
}

/** List blob services of storage account. It returns a collection of one object named default. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BlobServiceProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _setServicePropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: BlobServiceProperties,
  options: BlobServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default{?api%2Dversion}",
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
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: blobServicePropertiesSerializer(parameters),
    });
}

export async function _setServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return blobServicePropertiesDeserializer(result.body);
}

/** Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function setServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: BlobServiceProperties,
  options: BlobServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<BlobServiceProperties> {
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
  options: BlobServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default{?api%2Dversion}",
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

export async function _getServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return blobServicePropertiesDeserializer(result.body);
}

/** Gets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<BlobServiceProperties> {
  const result = await _getServicePropertiesSend(context, resourceGroupName, accountName, options);
  return _getServicePropertiesDeserialize(result);
}
