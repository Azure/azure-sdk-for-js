// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentPlatformContext as Client } from "../index.js";
import type {
  WorkspaceResource,
  _WorkspaceResourceListResult,
  WorkspaceSaaSData,
  WorkspaceLinkedSaaSListResponse,
  WorkspaceDetail,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceResourceSerializer,
  workspaceResourceDeserializer,
  _workspaceResourceListResultDeserializer,
  workspaceSaaSDataSerializer,
  workspaceLinkedSaaSListResponseDeserializer,
  workspaceDetailDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspacesGetDetailsOptionalParams,
  WorkspacesListLinkedSaaSOptionalParams,
  WorkspacesLinkSaaSOptionalParams,
  WorkspacesListByOrganizationOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getDetailsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesGetDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}/getWorkspaceDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceDetail> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceDetailDeserializer(result.body);
}

/** Returns the complete Workspace details reported by Kore, including its projects. */
export async function getDetails(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesGetDetailsOptionalParams = { requestOptions: {} },
): Promise<WorkspaceDetail> {
  const result = await _getDetailsSend(
    context,
    resourceGroupName,
    organizationName,
    workspaceName,
    options,
  );
  return _getDetailsDeserialize(result);
}

export function _listLinkedSaaSSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesListLinkedSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}/listLinkedSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listLinkedSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceLinkedSaaSListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceLinkedSaaSListResponseDeserializer(result.body);
}

/** Returns the list of SaaS resources linked to the workspace. */
export async function listLinkedSaaS(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesListLinkedSaaSOptionalParams = { requestOptions: {} },
): Promise<WorkspaceLinkedSaaSListResponse> {
  const result = await _listLinkedSaaSSend(
    context,
    resourceGroupName,
    organizationName,
    workspaceName,
    options,
  );
  return _listLinkedSaaSDeserialize(result);
}

export function _linkSaaSSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  body: WorkspaceSaaSData,
  options: WorkspacesLinkSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}/linkSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: workspaceSaaSDataSerializer(body),
  });
}

export async function _linkSaaSDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Links SaaS resources to the workspace. Accepts the full list of SaaS assets to be linked. */
export function linkSaaS(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  body: WorkspaceSaaSData,
  options: WorkspacesLinkSaaSOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _linkSaaSDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkSaaSSend(context, resourceGroupName, organizationName, workspaceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByOrganizationSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: WorkspacesListByOrganizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listByOrganizationDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkspaceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workspaceResourceListResultDeserializer(result.body);
}

/** List Workspaces under an Organization. */
export function listByOrganization(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: WorkspacesListByOrganizationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByOrganizationSend(context, resourceGroupName, organizationName, options),
    _listByOrganizationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

/** Delete a Workspace under an Organization (long-running). */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, organizationName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  resource: WorkspaceResource,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workspaceResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceResourceDeserializer(result.body);
}

/** Create or update a Workspace under an Organization (long-running). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  resource: WorkspaceResource,
  options: WorkspacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkspaceResource>, WorkspaceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        workspaceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<WorkspaceResource>, WorkspaceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Kore.AgentPlatform/organizations/{organizationName}/workspaces/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkspaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspaceResourceDeserializer(result.body);
}

/** Get a Workspace under an Organization. */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  workspaceName: string,
  options: WorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    workspaceName,
    options,
  );
  return _getDeserialize(result);
}
