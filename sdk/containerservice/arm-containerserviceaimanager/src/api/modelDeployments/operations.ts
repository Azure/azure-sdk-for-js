// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { ModelDeployment, _ModelDeploymentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  modelDeploymentSerializer,
  modelDeploymentDeserializer,
  _modelDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ModelDeploymentsListByAIManagerNamespaceOptionalParams,
  ModelDeploymentsDeleteOptionalParams,
  ModelDeploymentsCreateOrUpdateOptionalParams,
  ModelDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAIManagerNamespaceSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: ModelDeploymentsListByAIManagerNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/modelDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
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

export async function _listByAIManagerNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ModelDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _modelDeploymentListResultDeserializer(result.body);
}
/** List ModelDeployment resources by AIManagerNamespace */
export function listByAIManagerNamespace(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  options: ModelDeploymentsListByAIManagerNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelDeployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAIManagerNamespaceSend(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        options,
      ),
    _listByAIManagerNamespaceDeserialize,
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
  namespaceName: string,
  modelDeploymentName: string,
  options: ModelDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/modelDeployments/{modelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      modelDeploymentName: modelDeploymentName,
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
/** Delete a ModelDeployment */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  modelDeploymentName: string,
  options: ModelDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        modelDeploymentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  modelDeploymentName: string,
  resource: ModelDeployment,
  options: ModelDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/modelDeployments/{modelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      modelDeploymentName: modelDeploymentName,
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
    body: modelDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ModelDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return modelDeploymentDeserializer(result.body);
}
/** Create or update a `ModelDeployment`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  modelDeploymentName: string,
  resource: ModelDeployment,
  options: ModelDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ModelDeployment>, ModelDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        modelDeploymentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-02-preview",
  }) as PollerLike<OperationState<ModelDeployment>, ModelDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  modelDeploymentName: string,
  options: ModelDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/namespaces/{namespaceName}/modelDeployments/{modelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      namespaceName: namespaceName,
      modelDeploymentName: modelDeploymentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ModelDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return modelDeploymentDeserializer(result.body);
}
/** Get a ModelDeployment */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  namespaceName: string,
  modelDeploymentName: string,
  options: ModelDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<ModelDeployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiManagerName,
    namespaceName,
    modelDeploymentName,
    options,
  );
  return _getDeserialize(result);
}
