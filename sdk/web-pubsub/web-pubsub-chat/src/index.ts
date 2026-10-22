// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The Azure Web PubSub Chat client library enables server applications to manage chat roles,
 * users, rooms, topics, room membership, conversations, and messages in an Azure Web PubSub Chat hub.
 *
 * @packageDocumentation
 */

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WebPubSubChatServiceClient } from "./webPubSubChatServiceClient.js";
export type { WebPubSubChatServiceClientOptions } from "./webPubSubChatServiceClient.js";
export type { GetClientAccessTokenOptions, ClientAccessToken } from "./models/clientToken.js";
export { BuiltInChatRoles } from "./builtInChatRoles.js";
export type {
  ChatConversation,
  ChatMessage,
  ChatMessageInput,
  MessageContent,
  ChatRole,
  ChatRoleInput,
  ChatPermission,
  ChatRoom,
  ChatRoomInput,
  ChatTopic,
  ChatTopicInput,
  ChatTopicUpdate,
  ChatTopicState,
  ChatUserRoom,
  ChatRoomMember,
  ChatRoomMemberInput,
  ChatUser,
  ChatUserUnion,
  ChatUserKind,
  HumanChatUserInput,
  HumanChatUser,
} from "./models/index.js";
export { KnownChatPermission, KnownChatTopicState, KnownVersions } from "./models/index.js";
export type {
  DeleteUserOptionalParams,
  CreateOrReplaceUserOptionalParams,
  GetUserOptionalParams,
  ListUsersOptionalParams,
  ListRoomsOptionalParams,
  ListRoomsForUserOptionalParams,
  ListTopicsOptionalParams,
  CreateOrReplaceTopicOptionalParams,
  GetTopicOptionalParams,
  UpdateTopicOptionalParams,
  DeleteTopicOptionalParams,
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
