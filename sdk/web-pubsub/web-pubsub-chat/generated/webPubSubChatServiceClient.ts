// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebPubSubChatServiceContext,
  WebPubSubChatServiceClientOptionalParams,
  createWebPubSubChatService,
} from "./api/index.js";
import {
  generateClientToken,
  listRoomsForUser,
  deleteUser,
  createOrReplaceUser,
  getUser,
  listUsers,
  deleteRoomMember,
  createOrReplaceRoomMember,
  listRoomMembers,
  deleteTopic,
  updateTopic,
  getTopic,
  createOrReplaceTopic,
  listTopics,
  deleteRoom,
  getRoom,
  createOrReplaceRoom,
  listRooms,
  deleteRole,
  createOrReplaceRole,
  getRole,
  listRoles,
  updateMessage,
  deleteMessage,
  listMessages,
  getConversation,
} from "./api/operations.js";
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
} from "./api/options.js";
import { GenerateClientTokenResponse } from "./models/customizations/models.js";
import {
  ChatConversation,
  ChatMessage,
  ChatMessageUpdate,
  ChatRole,
  ChatRoleCreateOrReplace,
  ChatRoom,
  ChatRoomCreateOrReplace,
  ChatTopic,
  ChatTopicCreateOrReplace,
  ChatTopicUpdate,
  ChatRoomMember,
  ChatRoomMemberCreateOrReplace,
  ChatUserUnion,
  HumanChatUserCreateOrReplace,
  ChatUserRoom,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { WebPubSubChatServiceClientOptionalParams } from "./api/webPubSubChatServiceContext.js";

export class WebPubSubChatServiceClient {
  private _client: WebPubSubChatServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    hub: string,
    options: WebPubSubChatServiceClientOptionalParams = {},
  ) {
    this._client = createWebPubSubChatService(endpointParam, credential, hub, options);
    this.pipeline = this._client.pipeline;
  }

  /** Generate a token for connecting a client to Azure Web PubSub. */
  generateClientToken(
    options: GenerateClientTokenOptionalParams = { requestOptions: {} },
  ): Promise<GenerateClientTokenResponse> {
    return generateClientToken(this._client, options);
  }

  /** List rooms for a user with pagination. */
  listRoomsForUser(
    userId: string,
    options: ListRoomsForUserOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatUserRoom> {
    return listRoomsForUser(this._client, userId, options);
  }

  /** Delete a user. */
  deleteUser(
    userId: string,
    options: DeleteUserOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteUser(this._client, userId, options);
  }

  /** Create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  createOrReplaceUser(
    userId: string,
    resource: HumanChatUserCreateOrReplace,
    options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return createOrReplaceUser(this._client, userId, resource, options);
  }

  /** Get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  getUser(
    userId: string,
    options: GetUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return getUser(this._client, userId, options);
  }

  /** List all users with pagination. */
  listUsers(
    options: ListUsersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatUserUnion> {
    return listUsers(this._client, options);
  }

  /** Delete a room member. */
  deleteRoomMember(
    roomId: string,
    userId: string,
    options: DeleteRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRoomMember(this._client, roomId, userId, options);
  }

  /** Create or replace a room member. */
  createOrReplaceRoomMember(
    roomId: string,
    userId: string,
    resource: ChatRoomMemberCreateOrReplace,
    options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoomMember> {
    return createOrReplaceRoomMember(this._client, roomId, userId, resource, options);
  }

  /** Get room members. */
  listRoomMembers(
    roomId: string,
    options: ListRoomMembersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRoomMember> {
    return listRoomMembers(this._client, roomId, options);
  }

  /** Soft delete a topic. */
  deleteTopic(
    roomId: string,
    topicId: string,
    options: DeleteTopicOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTopic(this._client, roomId, topicId, options);
  }

  /** Update a topic. */
  updateTopic(
    roomId: string,
    topicId: string,
    resource: ChatTopicUpdate,
    options: UpdateTopicOptionalParams = { requestOptions: {} },
  ): Promise<ChatTopic> {
    return updateTopic(this._client, roomId, topicId, resource, options);
  }

  /** Get topic information. */
  getTopic(
    roomId: string,
    topicId: string,
    options: GetTopicOptionalParams = { requestOptions: {} },
  ): Promise<ChatTopic> {
    return getTopic(this._client, roomId, topicId, options);
  }

  /** Create or replace a topic with a client-specified ID. */
  createOrReplaceTopic(
    roomId: string,
    topicId: string,
    resource: ChatTopicCreateOrReplace,
    options: CreateOrReplaceTopicOptionalParams = { requestOptions: {} },
  ): Promise<ChatTopic> {
    return createOrReplaceTopic(this._client, roomId, topicId, resource, options);
  }

  /** List topics in a room with pagination. */
  listTopics(
    roomId: string,
    options: ListTopicsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatTopic> {
    return listTopics(this._client, roomId, options);
  }

  /** Delete a room. */
  deleteRoom(
    roomId: string,
    options: DeleteRoomOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRoom(this._client, roomId, options);
  }

  /** Get room information. */
  getRoom(
    roomId: string,
    options: GetRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return getRoom(this._client, roomId, options);
  }

  /** Create or replace a room with a client-specified ID. */
  createOrReplaceRoom(
    roomId: string,
    resource: ChatRoomCreateOrReplace,
    options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return createOrReplaceRoom(this._client, roomId, resource, options);
  }

  /** List rooms with pagination. */
  listRooms(
    options: ListRoomsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRoom> {
    return listRooms(this._client, options);
  }

  /** Delete a role. */
  deleteRole(
    roleName: string,
    options: DeleteRoleOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRole(this._client, roleName, options);
  }

  /** Create or replace a role. */
  createOrReplaceRole(
    roleName: string,
    resource: ChatRoleCreateOrReplace,
    options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return createOrReplaceRole(this._client, roleName, resource, options);
  }

  /** Get role information. */
  getRole(
    roleName: string,
    options: GetRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return getRole(this._client, roleName, options);
  }

  /** Query roles in a hub. */
  listRoles(
    options: ListRolesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRole> {
    return listRoles(this._client, options);
  }

  /** Update a message. */
  updateMessage(
    conversationId: string,
    messageId: string,
    resource: ChatMessageUpdate,
    options: UpdateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ChatMessage> {
    return updateMessage(this._client, conversationId, messageId, resource, options);
  }

  /** Delete a message. */
  deleteMessage(
    conversationId: string,
    messageId: string,
    options: DeleteMessageOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteMessage(this._client, conversationId, messageId, options);
  }

  /** Query messages in a conversation from latest to earliest. */
  listMessages(
    conversationId: string,
    options: ListMessagesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatMessage> {
    return listMessages(this._client, conversationId, options);
  }

  /** Get conversation information. */
  getConversation(
    conversationId: string,
    options: GetConversationOptionalParams = { requestOptions: {} },
  ): Promise<ChatConversation> {
    return getConversation(this._client, conversationId, options);
  }
}
