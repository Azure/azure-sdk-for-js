// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SharedPrivateLinkResource,
  sharedPrivateLinkResourceSerializer,
  sharedPrivateLinkResourceDeserializer,
  _SharedPrivateLinkResourceList,
  _sharedPrivateLinkResourceListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SignalRSharedPrivateLinkResourcesListOptionalParams,
  SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SignalRSharedPrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
): Promise<_SharedPrivateLinkResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sharedPrivateLinkResourceListDeserializer(result.body);
}

/** List shared private link resources */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Delete the specified shared private link resource */
export function $delete(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  parameters: SharedPrivateLinkResource,
  options: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
      body: sharedPrivateLinkResourceSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Create or update a shared private link resource */
export function createOrUpdate(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  parameters: SharedPrivateLinkResource,
  options: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-01-01-preview",
  }) as PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
}

export function _getSend(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01-preview",
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
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Get the specified shared private link resource */
export async function get(
  context: Client,
  sharedPrivateLinkResourceName: string,
  resourceGroupName: string,
  resourceName: string,
  options: SignalRSharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SharedPrivateLinkResource> {
  const result = await _getSend(
    context,
    sharedPrivateLinkResourceName,
    resourceGroupName,
    resourceName,
    options,
  );
  return _getDeserialize(result);
}
