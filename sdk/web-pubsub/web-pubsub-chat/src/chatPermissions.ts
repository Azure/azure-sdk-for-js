// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Built-in permissions supported by Web PubSub Chat. */
export const ChatPermissions = {
  /** Allows a user to create chat rooms. */
  UserCreateRoom: "user.create_room",
  /** Allows a user to list the rooms they belong to. */
  UserFetchAllRooms: "user.fetch_all_rooms",
  /** Allows a room member to publish messages. */
  RoomPublishMessage: "room.publish_message",
  /** Allows a room member to read message history. */
  RoomHistory: "room.history",
  /** Allows a room member to add users to a room. */
  RoomInvite: "room.invite",
  /** Allows a room operator to remove users from a room. */
  RoomRemoveUser: "room.remove_user",
} as const;

/** A built-in Web PubSub Chat permission. */
export type ChatPermission = (typeof ChatPermissions)[keyof typeof ChatPermissions];

/** Built-in roles supported by Web PubSub Chat. */
export const ChatRoles = {
  /** The default user role with room creation and room listing permissions. */
  UserNormal: "user.normal",
  /** The room member role with publish, history, and invite permissions. */
  RoomMember: "room.member",
  /** The room operator role with all room permissions, including removing users. */
  RoomOperator: "room.operator",
} as const;

/** A built-in Web PubSub Chat role name. */
export type ChatRoleName = (typeof ChatRoles)[keyof typeof ChatRoles];
