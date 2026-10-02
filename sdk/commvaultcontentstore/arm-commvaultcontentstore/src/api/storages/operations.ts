// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type { Storage, _StorageListResult, StorageCreateOrUpdate } from "../../models/models.js";
import {
  errorResponseDeserializer,
  storageDeserializer,
  _storageListResultDeserializer,
  storageCreateOrUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StoragesRefreshOptionalParams,
  StoragesDisableComplianceLockOptionalParams,
  StoragesEnableComplianceLockOptionalParams,
  StoragesListByCloudAccountOptionalParams,
  StoragesDeleteOptionalParams,
  StoragesCreateOrUpdateOptionalParams,
  StoragesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesRefreshOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}/refresh{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _refreshDeserialize(result: PathUncheckedResponse): Promise<Storage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageDeserializer(result.body);
}

/** Refresh storage state from partner. Fetches latest compliance lock status from Commvault and updates the ARM resource. */
export async function refresh(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesRefreshOptionalParams = { requestOptions: {} },
): Promise<Storage> {
  const result = await _refreshSend(
    context,
    resourceGroupName,
    cloudAccountName,
    storageName,
    options,
  );
  return _refreshDeserialize(result);
}

export function _disableComplianceLockSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesDisableComplianceLockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}/disableComplianceLock{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _disableComplianceLockDeserialize(
  result: PathUncheckedResponse,
): Promise<Storage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageDeserializer(result.body);
}

/** Disable compliance lock on the storage. Initiates an out-of-band multi-person authorization (MPA) email approval workflow on the partner side. The storage compliance lock status transitions to 'DisablementPending' immediately; once the MPA approval completes, the status becomes 'Disabled' (observable via the refresh action). */
export async function disableComplianceLock(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesDisableComplianceLockOptionalParams = { requestOptions: {} },
): Promise<Storage> {
  const result = await _disableComplianceLockSend(
    context,
    resourceGroupName,
    cloudAccountName,
    storageName,
    options,
  );
  return _disableComplianceLockDeserialize(result);
}

export function _enableComplianceLockSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesEnableComplianceLockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}/enableComplianceLock{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _enableComplianceLockDeserialize(
  result: PathUncheckedResponse,
): Promise<Storage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageDeserializer(result.body);
}

/** Enable compliance lock on the storage. Synchronous operation. */
export async function enableComplianceLock(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesEnableComplianceLockOptionalParams = { requestOptions: {} },
): Promise<Storage> {
  const result = await _enableComplianceLockSend(
    context,
    resourceGroupName,
    cloudAccountName,
    storageName,
    options,
  );
  return _enableComplianceLockDeserialize(result);
}

export function _listByCloudAccountSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: StoragesListByCloudAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _listByCloudAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageListResultDeserializer(result.body);
}

/** List Storage resources by CloudAccount */
export function listByCloudAccount(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: StoragesListByCloudAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Storage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCloudAccountSend(context, resourceGroupName, cloudAccountName, options),
    _listByCloudAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Storage */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudAccountName, storageName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  resource: StorageCreateOrUpdate,
  options: StoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Storage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageDeserializer(result.body);
}

/** Create a Storage */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  resource: StorageCreateOrUpdate,
  options: StoragesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Storage>, Storage> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudAccountName,
        storageName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<Storage>, Storage>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/storages/{storageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      storageName: storageName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Storage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageDeserializer(result.body);
}

/** Get a Storage */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  storageName: string,
  options: StoragesGetOptionalParams = { requestOptions: {} },
): Promise<Storage> {
  const result = await _getSend(context, resourceGroupName, cloudAccountName, storageName, options);
  return _getDeserialize(result);
}
