// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TagsObject,
  tagsObjectSerializer,
  MaintenanceWindowResource,
  maintenanceWindowResourceSerializer,
  maintenanceWindowResourceDeserializer,
  _MaintenanceWindowResourceListResult,
  _maintenanceWindowResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MaintenanceWindowsListBySubscriptionOptionalParams,
  MaintenanceWindowsListOptionalParams,
  MaintenanceWindowsDeleteOptionalParams,
  MaintenanceWindowsUpdateTagsOptionalParams,
  MaintenanceWindowsCreateOrUpdateOptionalParams,
  MaintenanceWindowsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: MaintenanceWindowsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/maintenanceWindows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceWindowResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _maintenanceWindowResourceListResultDeserializer(result.body);
}

/** Lists maintenance windows in the specified subscription. */
export function listBySubscription(
  context: Client,
  options: MaintenanceWindowsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MaintenanceWindowResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-02-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: MaintenanceWindowsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/maintenanceWindows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaintenanceWindowResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _maintenanceWindowResourceListResultDeserializer(result.body);
}

/** Lists maintenance windows in the specified resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: MaintenanceWindowsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MaintenanceWindowResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  options: MaintenanceWindowsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/maintenanceWindows/{maintenanceWindowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maintenanceWindowName: maintenanceWindowName,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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

/** Deletes a maintenance window. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  options: MaintenanceWindowsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, maintenanceWindowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  properties: TagsObject,
  options: MaintenanceWindowsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/maintenanceWindows/{maintenanceWindowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maintenanceWindowName: maintenanceWindowName,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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
      body: tagsObjectSerializer(properties),
    });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceWindowResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceWindowResourceDeserializer(result.body);
}

/** Updates tags on a maintenance window. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  properties: TagsObject,
  options: MaintenanceWindowsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<MaintenanceWindowResource> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    maintenanceWindowName,
    properties,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  resource: MaintenanceWindowResource,
  options: MaintenanceWindowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/maintenanceWindows/{maintenanceWindowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maintenanceWindowName: maintenanceWindowName,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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
      body: maintenanceWindowResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceWindowResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceWindowResourceDeserializer(result.body);
}

/** Creates or updates a maintenance window. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  resource: MaintenanceWindowResource,
  options: MaintenanceWindowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MaintenanceWindowResource>, MaintenanceWindowResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, maintenanceWindowName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-02-preview",
  }) as PollerLike<OperationState<MaintenanceWindowResource>, MaintenanceWindowResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  options: MaintenanceWindowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/maintenanceWindows/{maintenanceWindowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maintenanceWindowName: maintenanceWindowName,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceWindowResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maintenanceWindowResourceDeserializer(result.body);
}

/** Gets the specified maintenance window. */
export async function get(
  context: Client,
  resourceGroupName: string,
  maintenanceWindowName: string,
  options: MaintenanceWindowsGetOptionalParams = { requestOptions: {} },
): Promise<MaintenanceWindowResource> {
  const result = await _getSend(context, resourceGroupName, maintenanceWindowName, options);
  return _getDeserialize(result);
}
