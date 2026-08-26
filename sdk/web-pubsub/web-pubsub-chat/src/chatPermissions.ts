// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Built-in roles supported by Web PubSub Chat. */
export const BuiltInChatRole = {
  /** The default user role with room creation and room listing permissions. */
  UserNormal: "user.normal",
  /** The room member role with publish, history, and invite permissions. */
  RoomMember: "room.member",
  /** The room operator role with all room permissions, including removing users. */
  RoomOperator: "room.operator",
} as const;
