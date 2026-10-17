// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WebPubSubChatServiceClient } from "./webPubSubChatServiceClient.js";
export type {
  ChatConversation,
  ChatMessage,
  MessageContent,
  ChatRole,
  ChatPermission,
  ChatRoom,
  ChatTopic,
  ChatTopicState,
  ChatRoomMember,
  ChatUser,
  ChatUserUnion,
  ChatUserKind,
  HumanChatUser,
  ChatUserRoom,
} from "./models/index.js";
export {
  KnownChatPermission,
  KnownChatTopicState,
  KnownChatUserKind,
  KnownVersions,
} from "./models/index.js";
export type { GenerateClientTokenResponse } from "./models/customizations/index.js";
export type {
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
  WebPubSubChatServiceClientOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
