// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { WorkspaceManagerGroup, _WorkspaceManagerGroupList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceManagerGroupSerializer,
  workspaceManagerGroupDeserializer,
  _workspaceManagerGroupListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceManagerGroupsListOptionalParams,
  WorkspaceManagerGroupsDeleteOptionalParams,
  WorkspaceManagerGroupsCreateOrUpdateOptionalParams,
  WorkspaceManagerGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceManagerGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerGroups{?api%2Dversion,%24orderby,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_WorkspaceManagerGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workspaceManagerGroupListDeserializer(result.body);
}

/** Gets all workspace manager groups in the Sentinel workspace manager */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceManagerGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceManagerGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  options: WorkspaceManagerGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerGroups/{workspaceManagerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerGroupName: workspaceManagerGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

/** Deletes a workspace manager group */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  options: WorkspaceManagerGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  workspaceManagerGroup: WorkspaceManagerGroup,
  options: WorkspaceManagerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerGroups/{workspaceManagerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerGroupName: workspaceManagerGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workspaceManagerGroupSerializer(workspaceManagerGroup),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceManagerGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceManagerGroupDeserializer(result.body);
}

/** Creates or updates a workspace manager group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  workspaceManagerGroup: WorkspaceManagerGroup,
  options: WorkspaceManagerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<WorkspaceManagerGroup> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerGroupName,
    workspaceManagerGroup,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  options: WorkspaceManagerGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerGroups/{workspaceManagerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerGroupName: workspaceManagerGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
): Promise<WorkspaceManagerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceManagerGroupDeserializer(result.body);
}

/** Gets a workspace manager group */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerGroupName: string,
  options: WorkspaceManagerGroupsGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceManagerGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerGroupName,
    options,
  );
  return _getDeserialize(result);
}
