// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  WorkspacePrivateLinkResource,
  workspacePrivateLinkResourceDeserializer,
  _WorkspacePrivateLinkResourceListResult,
  _workspacePrivateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateLinkResources{?api%2Dversion}",
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
): Promise<_WorkspacePrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workspacePrivateLinkResourceListResultDeserializer(result.body);
}

/** Lists all private link resources for the workspace. */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspacePrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateLinkResourceName: string,
  options: WorkspacePrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/workspaces/{workspaceName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      privateLinkResourceName: privateLinkResourceName,
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
): Promise<WorkspacePrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workspacePrivateLinkResourceDeserializer(result.body);
}

/** Gets the specified private link resource for the workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  privateLinkResourceName: string,
  options: WorkspacePrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<WorkspacePrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
