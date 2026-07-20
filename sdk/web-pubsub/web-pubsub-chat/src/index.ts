// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The Azure Web PubSub Chat client library enables server applications to manage chat roles,
 * users, rooms, room membership, conversations, and messages in an Azure Web PubSub Chat hub.
 *
 * @packageDocumentation
 */

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WebPubSubChatServiceClient } from "./webPubSubChatServiceClient.js";
export type { WebPubSubChatServiceClientOptions } from "./webPubSubChatServiceClient.js";
export type { GetClientAccessTokenOptions, ClientAccessToken } from "./models/clientToken.js";
export { ChatPermissions, ChatRoles } from "./chatPermissions.js";
export type { ChatPermission, ChatRoleName } from "./chatPermissions.js";
export type {
  ChatConversation,
  ChatMessage,
  ChatMessageInput,
  MessageContent,
  ChatRole,
  ChatRoleInput,
  ChatRoom,
  ChatRoomInput,
  ChatRoomMember,
  ChatRoomMemberInput,
  ChatUser,
  ChatUserInput,
  ChatUserInputUnion,
  ChatUserUnion,
  ChatUserKind,
  HumanChatUserInput,
  HumanChatUser,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
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
  WebPubSubChatServiceClientOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureKeyCredential } from "@azure/core-auth";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
