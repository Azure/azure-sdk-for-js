// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubContext as Client } from "./index.js";
import {
  AddToGroupsRequest,
  addToGroupsRequestSerializer,
  ClientTokenResponse,
  clientTokenResponseDeserializer,
  RemoveFromGroupsRequest,
  removeFromGroupsRequestSerializer,
  _GroupMemberPagedValues,
  _groupMemberPagedValuesDeserializer,
  GroupMember,
  MessageContentType,
  WebPubSubPermission,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  AddUserToGroupOptionalParams,
  RemoveUserFromGroupOptionalParams,
  RemoveUserFromAllGroupsOptionalParams,
  SendToUserOptionalParams,
  CloseUserConnectionsOptionalParams,
  UserExistsOptionalParams,
  GrantPermissionOptionalParams,
  CheckPermissionOptionalParams,
  RevokePermissionOptionalParams,
  AddConnectionToGroupOptionalParams,
  RemoveConnectionFromGroupOptionalParams,
  ListConnectionsInGroupOptionalParams,
  SendToGroupOptionalParams,
  CloseGroupConnectionsOptionalParams,
  GroupExistsOptionalParams,
  RemoveConnectionFromAllGroupsOptionalParams,
  SendToConnectionOptionalParams,
  ConnectionExistsOptionalParams,
  CloseConnectionOptionalParams,
  SendToAllOptionalParams,
  RemoveConnectionsFromGroupsOptionalParams,
  GenerateClientTokenOptionalParams,
  CloseAllConnectionsOptionalParams,
  AddConnectionsToGroupsOptionalParams,
  GetServiceStatusOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _addUserToGroupSend(
  context: Client,
  group: string,
  userId: string,
  options: AddUserToGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}/groups/{group}{?api%2Dversion}",
    {
      hub: context.hub,
      group: group,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({ ...operationOptionsToRequestParameters(options) });
}

export async function _addUserToGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Add a user to the target group. */
export async function addUserToGroup(
  context: Client,
  group: string,
  userId: string,
  options: AddUserToGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _addUserToGroupSend(context, group, userId, options);
  return _addUserToGroupDeserialize(result);
}

export function _removeUserFromGroupSend(
  context: Client,
  group: string,
  userId: string,
  options: RemoveUserFromGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}/groups/{group}{?api%2Dversion}",
    {
      hub: context.hub,
      group: group,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _removeUserFromGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove a user from the target group. */
export async function removeUserFromGroup(
  context: Client,
  group: string,
  userId: string,
  options: RemoveUserFromGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeUserFromGroupSend(context, group, userId, options);
  return _removeUserFromGroupDeserialize(result);
}

export function _removeUserFromAllGroupsSend(
  context: Client,
  userId: string,
  options: RemoveUserFromAllGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}/groups{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _removeUserFromAllGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove a user from all groups. */
export async function removeUserFromAllGroups(
  context: Client,
  userId: string,
  options: RemoveUserFromAllGroupsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeUserFromAllGroupsSend(context, userId, options);
  return _removeUserFromAllGroupsDeserialize(result);
}

export function _sendToUserSend(
  context: Client,
  userId: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}/:send{?api%2Dversion,filter,messageTtlSeconds}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      filter: options?.filter,
      messageTtlSeconds: options?.messageTtlSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: message,
    });
}

export async function _sendToUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Send content inside request body to the specific user. */
export async function sendToUser(
  context: Client,
  userId: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendToUserSend(context, userId, contentType, message, options);
  return _sendToUserDeserialize(result);
}

export function _closeUserConnectionsSend(
  context: Client,
  userId: string,
  options: CloseUserConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}/:closeConnections{?api%2Dversion,excluded,reason}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      excluded: !options?.excluded
        ? options?.excluded
        : options?.excluded.map((p: any) => {
            return p;
          }),
      reason: options?.reason,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _closeUserConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Close connections for the specific user. */
export async function closeUserConnections(
  context: Client,
  userId: string,
  options: CloseUserConnectionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _closeUserConnectionsSend(context, userId, options);
  return _closeUserConnectionsDeserialize(result);
}

export function _userExistsSend(
  context: Client,
  userId: string,
  options: UserExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/users/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _userExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Check if there are any client connections connected for the given user. */
export async function userExists(
  context: Client,
  userId: string,
  options: UserExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _userExistsSend(context, userId, options);
  return _userExistsDeserialize(result);
}

export function _grantPermissionSend(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: GrantPermissionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}{?api%2Dversion,targetName}",
    {
      hub: context.hub,
      permission: permission,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      targetName: options?.targetName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({ ...operationOptionsToRequestParameters(options) });
}

export async function _grantPermissionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Grant permission to the connection. */
export async function grantPermission(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: GrantPermissionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _grantPermissionSend(context, permission, connectionId, options);
  return _grantPermissionDeserialize(result);
}

export function _checkPermissionSend(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: CheckPermissionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}{?api%2Dversion,targetName}",
    {
      hub: context.hub,
      permission: permission,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      targetName: options?.targetName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkPermissionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Check if a connection has permission to the specified action. */
export async function checkPermission(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: CheckPermissionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkPermissionSend(context, permission, connectionId, options);
  return _checkPermissionDeserialize(result);
}

export function _revokePermissionSend(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: RevokePermissionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}{?api%2Dversion,targetName}",
    {
      hub: context.hub,
      permission: permission,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      targetName: options?.targetName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokePermissionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Revoke permission for the connection. */
export async function revokePermission(
  context: Client,
  permission: WebPubSubPermission,
  connectionId: string,
  options: RevokePermissionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revokePermissionSend(context, permission, connectionId, options);
  return _revokePermissionDeserialize(result);
}

export function _addConnectionToGroupSend(
  context: Client,
  group: string,
  connectionId: string,
  options: AddConnectionToGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}/connections/{connectionId}{?api%2Dversion}",
    {
      hub: context.hub,
      group: group,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({ ...operationOptionsToRequestParameters(options) });
}

export async function _addConnectionToGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Add a connection to the target group. */
export async function addConnectionToGroup(
  context: Client,
  group: string,
  connectionId: string,
  options: AddConnectionToGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _addConnectionToGroupSend(context, group, connectionId, options);
  return _addConnectionToGroupDeserialize(result);
}

export function _removeConnectionFromGroupSend(
  context: Client,
  group: string,
  connectionId: string,
  options: RemoveConnectionFromGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}/connections/{connectionId}{?api%2Dversion}",
    {
      hub: context.hub,
      group: group,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _removeConnectionFromGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove a connection from the target group. */
export async function removeConnectionFromGroup(
  context: Client,
  group: string,
  connectionId: string,
  options: RemoveConnectionFromGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeConnectionFromGroupSend(context, group, connectionId, options);
  return _removeConnectionFromGroupDeserialize(result);
}

export function _listConnectionsInGroupSend(
  context: Client,
  group: string,
  options: ListConnectionsInGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}/connections{?api%2Dversion,maxpagesize,top,continuationToken}",
    {
      hub: context.hub,
      group: group,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      maxpagesize: options?.maxpagesize,
      top: options?.top,
      continuationToken: options?.continuationToken,
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

export async function _listConnectionsInGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_GroupMemberPagedValues> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _groupMemberPagedValuesDeserializer(result.body);
}

/** List connections in a group. */
export function listConnectionsInGroup(
  context: Client,
  group: string,
  options: ListConnectionsInGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GroupMember> {
  return buildPagedAsyncIterator(
    context,
    () => _listConnectionsInGroupSend(context, group, options),
    _listConnectionsInGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-12-01" },
  );
}

export function _sendToGroupSend(
  context: Client,
  group: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}/:send{?api%2Dversion,excluded,filter,messageTtlSeconds}",
    {
      hub: context.hub,
      group: group,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      excluded: !options?.excluded
        ? options?.excluded
        : options?.excluded.map((p: any) => {
            return p;
          }),
      filter: options?.filter,
      messageTtlSeconds: options?.messageTtlSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: message,
    });
}

export async function _sendToGroupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Send content inside request body to a group of connections. */
export async function sendToGroup(
  context: Client,
  group: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendToGroupSend(context, group, contentType, message, options);
  return _sendToGroupDeserialize(result);
}

export function _closeGroupConnectionsSend(
  context: Client,
  group: string,
  options: CloseGroupConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}/:closeConnections{?api%2Dversion,excluded,reason}",
    {
      hub: context.hub,
      group: group,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      excluded: !options?.excluded
        ? options?.excluded
        : options?.excluded.map((p: any) => {
            return p;
          }),
      reason: options?.reason,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _closeGroupConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Close connections in the specific group. */
export async function closeGroupConnections(
  context: Client,
  group: string,
  options: CloseGroupConnectionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _closeGroupConnectionsSend(context, group, options);
  return _closeGroupConnectionsDeserialize(result);
}

export function _groupExistsSend(
  context: Client,
  group: string,
  options: GroupExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/groups/{group}{?api%2Dversion}",
    {
      hub: context.hub,
      group: group,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _groupExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Check if there are any client connections inside the given group */
export async function groupExists(
  context: Client,
  group: string,
  options: GroupExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _groupExistsSend(context, group, options);
  return _groupExistsDeserialize(result);
}

export function _removeConnectionFromAllGroupsSend(
  context: Client,
  connectionId: string,
  options: RemoveConnectionFromAllGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/connections/{connectionId}/groups{?api%2Dversion}",
    {
      hub: context.hub,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _removeConnectionFromAllGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove a connection from all groups. */
export async function removeConnectionFromAllGroups(
  context: Client,
  connectionId: string,
  options: RemoveConnectionFromAllGroupsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeConnectionFromAllGroupsSend(context, connectionId, options);
  return _removeConnectionFromAllGroupsDeserialize(result);
}

export function _sendToConnectionSend(
  context: Client,
  connectionId: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/connections/{connectionId}/:send{?api%2Dversion,messageTtlSeconds}",
    {
      hub: context.hub,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      messageTtlSeconds: options?.messageTtlSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: message,
    });
}

export async function _sendToConnectionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Send content inside request body to the specific connection. */
export async function sendToConnection(
  context: Client,
  connectionId: string,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendToConnectionSend(context, connectionId, contentType, message, options);
  return _sendToConnectionDeserialize(result);
}

export function _connectionExistsSend(
  context: Client,
  connectionId: string,
  options: ConnectionExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/connections/{connectionId}{?api%2Dversion}",
    {
      hub: context.hub,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _connectionExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Check if the connection with the given connectionId exists. */
export async function connectionExists(
  context: Client,
  connectionId: string,
  options: ConnectionExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _connectionExistsSend(context, connectionId, options);
  return _connectionExistsDeserialize(result);
}

export function _closeConnectionSend(
  context: Client,
  connectionId: string,
  options: CloseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/connections/{connectionId}{?api%2Dversion,reason}",
    {
      hub: context.hub,
      connectionId: connectionId,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      reason: options?.reason,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _closeConnectionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Close the client connection. */
export async function closeConnection(
  context: Client,
  connectionId: string,
  options: CloseConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _closeConnectionSend(context, connectionId, options);
  return _closeConnectionDeserialize(result);
}

export function _sendToAllSend(
  context: Client,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:send{?api%2Dversion,excluded,filter,messageTtlSeconds}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      excluded: !options?.excluded
        ? options?.excluded
        : options?.excluded.map((p: any) => {
            return p;
          }),
      filter: options?.filter,
      messageTtlSeconds: options?.messageTtlSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: message,
    });
}

export async function _sendToAllDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Broadcast content inside request body to all the connected client connections. */
export async function sendToAll(
  context: Client,
  contentType: MessageContentType,
  message: Uint8Array,
  options: SendToAllOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendToAllSend(context, contentType, message, options);
  return _sendToAllDeserialize(result);
}

export function _removeConnectionsFromGroupsSend(
  context: Client,
  groupsToRemove: RemoveFromGroupsRequest,
  options: RemoveConnectionsFromGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:removeFromGroups{?api%2Dversion}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: removeFromGroupsRequestSerializer(groupsToRemove),
    });
}

export async function _removeConnectionsFromGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove filtered connections from multiple groups. */
export async function removeConnectionsFromGroups(
  context: Client,
  groupsToRemove: RemoveFromGroupsRequest,
  options: RemoveConnectionsFromGroupsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeConnectionsFromGroupsSend(context, groupsToRemove, options);
  return _removeConnectionsFromGroupsDeserialize(result);
}

export function _generateClientTokenSend(
  context: Client,
  options: GenerateClientTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:generateToken{?api%2Dversion,userId,role,minutesToExpire,group,clientType}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      userId: options?.userId,
      role: !options?.roles
        ? options?.roles
        : options?.roles.map((p: any) => {
            return p;
          }),
      minutesToExpire: options?.minutesToExpire,
      group: !options?.groups
        ? options?.groups
        : options?.groups.map((p: any) => {
            return p;
          }),
      clientType: options?.clientProtocol,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _generateClientTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return clientTokenResponseDeserializer(result.body);
}

/** Generate token for the client to connect Azure Web PubSub service. */
export async function generateClientToken(
  context: Client,
  options: GenerateClientTokenOptionalParams = { requestOptions: {} },
): Promise<ClientTokenResponse> {
  const result = await _generateClientTokenSend(context, options);
  return _generateClientTokenDeserialize(result);
}

export function _closeAllConnectionsSend(
  context: Client,
  options: CloseAllConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:closeConnections{?api%2Dversion,excluded,reason}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
      excluded: !options?.excluded
        ? options?.excluded
        : options?.excluded.map((p: any) => {
            return p;
          }),
      reason: options?.reason,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _closeAllConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Close the connections in the hub. */
export async function closeAllConnections(
  context: Client,
  options: CloseAllConnectionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _closeAllConnectionsSend(context, options);
  return _closeAllConnectionsDeserialize(result);
}

export function _addConnectionsToGroupsSend(
  context: Client,
  groupsToAdd: AddToGroupsRequest,
  options: AddConnectionsToGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:addToGroups{?api%2Dversion}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: addToGroupsRequestSerializer(groupsToAdd),
    });
}

export async function _addConnectionsToGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Add filtered connections to multiple groups. */
export async function addConnectionsToGroups(
  context: Client,
  groupsToAdd: AddToGroupsRequest,
  options: AddConnectionsToGroupsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _addConnectionsToGroupsSend(context, groupsToAdd, options);
  return _addConnectionsToGroupsDeserialize(result);
}

export function _getServiceStatusSend(
  context: Client,
  options: GetServiceStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/health{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getServiceStatusDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Get service health status. */
export async function getServiceStatus(
  context: Client,
  options: GetServiceStatusOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getServiceStatusSend(context, options);
  return _getServiceStatusDeserialize(result);
}
