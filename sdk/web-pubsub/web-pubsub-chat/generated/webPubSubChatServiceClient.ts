// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebPubSubChatServiceContext,
  WebPubSubChatServiceClientOptionalParams,
  createWebPubSubChatService,
} from "./api/index.js";
import {
  deleteUser,
  createOrReplaceUser,
  getUser,
  deleteRoomMember,
  createOrReplaceRoomMember,
  listRoomMembers,
  deleteRoom,
  getRoom,
  createOrReplaceRoom,
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
} from "./api/options.js";
import {
  ChatConversation,
  ChatMessage,
  ChatRole,
  ChatRoom,
  ChatRoomMember,
  ChatUserUnion,
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
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWebPubSubChatService(endpointParam, credential, hub, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
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
    resource: ChatUserUnion,
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
    resource: ChatRoomMember,
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
    resource: ChatRoom,
    options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return createOrReplaceRoom(this._client, roomId, resource, options);
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
    resource: ChatRole,
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
    resource: ChatMessage,
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
