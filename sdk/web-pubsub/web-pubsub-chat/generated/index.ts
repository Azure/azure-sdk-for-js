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
  ChatRoomMember,
  ChatUser,
  ChatUserUnion,
  ChatUserKind,
  HumanChatUser,
  GenerateClientTokenResponse,
} from "./models/index.js";
export { KnownChatPermission, KnownChatUserKind, KnownVersions } from "./models/index.js";
export type {
  GenerateClientTokenOptionalParams,
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
export { RestError, isRestError } from "@azure/core-rest-pipeline";
