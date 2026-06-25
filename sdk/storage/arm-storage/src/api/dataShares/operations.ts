// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer_1,
  DataShare,
  dataShareSerializer,
  dataShareDeserializer,
  DataShareUpdate,
  dataShareUpdateSerializer,
  _DataShareListResult,
  _dataShareListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DataSharesListByStorageAccountOptionalParams,
  DataSharesDeleteOptionalParams,
  DataSharesUpdateOptionalParams,
  DataSharesCreateOptionalParams,
  DataSharesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByStorageAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DataSharesListByStorageAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares{?api%2Dversion}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByStorageAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataShareListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _dataShareListResultDeserializer(result.body);
}

/** List all Storage DataShares in a Storage Account. */
export function listByStorageAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DataSharesListByStorageAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataShare> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStorageAccountSend(context, resourceGroupName, accountName, options),
    _listByStorageAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  options: DataSharesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      dataShareName: dataShareName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Storage DataShare. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  options: DataSharesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, dataShareName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  properties: DataShareUpdate,
  options: DataSharesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      dataShareName: dataShareName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: dataShareUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DataShare> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return dataShareDeserializer(result.body);
}

/** Update a Storage DataShare. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  properties: DataShareUpdate,
  options: DataSharesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataShare>, DataShare> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, dataShareName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<DataShare>, DataShare>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  resource: DataShare,
  options: DataSharesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      dataShareName: dataShareName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
      body: dataShareSerializer(resource),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<DataShare> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return dataShareDeserializer(result.body);
}

/** Create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  resource: DataShare,
  options: DataSharesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataShare>, DataShare> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, dataShareName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<DataShare>, DataShare>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  options: DataSharesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      dataShareName: dataShareName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DataShare> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return dataShareDeserializer(result.body);
}

/** Get the specified Storage DataShare. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  dataShareName: string,
  options: DataSharesGetOptionalParams = { requestOptions: {} },
): Promise<DataShare> {
  const result = await _getSend(context, resourceGroupName, accountName, dataShareName, options);
  return _getDeserialize(result);
}
