// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceContext as Client } from "./index.js";
import {
  ChatConversation,
  chatConversationDeserializer,
  _PagedChatMessage,
  _pagedChatMessageDeserializer,
  ChatMessage,
  ChatMessageInput,
  chatMessageSerializer,
  chatMessageDeserializer,
  _PagedChatRole,
  _pagedChatRoleDeserializer,
  ChatRole,
  ChatRoleInput,
  chatRoleSerializer,
  chatRoleDeserializer,
  ChatRoom,
  ChatRoomInput,
  chatRoomSerializer,
  chatRoomDeserializer,
  _PagedChatRoomMember,
  _pagedChatRoomMemberDeserializer,
  ChatRoomMember,
  ChatRoomMemberInput,
  chatRoomMemberSerializer,
  chatRoomMemberDeserializer,
  chatUserUnionSerializer,
  chatUserUnionDeserializer,
  ChatUserInputUnion,
  ChatUserUnion,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  DeleteUserOptionalParams,
  CreateOrReplaceUserOptionalParams,
  GetUserOptionalParams,
  DeleteRoomMemberOptionalParams,
  CreateOrReplaceRoomMemberOptionalParams,
  ListRoomMembersOptionalParams,
  DeleteRoomOptionalParams,
  GetRoomOptionalParams,
  CreateOrReplaceRoomOptionalParams,
  DeleteRoleOptionalParams,
  CreateOrReplaceRoleOptionalParams,
  GetRoleOptionalParams,
  ListRolesOptionalParams,
  UpdateMessageOptionalParams,
  DeleteMessageOptionalParams,
  ListMessagesOptionalParams,
  GetConversationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteUserSend(
  context: Client,
  userId: string,
  options: DeleteUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteUserDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a user. */
export async function deleteUser(
  context: Client,
  userId: string,
  options: DeleteUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteUserSend(context, userId, options);
  return _deleteUserDeserialize(result);
}

export function _createOrReplaceUserSend(
  context: Client,
  userId: string,
  resource: ChatUserInputUnion,
  options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: chatUserUnionSerializer(resource),
  });
}

export async function _createOrReplaceUserDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatUserUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatUserUnionDeserializer(result.body);
}

/** Create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
export async function createOrReplaceUser(
  context: Client,
  userId: string,
  resource: ChatUserInputUnion,
  options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
): Promise<ChatUserUnion> {
  const result = await _createOrReplaceUserSend(context, userId, resource, options);
  return _createOrReplaceUserDeserialize(result);
}

export function _getUserSend(
  context: Client,
  userId: string,
  options: GetUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
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

export async function _getUserDeserialize(result: PathUncheckedResponse): Promise<ChatUserUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatUserUnionDeserializer(result.body);
}

/** Get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
export async function getUser(
  context: Client,
  userId: string,
  options: GetUserOptionalParams = { requestOptions: {} },
): Promise<ChatUserUnion> {
  const result = await _getUserSend(context, userId, options);
  return _getUserDeserialize(result);
}

export function _deleteRoomMemberSend(
  context: Client,
  roomId: string,
  userId: string,
  options: DeleteRoomMemberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/members/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteRoomMemberDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a room member. */
export async function deleteRoomMember(
  context: Client,
  roomId: string,
  userId: string,
  options: DeleteRoomMemberOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRoomMemberSend(context, roomId, userId, options);
  return _deleteRoomMemberDeserialize(result);
}

export function _createOrReplaceRoomMemberSend(
  context: Client,
  roomId: string,
  userId: string,
  resource: ChatRoomMemberInput,
  options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/members/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: chatRoomMemberSerializer(resource),
  });
}

export async function _createOrReplaceRoomMemberDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatRoomMember> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatRoomMemberDeserializer(result.body);
}

/** Create or replace a room member. */
export async function createOrReplaceRoomMember(
  context: Client,
  roomId: string,
  userId: string,
  resource: ChatRoomMemberInput,
  options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
): Promise<ChatRoomMember> {
  const result = await _createOrReplaceRoomMemberSend(context, roomId, userId, resource, options);
  return _createOrReplaceRoomMemberDeserialize(result);
}

export function _listRoomMembersSend(
  context: Client,
  roomId: string,
  options: ListRoomMembersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/members{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      roomId: roomId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      maxpagesize: options?.maxpagesize,
      continuationToken: options?.continuationToken,
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

export async function _listRoomMembersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatRoomMember> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatRoomMemberDeserializer(result.body);
}

/** Get room members. */
export function listRoomMembers(
  context: Client,
  roomId: string,
  options: ListRoomMembersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatRoomMember> {
  return buildPagedAsyncIterator(
    context,
    () => _listRoomMembersSend(context, roomId, options),
    _listRoomMembersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _deleteRoomSend(
  context: Client,
  roomId: string,
  options: DeleteRoomOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteRoomDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a room. */
export async function deleteRoom(
  context: Client,
  roomId: string,
  options: DeleteRoomOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRoomSend(context, roomId, options);
  return _deleteRoomDeserialize(result);
}

export function _getRoomSend(
  context: Client,
  roomId: string,
  options: GetRoomOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
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

export async function _getRoomDeserialize(result: PathUncheckedResponse): Promise<ChatRoom> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatRoomDeserializer(result.body);
}

/** Get room information. */
export async function getRoom(
  context: Client,
  roomId: string,
  options: GetRoomOptionalParams = { requestOptions: {} },
): Promise<ChatRoom> {
  const result = await _getRoomSend(context, roomId, options);
  return _getRoomDeserialize(result);
}

export function _createOrReplaceRoomSend(
  context: Client,
  roomId: string,
  resource: ChatRoomInput,
  options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: chatRoomSerializer(resource),
  });
}

export async function _createOrReplaceRoomDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatRoom> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatRoomDeserializer(result.body);
}

/** Create or replace a room with a client-specified ID. */
export async function createOrReplaceRoom(
  context: Client,
  roomId: string,
  resource: ChatRoomInput,
  options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
): Promise<ChatRoom> {
  const result = await _createOrReplaceRoomSend(context, roomId, resource, options);
  return _createOrReplaceRoomDeserialize(result);
}

export function _deleteRoleSend(
  context: Client,
  roleName: string,
  options: DeleteRoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/roles/{roleName}{?api%2Dversion}",
    {
      hub: context.hub,
      roleName: roleName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteRoleDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a role. */
export async function deleteRole(
  context: Client,
  roleName: string,
  options: DeleteRoleOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRoleSend(context, roleName, options);
  return _deleteRoleDeserialize(result);
}

export function _createOrReplaceRoleSend(
  context: Client,
  roleName: string,
  resource: ChatRoleInput,
  options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/roles/{roleName}{?api%2Dversion}",
    {
      hub: context.hub,
      roleName: roleName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: chatRoleSerializer(resource),
  });
}

export async function _createOrReplaceRoleDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatRole> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatRoleDeserializer(result.body);
}

/** Create or replace a role. */
export async function createOrReplaceRole(
  context: Client,
  roleName: string,
  resource: ChatRoleInput,
  options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
): Promise<ChatRole> {
  const result = await _createOrReplaceRoleSend(context, roleName, resource, options);
  return _createOrReplaceRoleDeserialize(result);
}

export function _getRoleSend(
  context: Client,
  roleName: string,
  options: GetRoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/roles/{roleName}{?api%2Dversion}",
    {
      hub: context.hub,
      roleName: roleName,
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

export async function _getRoleDeserialize(result: PathUncheckedResponse): Promise<ChatRole> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatRoleDeserializer(result.body);
}

/** Get role information. */
export async function getRole(
  context: Client,
  roleName: string,
  options: GetRoleOptionalParams = { requestOptions: {} },
): Promise<ChatRole> {
  const result = await _getRoleSend(context, roleName, options);
  return _getRoleDeserialize(result);
}

export function _listRolesSend(
  context: Client,
  options: ListRolesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/roles{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      maxpagesize: options?.maxpagesize,
      continuationToken: options?.continuationToken,
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

export async function _listRolesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatRole> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatRoleDeserializer(result.body);
}

/** Query roles in a hub. */
export function listRoles(
  context: Client,
  options: ListRolesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatRole> {
  return buildPagedAsyncIterator(
    context,
    () => _listRolesSend(context, options),
    _listRolesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _updateMessageSend(
  context: Client,
  conversationId: string,
  messageId: string,
  resource: ChatMessageInput,
  options: UpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/conversations/{conversationId}/messages/{messageId}{?api%2Dversion}",
    {
      hub: context.hub,
      conversationId: conversationId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: chatMessageSerializer(resource),
  });
}

export async function _updateMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatMessageDeserializer(result.body);
}

/** Update a message. */
export async function updateMessage(
  context: Client,
  conversationId: string,
  messageId: string,
  resource: ChatMessageInput,
  options: UpdateMessageOptionalParams = { requestOptions: {} },
): Promise<ChatMessage> {
  const result = await _updateMessageSend(context, conversationId, messageId, resource, options);
  return _updateMessageDeserialize(result);
}

export function _deleteMessageSend(
  context: Client,
  conversationId: string,
  messageId: string,
  options: DeleteMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/conversations/{conversationId}/messages/{messageId}{?api%2Dversion}",
    {
      hub: context.hub,
      conversationId: conversationId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteMessageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a message. */
export async function deleteMessage(
  context: Client,
  conversationId: string,
  messageId: string,
  options: DeleteMessageOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteMessageSend(context, conversationId, messageId, options);
  return _deleteMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  conversationId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/conversations/{conversationId}/messages{?api%2Dversion,latestMessageId,earliestMessageId,maxpagesize}",
    {
      hub: context.hub,
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      latestMessageId: options?.latestMessageId,
      earliestMessageId: options?.earliestMessageId,
      maxpagesize: options?.maxpagesize,
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

export async function _listMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatMessageDeserializer(result.body);
}

/** Query messages in a conversation from latest to earliest. */
export function listMessages(
  context: Client,
  conversationId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatMessage> {
  return buildPagedAsyncIterator(
    context,
    () => _listMessagesSend(context, conversationId, options),
    _listMessagesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _getConversationSend(
  context: Client,
  conversationId: string,
  options: GetConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/conversations/{conversationId}{?api%2Dversion}",
    {
      hub: context.hub,
      conversationId: conversationId,
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

export async function _getConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatConversationDeserializer(result.body);
}

/** Get conversation information. */
export async function getConversation(
  context: Client,
  conversationId: string,
  options: GetConversationOptionalParams = { requestOptions: {} },
): Promise<ChatConversation> {
  const result = await _getConversationSend(context, conversationId, options);
  return _getConversationDeserialize(result);
}
