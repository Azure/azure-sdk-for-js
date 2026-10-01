// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type {
  RestoreProtectionItemRequest,
  RestoreProtectionItemResponse,
  ProtectedItem,
  _ProtectedItemListResult,
  RestorePoints,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  restoreProtectionItemRequestSerializer,
  restoreProtectionItemResponseDeserializer,
  protectedItemDeserializer,
  _protectedItemListResultDeserializer,
  restorePointsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProtectedItemsRestoreOptionalParams,
  ProtectedItemsGetRestorePointsOptionalParams,
  ProtectedItemsListByProtectionGroupOptionalParams,
  ProtectedItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  request: RestoreProtectionItemRequest,
  options: ProtectedItemsRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/protectedItems/{protectedItemName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: restoreProtectionItemRequestSerializer(request),
  });
}

export async function _restoreDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreProtectionItemResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return restoreProtectionItemResponseDeserializer(result.body);
}

/** Restore resource for a protected item. */
export async function restore(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  request: RestoreProtectionItemRequest,
  options: ProtectedItemsRestoreOptionalParams = { requestOptions: {} },
): Promise<RestoreProtectionItemResponse> {
  const result = await _restoreSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    protectedItemName,
    request,
    options,
  );
  return _restoreDeserialize(result);
}

export function _getRestorePointsSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  options: ProtectedItemsGetRestorePointsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/protectedItems/{protectedItemName}/getRestorePoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _getRestorePointsDeserialize(
  result: PathUncheckedResponse,
): Promise<RestorePoints> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return restorePointsDeserializer(result.body);
}

/** Limits used for creation of resources. */
export async function getRestorePoints(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  options: ProtectedItemsGetRestorePointsOptionalParams = { requestOptions: {} },
): Promise<RestorePoints> {
  const result = await _getRestorePointsSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    protectedItemName,
    options,
  );
  return _getRestorePointsDeserialize(result);
}

export function _listByProtectionGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectedItemsListByProtectionGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/protectedItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _listByProtectionGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProtectedItemListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _protectedItemListResultDeserializer(result.body);
}

/** List ProtectedItem resources by ProtectionGroup */
export function listByProtectionGroup(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  options: ProtectedItemsListByProtectionGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectedItem> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByProtectionGroupSend(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        options,
      ),
    _listByProtectionGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  options: ProtectedItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/protectionGroups/{protectionGroupName}/protectedItems/{protectedItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      protectionGroupName: protectionGroupName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProtectedItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return protectedItemDeserializer(result.body);
}

/** Get a ProtectedItem */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  protectionGroupName: string,
  protectedItemName: string,
  options: ProtectedItemsGetOptionalParams = { requestOptions: {} },
): Promise<ProtectedItem> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudAccountName,
    protectionGroupName,
    protectedItemName,
    options,
  );
  return _getDeserialize(result);
}
