// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  WorkspacePrivateEndpointConnection,
  workspacePrivateEndpointConnectionSerializer,
  workspacePrivateEndpointConnectionDeserializer,
  _WorkspacePrivateEndpointConnectionListResult,
  _workspacePrivateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkspacePrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workspacePrivateEndpointConnectionListResultDeserializer(result.body);
}

/** Lists all private endpoint connections for a workspace. */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<WorkspacePrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  options: WorkspacePrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes the specified private endpoint connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  options: WorkspacePrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  resource: WorkspacePrivateEndpointConnection,
  options: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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
      body: workspacePrivateEndpointConnectionSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspacePrivateEndpointConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workspacePrivateEndpointConnectionDeserializer(result.body);
}

/** Approves or updates the specified private endpoint connection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  resource: WorkspacePrivateEndpointConnection,
  options: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<WorkspacePrivateEndpointConnection>,
  WorkspacePrivateEndpointConnection
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<WorkspacePrivateEndpointConnection>,
    WorkspacePrivateEndpointConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  options: WorkspacePrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
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
): Promise<WorkspacePrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workspacePrivateEndpointConnectionDeserializer(result.body);
}

/** Gets the specified private endpoint connection associated with the workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateEndpointConnectionName: string,
  options: WorkspacePrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkspacePrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
