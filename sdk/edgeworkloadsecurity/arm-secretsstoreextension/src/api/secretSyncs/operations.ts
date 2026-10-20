// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecretsStoreExtensionManagementContext as Client } from "../index.js";
import type { SecretSync, SecretSyncUpdate, _SecretSyncListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  secretSyncSerializer,
  secretSyncDeserializer,
  secretSyncUpdateSerializer,
  _secretSyncListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecretSyncsListBySubscriptionOptionalParams,
  SecretSyncsListByResourceGroupOptionalParams,
  SecretSyncsDeleteOptionalParams,
  SecretSyncsUpdateOptionalParams,
  SecretSyncsCreateOrUpdateOptionalParams,
  SecretSyncsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: SecretSyncsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SecretSyncController/secretSyncs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecretSyncListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _secretSyncListResultDeserializer(result.body);
}

/** Lists the SecretSync instances within an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: SecretSyncsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecretSync> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-25-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SecretSyncsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecretSyncController/secretSyncs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecretSyncListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _secretSyncListResultDeserializer(result.body);
}

/** Lists the SecretSync instances within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SecretSyncsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecretSync> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-25-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  options: SecretSyncsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecretSyncController/secretSyncs/{secretSyncName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      secretSyncName: secretSyncName,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
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

/** Deletes a SecretSync instance. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  options: SecretSyncsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, secretSyncName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-25-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  properties: SecretSyncUpdate,
  options: SecretSyncsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecretSyncController/secretSyncs/{secretSyncName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      secretSyncName: secretSyncName,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: secretSyncUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SecretSync> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretSyncDeserializer(result.body);
}

/** Updates a SecretSync instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  properties: SecretSyncUpdate,
  options: SecretSyncsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecretSync>, SecretSync> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, secretSyncName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-25-preview",
  }) as PollerLike<OperationState<SecretSync>, SecretSync>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  resource: SecretSync,
  options: SecretSyncsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecretSyncController/secretSyncs/{secretSyncName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      secretSyncName: secretSyncName,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: secretSyncSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretSync> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretSyncDeserializer(result.body);
}

/** Creates new or updates a SecretSync instance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  resource: SecretSync,
  options: SecretSyncsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecretSync>, SecretSync> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, secretSyncName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-25-preview",
  }) as PollerLike<OperationState<SecretSync>, SecretSync>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  options: SecretSyncsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecretSyncController/secretSyncs/{secretSyncName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      secretSyncName: secretSyncName,
      "api%2Dversion": context.apiVersion ?? "2026-09-25-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecretSync> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretSyncDeserializer(result.body);
}

/** Gets the properties of a SecretSync instance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  secretSyncName: string,
  options: SecretSyncsGetOptionalParams = { requestOptions: {} },
): Promise<SecretSync> {
  const result = await _getSend(context, resourceGroupName, secretSyncName, options);
  return _getDeserialize(result);
}
