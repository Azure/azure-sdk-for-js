// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  StorageAccount,
  storageAccountSerializer,
  storageAccountDeserializer,
  _StorageAccountList,
  _storageAccountListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
  StorageAccountsDeleteOptionalParams,
  StorageAccountsCreateOrUpdateOptionalParams,
  StorageAccountsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDataBoxEdgeDeviceSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: StorageAccountsListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _listByDataBoxEdgeDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageAccountList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _storageAccountListDeserializer(result.body);
}

/** Lists all the StorageAccounts in a Data Box Edge/Data Box Gateway device. */
export function listByDataBoxEdgeDevice(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: StorageAccountsListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDataBoxEdgeDeviceSend(context, deviceName, resourceGroupName, options),
    _listByDataBoxEdgeDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: StorageAccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device. */
export function $delete(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: StorageAccountsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, deviceName, storageAccountName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  storageAccount: StorageAccount,
  options: StorageAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      body: storageAccountSerializer(storageAccount),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAccount> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return storageAccountDeserializer(result.body);
}

/** Creates a new StorageAccount or updates an existing StorageAccount on the device. */
export function createOrUpdate(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  storageAccount: StorageAccount,
  options: StorageAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAccount>, StorageAccount> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        deviceName,
        storageAccountName,
        resourceGroupName,
        storageAccount,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<StorageAccount>, StorageAccount>;
}

export function _getSend(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: StorageAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      storageAccountName: storageAccountName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return storageAccountDeserializer(result.body);
}

/** Gets a StorageAccount by name. */
export async function get(
  context: Client,
  deviceName: string,
  storageAccountName: string,
  resourceGroupName: string,
  options: StorageAccountsGetOptionalParams = { requestOptions: {} },
): Promise<StorageAccount> {
  const result = await _getSend(
    context,
    deviceName,
    storageAccountName,
    resourceGroupName,
    options,
  );
  return _getDeserialize(result);
}
