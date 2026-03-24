// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  WorkspaceConnectionPropertiesV2BasicResource,
  _WorkspaceConnectionPropertiesV2BasicResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceConnectionPropertiesV2BasicResourceSerializer,
  workspaceConnectionPropertiesV2BasicResourceDeserializer,
  workspaceConnectionUpdateParameterSerializer,
  _workspaceConnectionPropertiesV2BasicResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceConnectionsListSecretsOptionalParams,
  WorkspaceConnectionsListOptionalParams,
  WorkspaceConnectionsDeleteOptionalParams,
  WorkspaceConnectionsUpdateOptionalParams,
  WorkspaceConnectionsCreateOptionalParams,
  WorkspaceConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/listsecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceConnectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** List all the secrets of a machine learning workspaces connections. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsListSecretsOptionalParams = { requestOptions: {} },
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections{?api%2Dversion,target,category,includeAll}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      target: options?.target,
      category: options?.category,
      includeAll: options?.includeAll ?? false,
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
): Promise<_WorkspaceConnectionPropertiesV2BasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workspaceConnectionPropertiesV2BasicResourceArmPaginatedResultDeserializer(result.body);
}

/** Lists all the available machine learning workspaces connections under the specified workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceConnectionPropertiesV2BasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete machine learning workspaces connections by name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : workspaceConnectionUpdateParameterSerializer(options["body"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceConnectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Update machine learning workspaces connections under the specified workspace. */
export async function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsUpdateOptionalParams = { requestOptions: {} },
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : workspaceConnectionPropertiesV2BasicResourceSerializer(options["body"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceConnectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Create or update machine learning workspaces connections under the specified workspace. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsCreateOptionalParams = { requestOptions: {} },
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    connectionName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceConnectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Lists machine learning workspaces connections by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  options: WorkspaceConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceConnectionPropertiesV2BasicResource> {
  const result = await _getSend(context, resourceGroupName, workspaceName, connectionName, options);
  return _getDeserialize(result);
}
