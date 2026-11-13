// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext as Client } from "../index.js";
import type { Workspace, WorkspaceUpdate, _WorkspaceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceSerializer,
  workspaceDeserializer,
  workspaceUpdateSerializer,
  _workspaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  options: WorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workspaceListResultDeserializer(result.body);
}

/** Lists workspaces in a project. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  options: WorkspacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, cloudName, projectName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      projectName: projectName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

/** Deletes a workspace. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudName, projectName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  properties: WorkspaceUpdate,
  options: WorkspacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      projectName: projectName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workspaceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Workspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Updates a workspace. */
export async function update(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  properties: WorkspaceUpdate,
  options: WorkspacesUpdateOptionalParams = { requestOptions: {} },
): Promise<Workspace> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    cloudName,
    projectName,
    workspaceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  resource: Workspace,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      projectName: projectName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workspaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Workspace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Creates or updates a workspace. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  resource: Workspace,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workspace>, Workspace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudName,
        projectName,
        workspaceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<Workspace>, Workspace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      projectName: projectName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceDeserializer(result.body);
}

/** Gets a workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  projectName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<Workspace> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudName,
    projectName,
    workspaceName,
    options,
  );
  return _getDeserialize(result);
}
