// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubChatServiceContext as Client } from "./index.js";
import {
  GenerateClientTokenResponse,
  generateClientTokenResponseDeserializer,
} from "../models/customizations/models.js";
import {
  ChatConversation,
  chatConversationDeserializer,
  _PagedChatMessage,
  _pagedChatMessageDeserializer,
  ChatMessage,
  chatMessageDeserializer,
  ChatMessageUpdate,
  chatMessageUpdateSerializer,
  _PagedChatRole,
  _pagedChatRoleDeserializer,
  ChatRole,
  chatRoleDeserializer,
  ChatRoleCreateOrReplace,
  chatRoleCreateOrReplaceSerializer,
  _PagedChatRoom,
  _pagedChatRoomDeserializer,
  ChatRoom,
  chatRoomDeserializer,
  ChatRoomCreateOrReplace,
  chatRoomCreateOrReplaceSerializer,
  _PagedChatTopic,
  _pagedChatTopicDeserializer,
  ChatTopic,
  chatTopicDeserializer,
  ChatTopicCreateOrReplace,
  chatTopicCreateOrReplaceSerializer,
  ChatTopicUpdate,
  chatTopicUpdateSerializer,
  _PagedChatRoomMember,
  _pagedChatRoomMemberDeserializer,
  ChatRoomMember,
  chatRoomMemberDeserializer,
  ChatRoomMemberCreateOrReplace,
  chatRoomMemberCreateOrReplaceSerializer,
  _PagedChatUser,
  _pagedChatUserDeserializer,
  chatUserUnionDeserializer,
  ChatUserUnion,
  HumanChatUserCreateOrReplace,
  humanChatUserCreateOrReplaceSerializer,
  _PagedChatUserRoom,
  _pagedChatUserRoomDeserializer,
  ChatUserRoom,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  GenerateClientTokenOptionalParams,
  ListRoomsForUserOptionalParams,
  DeleteUserOptionalParams,
  CreateOrReplaceUserOptionalParams,
  GetUserOptionalParams,
  ListUsersOptionalParams,
  DeleteRoomMemberOptionalParams,
  CreateOrReplaceRoomMemberOptionalParams,
  ListRoomMembersOptionalParams,
  DeleteTopicOptionalParams,
  UpdateTopicOptionalParams,
  GetTopicOptionalParams,
  CreateOrReplaceTopicOptionalParams,
  ListTopicsOptionalParams,
  DeleteRoomOptionalParams,
  GetRoomOptionalParams,
  CreateOrReplaceRoomOptionalParams,
  ListRoomsOptionalParams,
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

export function _generateClientTokenSend(
  context: Client,
  options: GenerateClientTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/:generateToken{?userId,role*,minutesToExpire,api%2Dversion}",
    {
      hub: context.hub,
      userId: options?.userId,
      role: !options?.role
        ? options?.role
        : options?.role.map((p: any) => {
            return p;
          }),
      minutesToExpire: options?.minutesToExpire,
      "api%2Dversion": "2024-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _generateClientTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateClientTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return generateClientTokenResponseDeserializer(result.body);
}

/** Generate a token for connecting a client to Azure Web PubSub. */
export async function generateClientToken(
  context: Client,
  options: GenerateClientTokenOptionalParams = { requestOptions: {} },
): Promise<GenerateClientTokenResponse> {
  const result = await _generateClientTokenSend(context, options);
  return _generateClientTokenDeserialize(result);
}

export function _listRoomsForUserSend(
  context: Client,
  userId: string,
  options: ListRoomsForUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users/{userId}/rooms{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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

export async function _listRoomsForUserDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatUserRoom> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatUserRoomDeserializer(result.body);
}

/** List rooms for a user with pagination. */
export function listRoomsForUser(
  context: Client,
  userId: string,
  options: ListRoomsForUserOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatUserRoom> {
  return buildPagedAsyncIterator(
    context,
    () => _listRoomsForUserSend(context, userId, options),
    _listRoomsForUserDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
  resource: HumanChatUserCreateOrReplace,
  options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: humanChatUserCreateOrReplaceSerializer(resource),
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
  resource: HumanChatUserCreateOrReplace,
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export function _listUsersSend(
  context: Client,
  options: ListUsersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/users{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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

export async function _listUsersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatUser> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatUserDeserializer(result.body);
}

/** List all users with pagination. */
export function listUsers(
  context: Client,
  options: ListUsersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatUserUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsersSend(context, options),
    _listUsersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
  resource: ChatRoomMemberCreateOrReplace,
  options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/members/{userId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatRoomMemberCreateOrReplaceSerializer(resource),
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
  resource: ChatRoomMemberCreateOrReplace,
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _deleteTopicSend(
  context: Client,
  roomId: string,
  topicId: string,
  options: DeleteTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/topics/{topicId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      topicId: topicId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteTopicDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Soft delete a topic. */
export async function deleteTopic(
  context: Client,
  roomId: string,
  topicId: string,
  options: DeleteTopicOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTopicSend(context, roomId, topicId, options);
  return _deleteTopicDeserialize(result);
}

export function _updateTopicSend(
  context: Client,
  roomId: string,
  topicId: string,
  resource: ChatTopicUpdate,
  options: UpdateTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/topics/{topicId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      topicId: topicId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatTopicUpdateSerializer(resource),
    });
}

export async function _updateTopicDeserialize(result: PathUncheckedResponse): Promise<ChatTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatTopicDeserializer(result.body);
}

/** Update a topic. */
export async function updateTopic(
  context: Client,
  roomId: string,
  topicId: string,
  resource: ChatTopicUpdate,
  options: UpdateTopicOptionalParams = { requestOptions: {} },
): Promise<ChatTopic> {
  const result = await _updateTopicSend(context, roomId, topicId, resource, options);
  return _updateTopicDeserialize(result);
}

export function _getTopicSend(
  context: Client,
  roomId: string,
  topicId: string,
  options: GetTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/topics/{topicId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      topicId: topicId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _getTopicDeserialize(result: PathUncheckedResponse): Promise<ChatTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatTopicDeserializer(result.body);
}

/** Get topic information. */
export async function getTopic(
  context: Client,
  roomId: string,
  topicId: string,
  options: GetTopicOptionalParams = { requestOptions: {} },
): Promise<ChatTopic> {
  const result = await _getTopicSend(context, roomId, topicId, options);
  return _getTopicDeserialize(result);
}

export function _createOrReplaceTopicSend(
  context: Client,
  roomId: string,
  topicId: string,
  resource: ChatTopicCreateOrReplace,
  options: CreateOrReplaceTopicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/topics/{topicId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      topicId: topicId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatTopicCreateOrReplaceSerializer(resource),
    });
}

export async function _createOrReplaceTopicDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatTopic> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return chatTopicDeserializer(result.body);
}

/** Create or replace a topic with a client-specified ID. */
export async function createOrReplaceTopic(
  context: Client,
  roomId: string,
  topicId: string,
  resource: ChatTopicCreateOrReplace,
  options: CreateOrReplaceTopicOptionalParams = { requestOptions: {} },
): Promise<ChatTopic> {
  const result = await _createOrReplaceTopicSend(context, roomId, topicId, resource, options);
  return _createOrReplaceTopicDeserialize(result);
}

export function _listTopicsSend(
  context: Client,
  roomId: string,
  options: ListTopicsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}/topics{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      roomId: roomId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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

export async function _listTopicsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatTopicDeserializer(result.body);
}

/** List topics in a room with pagination. */
export function listTopics(
  context: Client,
  roomId: string,
  options: ListTopicsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listTopicsSend(context, roomId, options),
    _listTopicsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
  resource: ChatRoomCreateOrReplace,
  options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms/{roomId}{?api%2Dversion}",
    {
      hub: context.hub,
      roomId: roomId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatRoomCreateOrReplaceSerializer(resource),
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
  resource: ChatRoomCreateOrReplace,
  options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
): Promise<ChatRoom> {
  const result = await _createOrReplaceRoomSend(context, roomId, resource, options);
  return _createOrReplaceRoomDeserialize(result);
}

export function _listRoomsSend(
  context: Client,
  options: ListRoomsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/rooms{?api%2Dversion,maxpagesize,continuationToken}",
    {
      hub: context.hub,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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

export async function _listRoomsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedChatRoom> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedChatRoomDeserializer(result.body);
}

/** List rooms with pagination. */
export function listRooms(
  context: Client,
  options: ListRoomsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChatRoom> {
  return buildPagedAsyncIterator(
    context,
    () => _listRoomsSend(context, options),
    _listRoomsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
  resource: ChatRoleCreateOrReplace,
  options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/roles/{roleName}{?api%2Dversion}",
    {
      hub: context.hub,
      roleName: roleName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatRoleCreateOrReplaceSerializer(resource),
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
  resource: ChatRoleCreateOrReplace,
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      maxpagesize: options?.maxPageSize,
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
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _updateMessageSend(
  context: Client,
  conversationId: string,
  messageId: string,
  resource: ChatMessageUpdate,
  options: UpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/api/hubs/{hub}/chat/conversations/{conversationId}/messages/{messageId}{?api%2Dversion}",
    {
      hub: context.hub,
      conversationId: conversationId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: chatMessageUpdateSerializer(resource),
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
  resource: ChatMessageUpdate,
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
      latestMessageId: options?.latestMessageId,
      earliestMessageId: options?.earliestMessageId,
      maxpagesize: options?.maxPageSize,
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
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
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
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
