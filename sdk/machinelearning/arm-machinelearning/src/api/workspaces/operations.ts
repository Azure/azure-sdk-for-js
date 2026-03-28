// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  Workspace,
  NotebookResourceInfo,
  WorkspaceUpdateParameters,
  _WorkspaceListResult,
  DiagnoseResponseResult,
  ListWorkspaceKeysResult,
  ListNotebookKeysResult,
  NotebookAccessTokenResult,
  ListStorageAccountKeysResult,
  ExternalFqdnResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceSerializer,
  workspaceDeserializer,
  notebookResourceInfoDeserializer,
  workspaceUpdateParametersSerializer,
  _workspaceListResultDeserializer,
  diagnoseWorkspaceParametersSerializer,
  diagnoseResponseResultDeserializer,
  listWorkspaceKeysResultDeserializer,
  listNotebookKeysResultDeserializer,
  notebookAccessTokenResultDeserializer,
  listStorageAccountKeysResultDeserializer,
  externalFqdnResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspacesResyncKeysOptionalParams,
  WorkspacesPrepareNotebookOptionalParams,
  WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams,
  WorkspacesListStorageAccountKeysOptionalParams,
  WorkspacesListNotebookKeysOptionalParams,
  WorkspacesListNotebookAccessTokenOptionalParams,
  WorkspacesListKeysOptionalParams,
  WorkspacesDiagnoseOptionalParams,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resyncKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesResyncKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/resyncKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resyncKeysDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry */
export function resyncKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesResyncKeysOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resyncKeysDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resyncKeysSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _prepareNotebookSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesPrepareNotebookOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/prepareNotebook{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _prepareNotebookDeserialize(
  result: PathUncheckedResponse,
): Promise<NotebookResourceInfo> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notebookResourceInfoDeserializer(result.body);
}

/** Prepare Azure Machine Learning Workspace's notebook resource */
export function prepareNotebook(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesPrepareNotebookOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NotebookResourceInfo>, NotebookResourceInfo> {
  return getLongRunningPoller(context, _prepareNotebookDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _prepareNotebookSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<NotebookResourceInfo>, NotebookResourceInfo>;
}

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listOutboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalFqdnResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return externalFqdnResponseDeserializer(result.body);
}

/** Called by Client (Portal, CLI, etc) to get a list of all external outbound dependencies (FQDNs) programmatically. */
export async function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): Promise<ExternalFqdnResponse> {
  const result = await _listOutboundNetworkDependenciesEndpointsSend(
    context,
    resourceGroupName,
    workspaceName,
    options,
  );
  return _listOutboundNetworkDependenciesEndpointsDeserialize(result);
}

export function _listStorageAccountKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListStorageAccountKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listStorageAccountKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listStorageAccountKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ListStorageAccountKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return listStorageAccountKeysResultDeserializer(result.body);
}

/** Lists keys of Azure Machine Learning Workspace's storage account. */
export async function listStorageAccountKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListStorageAccountKeysOptionalParams = { requestOptions: {} },
): Promise<ListStorageAccountKeysResult> {
  const result = await _listStorageAccountKeysSend(
    context,
    resourceGroupName,
    workspaceName,
    options,
  );
  return _listStorageAccountKeysDeserialize(result);
}

export function _listNotebookKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListNotebookKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listNotebookKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ListNotebookKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return listNotebookKeysResultDeserializer(result.body);
}

/** Lists keys of Azure Machine Learning Workspaces notebook. */
export async function listNotebookKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListNotebookKeysOptionalParams = { requestOptions: {} },
): Promise<ListNotebookKeysResult> {
  const result = await _listNotebookKeysSend(context, resourceGroupName, workspaceName, options);
  return _listNotebookKeysDeserialize(result);
}

export function _listNotebookAccessTokenSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListNotebookAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookAccessToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listNotebookAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<NotebookAccessTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notebookAccessTokenResultDeserializer(result.body);
}

/** Get Azure Machine Learning Workspace notebook access token */
export async function listNotebookAccessToken(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListNotebookAccessTokenOptionalParams = { requestOptions: {} },
): Promise<NotebookAccessTokenResult> {
  const result = await _listNotebookAccessTokenSend(
    context,
    resourceGroupName,
    workspaceName,
    options,
  );
  return _listNotebookAccessTokenDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ListWorkspaceKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return listWorkspaceKeysResultDeserializer(result.body);
}

/** Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesListKeysOptionalParams = { requestOptions: {} },
): Promise<ListWorkspaceKeysResult> {
  const result = await _listKeysSend(context, resourceGroupName, workspaceName, options);
  return _listKeysDeserialize(result);
}

export function _diagnoseSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesDiagnoseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/diagnose{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : diagnoseWorkspaceParametersSerializer(options["body"]),
  });
}

export async function _diagnoseDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnoseResponseResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return diagnoseResponseResultDeserializer(result.body);
}

/** Diagnose workspace setup issue. */
export function diagnose(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesDiagnoseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiagnoseResponseResult>, DiagnoseResponseResult> {
  return getLongRunningPoller(context, _diagnoseDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _diagnoseSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<DiagnoseResponseResult>, DiagnoseResponseResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: WorkspacesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/workspaces{?api%2Dversion,kind,%24skip,aiCapabilities}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      kind: options?.kind,
      "%24skip": options?.skip,
      aiCapabilities: options?.aiCapabilities,
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
): Promise<_WorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workspaceListResultDeserializer(result.body);
}

/** Lists all the available machine learning workspaces under the specified subscription. */
export function listBySubscription(
  context: Client,
  options: WorkspacesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces{?api%2Dversion,kind,%24skip,aiCapabilities}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      kind: options?.kind,
      "%24skip": options?.skip,
      aiCapabilities: options?.aiCapabilities,
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
): Promise<_WorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workspaceListResultDeserializer(result.body);
}

/** Lists all the available machine learning workspaces under the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}{?api%2Dversion,forceToPurge}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      forceToPurge: options?.forceToPurge ?? false,
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a machine learning workspace. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspaceUpdateParameters,
  options: WorkspacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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
    body: workspaceUpdateParametersSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Workspace> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Updates a machine learning workspace with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspaceUpdateParameters,
  options: WorkspacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workspace>, Workspace> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, workspaceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Workspace>, Workspace>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: Workspace,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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
    body: workspaceSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Workspace> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Creates or updates a workspace with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: Workspace,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workspace>, Workspace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, workspaceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Workspace>, Workspace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Workspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Gets the properties of the specified machine learning workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<Workspace> {
  const result = await _getSend(context, resourceGroupName, workspaceName, options);
  return _getDeserialize(result);
}
