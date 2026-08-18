// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { ModelSource, _ModelSourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  modelSourceSerializer,
  modelSourceDeserializer,
  _modelSourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ModelSourcesListOptionalParams,
  ModelSourcesDeleteOptionalParams,
  ModelSourcesCreateOrUpdateOptionalParams,
  ModelSourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: ModelSourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/modelSources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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
): Promise<_ModelSourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _modelSourceListResultDeserializer(result.body);
}
/** List ModelSource resources by AIManager */
export function list(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: ModelSourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelSource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, aiManagerName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  options: ModelSourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/modelSources/{modelSourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      modelSourceName: modelSourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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
/** Delete a ModelSource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  options: ModelSourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, aiManagerName, modelSourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  resource: ModelSource,
  options: ModelSourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/modelSources/{modelSourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      modelSourceName: modelSourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: modelSourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ModelSource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return modelSourceDeserializer(result.body);
}
/** Create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  resource: ModelSource,
  options: ModelSourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ModelSource>, ModelSource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        aiManagerName,
        modelSourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<ModelSource>, ModelSource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  options: ModelSourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/modelSources/{modelSourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      modelSourceName: modelSourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ModelSource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return modelSourceDeserializer(result.body);
}
/** Get a ModelSource */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  modelSourceName: string,
  options: ModelSourcesGetOptionalParams = { requestOptions: {} },
): Promise<ModelSource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiManagerName,
    modelSourceName,
    options,
  );
  return _getDeserialize(result);
}
