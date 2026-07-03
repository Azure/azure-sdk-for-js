// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents a chat conversation. */
export interface ChatConversation {
  /** Conversation identifier. */
  readonly id: string;
  /** Parent room identifier. */
  parentRoom: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatConversationDeserializer(item: any): ChatConversation {
  return {
    id: item["id"],
    parentRoom: item["parentRoom"],
    etag: item["etag"],
  };
}

/** Paged collection of ChatMessage items */
export interface _PagedChatMessage {
  /** The ChatMessage items on this page */
  value: ChatMessage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedChatMessageDeserializer(item: any): _PagedChatMessage {
  return {
    value: chatMessageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function chatMessageArraySerializer(result: Array<ChatMessage>): any[] {
  return result.map((item) => {
    return chatMessageSerializer(item);
  });
}

export function chatMessageArrayDeserializer(result: Array<ChatMessage>): any[] {
  return result.map((item) => {
    return chatMessageDeserializer(item);
  });
}

/** Represents a chat message. */
export interface ChatMessage {
  /** Message identifier. */
  readonly id: string;
  /** User who created the message. */
  createdBy: string;
  /** Message content. */
  content: MessageContent;
  /** Timestamp when the message was created. */
  readonly createdAt: Date;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatMessageSerializer(item: ChatMessage): any {
  return { createdBy: item["createdBy"], content: messageContentSerializer(item["content"]) };
}

export function chatMessageDeserializer(item: any): ChatMessage {
  return {
    id: item["id"],
    createdBy: item["createdBy"],
    content: messageContentDeserializer(item["content"]),
    createdAt: new Date(item["createdAt"]),
    etag: item["etag"],
  };
}

/** Message content body. */
export interface MessageContent {
  /** Text content. */
  text?: string;
  /** Binary content (base64 encoded). */
  binary?: Uint8Array;
}

export function messageContentSerializer(item: MessageContent): any {
  return {
    text: item["text"],
    binary: !item["binary"] ? item["binary"] : uint8ArrayToString(item["binary"], "base64"),
  };
}

export function messageContentDeserializer(item: any): MessageContent {
  return {
    text: item["text"],
    binary: !item["binary"]
      ? item["binary"]
      : typeof item["binary"] === "string"
        ? stringToUint8Array(item["binary"], "base64")
        : item["binary"],
  };
}

/** Paged collection of ChatRole items */
export interface _PagedChatRole {
  /** The ChatRole items on this page */
  value: ChatRole[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedChatRoleDeserializer(item: any): _PagedChatRole {
  return {
    value: chatRoleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function chatRoleArraySerializer(result: Array<ChatRole>): any[] {
  return result.map((item) => {
    return chatRoleSerializer(item);
  });
}

export function chatRoleArrayDeserializer(result: Array<ChatRole>): any[] {
  return result.map((item) => {
    return chatRoleDeserializer(item);
  });
}

/**
 * Represents a chat role.
 * A role name must start with 'user.' or 'room.' prefix.
 * A role must contain either user permissions or room permissions, but not both.
 */
export interface ChatRole {
  /** Role name. Must start with 'user.' or 'room.' prefix. */
  readonly name: string;
  /** Permissions associated with the role. Do not mix user permissions and room permissions in one role. */
  permissions: string[];
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatRoleSerializer(item: ChatRole): any {
  return {
    permissions: item["permissions"].map((p: any) => {
      return p;
    }),
  };
}

export function chatRoleDeserializer(item: any): ChatRole {
  return {
    name: item["name"],
    permissions: item["permissions"].map((p: any) => {
      return p;
    }),
    etag: item["etag"],
  };
}

/** Represents a chat room. */
export interface ChatRoom {
  /** Room identifier. */
  readonly id: string;
  /** Room title. */
  title: string;
  /** Default conversation ID for this room. */
  readonly defaultConversation: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatRoomSerializer(item: ChatRoom): any {
  return { title: item["title"] };
}

export function chatRoomDeserializer(item: any): ChatRoom {
  return {
    id: item["id"],
    title: item["title"],
    defaultConversation: item["defaultConversation"],
    etag: item["etag"],
  };
}

/** Paged collection of ChatRoomMember items */
export interface _PagedChatRoomMember {
  /** The ChatRoomMember items on this page */
  value: ChatRoomMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedChatRoomMemberDeserializer(item: any): _PagedChatRoomMember {
  return {
    value: chatRoomMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function chatRoomMemberArraySerializer(result: Array<ChatRoomMember>): any[] {
  return result.map((item) => {
    return chatRoomMemberSerializer(item);
  });
}

export function chatRoomMemberArrayDeserializer(result: Array<ChatRoomMember>): any[] {
  return result.map((item) => {
    return chatRoomMemberDeserializer(item);
  });
}

/** Represents a room member. */
export interface ChatRoomMember {
  /** User ID of the member. */
  readonly userId: string;
  /** Room role assigned to the user within this room. */
  roleName: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatRoomMemberSerializer(item: ChatRoomMember): any {
  return { roleName: item["roleName"] };
}

export function chatRoomMemberDeserializer(item: any): ChatRoomMember {
  return {
    userId: item["userId"],
    roleName: item["roleName"],
    etag: item["etag"],
  };
}

/**
 * Represents a user profile in the chat system. This is a discriminated base type;
 * concrete payloads are selected by the `kind` field (e.g. `HumanChatUser`).
 */
export interface ChatUser {
  /** The kind of user. */
  /** The discriminator possible values: Human */
  kind: ChatUserKind;
  /** User identifier. */
  readonly id: string;
  /** User's display nickname. */
  nickname: string;
  /** The entity tag for this resource. */
  readonly etag: string;
}

export function chatUserSerializer(item: ChatUser): any {
  return { kind: item["kind"], nickname: item["nickname"] };
}

export function chatUserDeserializer(item: any): ChatUser {
  return {
    kind: item["kind"],
    id: item["id"],
    nickname: item["nickname"],
    etag: item["etag"],
  };
}

/** Alias for ChatUserUnion */
export type ChatUserUnion = HumanChatUser | ChatUser;

export function chatUserUnionSerializer(item: ChatUserUnion): any {
  switch (item.kind) {
    case "Human":
      return humanChatUserSerializer(item as HumanChatUser);

    default:
      return chatUserSerializer(item);
  }
}

export function chatUserUnionDeserializer(item: any): ChatUserUnion {
  switch (item["kind"]) {
    case "Human":
      return humanChatUserDeserializer(item as HumanChatUser);

    default:
      return chatUserDeserializer(item);
  }
}

/** Discriminator for the kind of chat user. */
export type ChatUserKind = "Human";

/** A human end-user, identified by a user role. */
export interface HumanChatUser extends ChatUser {
  kind: "Human";
  /** Global user role assigned to the user. Must start with `user.`. */
  roleName: string;
}

export function humanChatUserSerializer(item: HumanChatUser): any {
  return { kind: item["kind"], nickname: item["nickname"], roleName: item["roleName"] };
}

export function humanChatUserDeserializer(item: any): HumanChatUser {
  return {
    kind: item["kind"],
    id: item["id"],
    nickname: item["nickname"],
    etag: item["etag"],
    roleName: item["roleName"],
  };
}

/** Service API versions. */
export enum KnownVersions {
  /** The 2026-02-01-preview API version. */
  V20260201Preview = "2026-02-01-preview",
}
