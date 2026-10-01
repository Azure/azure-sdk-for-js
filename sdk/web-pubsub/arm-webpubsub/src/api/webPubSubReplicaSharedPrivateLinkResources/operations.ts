// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext as Client } from "../index.js";
import type {
  SharedPrivateLinkResource,
  _SharedPrivateLinkResourceList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sharedPrivateLinkResourceSerializer,
  sharedPrivateLinkResourceDeserializer,
  _sharedPrivateLinkResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams,
  WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  options: WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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
  replicaName: string,
  options: WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, replicaName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  sharedPrivateLinkResourceName: string,
  parameters: SharedPrivateLinkResource,
  options: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      replicaName: replicaName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
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
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  sharedPrivateLinkResourceName: string,
  parameters: SharedPrivateLinkResource,
  options: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        sharedPrivateLinkResourceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  sharedPrivateLinkResourceName: string,
  options: WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      replicaName: replicaName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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
  resourceGroupName: string,
  resourceName: string,
  replicaName: string,
  sharedPrivateLinkResourceName: string,
  options: WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SharedPrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    replicaName,
    sharedPrivateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
