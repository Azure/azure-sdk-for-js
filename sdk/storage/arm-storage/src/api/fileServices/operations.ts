// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  FileServiceProperties,
  fileServicePropertiesSerializer,
  fileServicePropertiesDeserializer,
  FileServiceItems,
  fileServiceItemsDeserializer,
  FileServiceUsage,
  fileServiceUsageDeserializer,
  _FileServiceUsages,
  _fileServiceUsagesDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FileServicesListServiceUsagesOptionalParams,
  FileServicesGetServiceUsageOptionalParams,
  FileServicesListOptionalParams,
  FileServicesSetServicePropertiesOptionalParams,
  FileServicesGetServicePropertiesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listServiceUsagesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesListServiceUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/usages{?api%2Dversion,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24maxpagesize": options?.maxpagesize,
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

export async function _listServiceUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_FileServiceUsages> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _fileServiceUsagesDeserializer(result.body);
}

/** Gets the usages of file service in storage account. */
export function listServiceUsages(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesListServiceUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FileServiceUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listServiceUsagesSend(context, resourceGroupName, accountName, options),
    _listServiceUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _getServiceUsageSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesGetServiceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/usages/default{?api%2Dversion}",
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

export async function _getServiceUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<FileServiceUsage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileServiceUsageDeserializer(result.body);
}

/** Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula. */
export async function getServiceUsage(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesGetServiceUsageOptionalParams = { requestOptions: {} },
): Promise<FileServiceUsage> {
  const result = await _getServiceUsageSend(context, resourceGroupName, accountName, options);
  return _getServiceUsageDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<FileServiceItems> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileServiceItemsDeserializer(result.body);
}

/** List all file services in storage accounts */
export async function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesListOptionalParams = { requestOptions: {} },
): Promise<FileServiceItems> {
  const result = await _listSend(context, resourceGroupName, accountName, options);
  return _listDeserialize(result);
}

export function _setServicePropertiesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: FileServiceProperties,
  options: FileServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default{?api%2Dversion}",
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
    body: fileServicePropertiesSerializer(parameters),
  });
}

export async function _setServicePropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileServicePropertiesDeserializer(result.body);
}

/** Sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules. */
export async function setServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  parameters: FileServiceProperties,
  options: FileServicesSetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<FileServiceProperties> {
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
  options: FileServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default{?api%2Dversion}",
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
): Promise<FileServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileServicePropertiesDeserializer(result.body);
}

/** Gets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules. */
export async function getServiceProperties(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileServicesGetServicePropertiesOptionalParams = { requestOptions: {} },
): Promise<FileServiceProperties> {
  const result = await _getServicePropertiesSend(context, resourceGroupName, accountName, options);
  return _getServicePropertiesDeserialize(result);
}
