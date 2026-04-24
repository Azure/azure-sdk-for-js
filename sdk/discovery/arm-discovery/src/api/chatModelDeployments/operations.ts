// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext as Client } from "../index.js";
import type {
  ChatModelDeployment,
  ChatModelDeploymentUpdate,
  _ChatModelDeploymentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  chatModelDeploymentSerializer,
  chatModelDeploymentDeserializer,
  chatModelDeploymentUpdateSerializer,
  _chatModelDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChatModelDeploymentsListByWorkspaceOptionalParams,
  ChatModelDeploymentsDeleteOptionalParams,
  ChatModelDeploymentsUpdateOptionalParams,
  ChatModelDeploymentsCreateOrUpdateOptionalParams,
  ChatModelDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ChatModelDeploymentsListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/chatModelDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ChatModelDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _chatModelDeploymentListResultDeserializer(result.body);
}

/** List ChatModelDeployment resources by Workspace */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ChatModelDeploymentsListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatModelDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  options: ChatModelDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/chatModelDeployments/{chatModelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      chatModelDeploymentName: chatModelDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a ChatModelDeployment */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  options: ChatModelDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, chatModelDeploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  properties: ChatModelDeploymentUpdate,
  options: ChatModelDeploymentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/chatModelDeployments/{chatModelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      chatModelDeploymentName: chatModelDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: chatModelDeploymentUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatModelDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return chatModelDeploymentDeserializer(result.body);
}

/** Update a ChatModelDeployment */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  properties: ChatModelDeploymentUpdate,
  options: ChatModelDeploymentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        workspaceName,
        chatModelDeploymentName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  resource: ChatModelDeployment,
  options: ChatModelDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/chatModelDeployments/{chatModelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      chatModelDeploymentName: chatModelDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: chatModelDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatModelDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return chatModelDeploymentDeserializer(result.body);
}

/** Create a ChatModelDeployment */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  resource: ChatModelDeployment,
  options: ChatModelDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        chatModelDeploymentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-01-preview",
  }) as PollerLike<OperationState<ChatModelDeployment>, ChatModelDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  options: ChatModelDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/chatModelDeployments/{chatModelDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      chatModelDeploymentName: chatModelDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ChatModelDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return chatModelDeploymentDeserializer(result.body);
}

/** Get a ChatModelDeployment */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  chatModelDeploymentName: string,
  options: ChatModelDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<ChatModelDeployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    chatModelDeploymentName,
    options,
  );
  return _getDeserialize(result);
}
