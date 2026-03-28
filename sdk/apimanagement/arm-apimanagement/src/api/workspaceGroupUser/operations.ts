// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { _UserCollection, UserContract } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _userCollectionDeserializer,
  userContractDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceGroupUserDeleteOptionalParams,
  WorkspaceGroupUserCreateOptionalParams,
  WorkspaceGroupUserCheckEntityExistsOptionalParams,
  WorkspaceGroupUserListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/groups/{groupId}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      groupId: groupId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

/** Remove existing user from existing group. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    userId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/groups/{groupId}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      groupId: groupId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<UserContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return userContractDeserializer(result.body);
}

/** Add existing user to existing group */
export async function create(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserCreateOptionalParams = { requestOptions: {} },
): Promise<UserContract> {
  const result = await _createSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    userId,
    options,
  );
  return _createDeserialize(result);
}

export function _checkEntityExistsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserCheckEntityExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/groups/{groupId}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      groupId: groupId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkEntityExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Checks that user entity specified by identifier is associated with the group entity. */
export async function checkEntityExists(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  userId: string,
  options: WorkspaceGroupUserCheckEntityExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkEntityExistsSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    userId,
    options,
  );
  return _checkEntityExistsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  options: WorkspaceGroupUserListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/groups/{groupId}/users{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_UserCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _userCollectionDeserializer(result.body);
}

/** Lists a collection of user entities associated with the group. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  groupId: string,
  options: WorkspaceGroupUserListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UserContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, workspaceId, groupId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}
