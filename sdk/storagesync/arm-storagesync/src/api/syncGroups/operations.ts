// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext as Client } from "../index.js";
import type { SyncGroup, SyncGroupCreateParameters, _SyncGroupArray } from "../../models/models.js";
import {
  storageSyncErrorDeserializer,
  syncGroupDeserializer,
  syncGroupCreateParametersSerializer,
  _syncGroupArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SyncGroupsListByStorageSyncServiceOptionalParams,
  SyncGroupsDeleteOptionalParams,
  SyncGroupsCreateOptionalParams,
  SyncGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByStorageSyncServiceSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: SyncGroupsListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listByStorageSyncServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SyncGroupArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _syncGroupArrayDeserializer(result.body);
}

/** Get a SyncGroup List. */
export function listByStorageSyncService(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: SyncGroupsListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SyncGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStorageSyncServiceSend(context, resourceGroupName, storageSyncServiceName, options),
    _listByStorageSyncServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: SyncGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a given SyncGroup. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: SyncGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  parameters: SyncGroupCreateParameters,
  options: SyncGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: syncGroupCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SyncGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return syncGroupDeserializer(result.body);
}

/** Create a new SyncGroup. */
export async function create(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  parameters: SyncGroupCreateParameters,
  options: SyncGroupsCreateOptionalParams = { requestOptions: {} },
): Promise<SyncGroup> {
  const result = await _createSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: SyncGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      syncGroupName: syncGroupName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SyncGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return syncGroupDeserializer(result.body);
}

/** Get a given SyncGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  syncGroupName: string,
  options: SyncGroupsGetOptionalParams = { requestOptions: {} },
): Promise<SyncGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    syncGroupName,
    options,
  );
  return _getDeserialize(result);
}
