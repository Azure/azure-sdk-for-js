// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  FileShare,
  DeletedShare,
  LeaseShareResponse,
  _FileShareItems,
  FileShareItem,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  fileShareSerializer,
  fileShareDeserializer,
  deletedShareSerializer,
  leaseShareRequestSerializer,
  leaseShareResponseDeserializer,
  _fileShareItemsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FileSharesListOptionalParams,
  FileSharesLeaseOptionalParams,
  FileSharesRestoreOptionalParams,
  FileSharesDeleteOptionalParams,
  FileSharesUpdateOptionalParams,
  FileSharesCreateOptionalParams,
  FileSharesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileSharesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares{?api%2Dversion,%24maxpagesize,%24filter,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24maxpagesize": options?.maxpagesize,
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_FileShareItems> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _fileShareItemsDeserializer(result.body);
}

/** Lists all shares. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: FileSharesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FileShareItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _leaseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}/lease{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsSnapshot !== undefined ? { "x-ms-snapshot": options?.xMsSnapshot } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options?.parameters
      ? options?.parameters
      : leaseShareRequestSerializer(options?.parameters),
  });
}

export async function _leaseDeserialize(
  result: PathUncheckedResponse,
): Promise<LeaseShareResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return leaseShareResponseDeserializer(result.body);
}

/** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
export async function lease(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesLeaseOptionalParams = { requestOptions: {} },
): Promise<LeaseShareResponse> {
  const result = await _leaseSend(context, resourceGroupName, accountName, shareName, options);
  return _leaseDeserialize(result);
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  deletedShare: DeletedShare,
  options: FileSharesRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: deletedShareSerializer(deletedShare),
  });
}

export async function _restoreDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Restore a file share within a valid retention days if share soft delete is enabled */
export async function restore(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  deletedShare: DeletedShare,
  options: FileSharesRestoreOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restoreSend(
    context,
    resourceGroupName,
    accountName,
    shareName,
    deletedShare,
    options,
  );
  return _restoreDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}{?api%2Dversion,%24include}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24include": options?.include,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsSnapshot !== undefined ? { "x-ms-snapshot": options?.xMsSnapshot } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes specified share under its account. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, accountName, shareName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  fileShare: FileShare,
  options: FileSharesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fileShareSerializer(fileShare),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FileShare> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileShareDeserializer(result.body);
}

/** Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist. */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  fileShare: FileShare,
  options: FileSharesUpdateOptionalParams = { requestOptions: {} },
): Promise<FileShare> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  fileShare: FileShare,
  options: FileSharesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fileShareSerializer(fileShare),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<FileShare> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileShareDeserializer(result.body);
}

/** Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  fileShare: FileShare,
  options: FileSharesCreateOptionalParams = { requestOptions: {} },
): Promise<FileShare> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    shareName,
    fileShare,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      shareName: shareName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsSnapshot !== undefined ? { "x-ms-snapshot": options?.xMsSnapshot } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FileShare> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return fileShareDeserializer(result.body);
}

/** Gets properties of a specified share. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  shareName: string,
  options: FileSharesGetOptionalParams = { requestOptions: {} },
): Promise<FileShare> {
  const result = await _getSend(context, resourceGroupName, accountName, shareName, options);
  return _getDeserialize(result);
}
