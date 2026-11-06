// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext as Client } from "../index.js";
import type {
  AzureServiceConnectionController,
  AzureServiceConnectionControllerTagsUpdate,
  _AzureServiceConnectionControllerListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  azureServiceConnectionControllerSerializer,
  azureServiceConnectionControllerDeserializer,
  azureServiceConnectionControllerTagsUpdateSerializer,
  _azureServiceConnectionControllerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureServiceConnectionControllersListBySubscriptionOptionalParams,
  AzureServiceConnectionControllersListByResourceGroupOptionalParams,
  AzureServiceConnectionControllersUpdateOptionalParams,
  AzureServiceConnectionControllersDeleteOptionalParams,
  AzureServiceConnectionControllersCreateOrUpdateOptionalParams,
  AzureServiceConnectionControllersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: AzureServiceConnectionControllersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/azureServiceConnectionControllers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_AzureServiceConnectionControllerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _azureServiceConnectionControllerListResultDeserializer(result.body);
}

/** Lists all Azure Service Connection Controllers within a subscription. */
export function listBySubscription(
  context: Client,
  options: AzureServiceConnectionControllersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AzureServiceConnectionController> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AzureServiceConnectionControllersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureServiceConnectionControllers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_AzureServiceConnectionControllerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _azureServiceConnectionControllerListResultDeserializer(result.body);
}

/** Lists all Azure Service Connection Controllers within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AzureServiceConnectionControllersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AzureServiceConnectionController> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  properties: AzureServiceConnectionControllerTagsUpdate,
  options: AzureServiceConnectionControllersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureServiceConnectionControllers/{azureServiceConnectionControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureServiceConnectionControllerName: azureServiceConnectionControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureServiceConnectionControllerTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureServiceConnectionController> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureServiceConnectionControllerDeserializer(result.body);
}

/** Updates the tags of an Azure Service Connection Controller. */
export async function update(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  properties: AzureServiceConnectionControllerTagsUpdate,
  options: AzureServiceConnectionControllersUpdateOptionalParams = { requestOptions: {} },
): Promise<AzureServiceConnectionController> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    azureServiceConnectionControllerName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  options: AzureServiceConnectionControllersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureServiceConnectionControllers/{azureServiceConnectionControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureServiceConnectionControllerName: azureServiceConnectionControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

/** Deletes an Azure Service Connection Controller. Only its owning Probing Gateway may call this operation. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  options: AzureServiceConnectionControllersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, azureServiceConnectionControllerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  resource: AzureServiceConnectionController,
  options: AzureServiceConnectionControllersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureServiceConnectionControllers/{azureServiceConnectionControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureServiceConnectionControllerName: azureServiceConnectionControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureServiceConnectionControllerSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureServiceConnectionController> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureServiceConnectionControllerDeserializer(result.body);
}

/** Creates or updates an Azure Service Connection Controller. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  resource: AzureServiceConnectionController,
  options: AzureServiceConnectionControllersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AzureServiceConnectionController>, AzureServiceConnectionController> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        azureServiceConnectionControllerName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<
    OperationState<AzureServiceConnectionController>,
    AzureServiceConnectionController
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  options: AzureServiceConnectionControllersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureServiceConnectionControllers/{azureServiceConnectionControllerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureServiceConnectionControllerName: azureServiceConnectionControllerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureServiceConnectionController> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return azureServiceConnectionControllerDeserializer(result.body);
}

/** Gets an Azure Service Connection Controller. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureServiceConnectionControllerName: string,
  options: AzureServiceConnectionControllersGetOptionalParams = { requestOptions: {} },
): Promise<AzureServiceConnectionController> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureServiceConnectionControllerName,
    options,
  );
  return _getDeserialize(result);
}
