// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  DataControllerResource,
  DataControllerUpdate,
  _PageOfDataControllerResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dataControllerResourceSerializer,
  dataControllerResourceDeserializer,
  dataControllerUpdateSerializer,
  _pageOfDataControllerResourceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataControllersListInSubscriptionOptionalParams,
  DataControllersListInGroupOptionalParams,
  DataControllersDeleteDataControllerOptionalParams,
  DataControllersPatchDataControllerOptionalParams,
  DataControllersPutDataControllerOptionalParams,
  DataControllersGetDataControllerOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listInSubscriptionSend(
  context: Client,
  options: DataControllersListInSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/dataControllers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageOfDataControllerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pageOfDataControllerResourceDeserializer(result.body);
}

/** List dataController resources in the subscription */
export function listInSubscription(
  context: Client,
  options: DataControllersListInSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataControllerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listInSubscriptionSend(context, options),
    _listInSubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listInGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DataControllersListInGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listInGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageOfDataControllerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pageOfDataControllerResourceDeserializer(result.body);
}

/** List dataController resources in the resource group */
export function listInGroup(
  context: Client,
  resourceGroupName: string,
  options: DataControllersListInGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataControllerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listInGroupSend(context, resourceGroupName, options),
    _listInGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _deleteDataControllerSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: DataControllersDeleteDataControllerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDataControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a dataController resource */
export function deleteDataController(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: DataControllersDeleteDataControllerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteDataControllerDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteDataControllerSend(context, resourceGroupName, dataControllerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _patchDataControllerSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  dataControllerResource: DataControllerUpdate,
  options: DataControllersPatchDataControllerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataControllerUpdateSerializer(dataControllerResource),
  });
}

export async function _patchDataControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<DataControllerResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataControllerResourceDeserializer(result.body);
}

/** Updates a dataController resource */
export function patchDataController(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  dataControllerResource: DataControllerUpdate,
  options: DataControllersPatchDataControllerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataControllerResource>, DataControllerResource> {
  return getLongRunningPoller(context, _patchDataControllerDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _patchDataControllerSend(
        context,
        resourceGroupName,
        dataControllerName,
        dataControllerResource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<DataControllerResource>, DataControllerResource>;
}

export function _putDataControllerSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  dataControllerResource: DataControllerResource,
  options: DataControllersPutDataControllerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataControllerResourceSerializer(dataControllerResource),
  });
}

export async function _putDataControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<DataControllerResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataControllerResourceDeserializer(result.body);
}

/** Creates or replaces a dataController resource */
export function putDataController(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  dataControllerResource: DataControllerResource,
  options: DataControllersPutDataControllerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataControllerResource>, DataControllerResource> {
  return getLongRunningPoller(context, _putDataControllerDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _putDataControllerSend(
        context,
        resourceGroupName,
        dataControllerName,
        dataControllerResource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<DataControllerResource>, DataControllerResource>;
}

export function _getDataControllerSend(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: DataControllersGetDataControllerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/dataControllers/{dataControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataControllerName: dataControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDataControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<DataControllerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataControllerResourceDeserializer(result.body);
}

/** Retrieves a dataController resource */
export async function getDataController(
  context: Client,
  resourceGroupName: string,
  dataControllerName: string,
  options: DataControllersGetDataControllerOptionalParams = { requestOptions: {} },
): Promise<DataControllerResource> {
  const result = await _getDataControllerSend(
    context,
    resourceGroupName,
    dataControllerName,
    options,
  );
  return _getDataControllerDeserialize(result);
}
