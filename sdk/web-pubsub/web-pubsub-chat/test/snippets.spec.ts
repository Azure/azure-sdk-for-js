// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  BuiltInChatRoles,
  KnownChatPermission,
  WebPubSubChatServiceClient,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const connectionStringClient = new WebPubSubChatServiceClient(
      "<connectionString>",
      "<hubName>",
    );

    const tokenCredentialClient = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );

    const keyCredentialClient = new WebPubSubChatServiceClient(
      "<endpoint>",
      new AzureKeyCredential("<accessKey>"),
      "<hubName>",
    );
  });

  it("ReadmeSampleSetUpChatResources", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );
    const userRoleName = "user.contoso_member";
    const roomRoleName = "room.contoso_member";
    const userId = "alice";
    const roomId = "general";

    await client.createOrReplaceRole(userRoleName, {
      permissions: [KnownChatPermission.UserCreateRoom],
    });
    await client.createOrReplaceRole(roomRoleName, {
      permissions: [KnownChatPermission.RoomPublishMessage, KnownChatPermission.RoomHistory],
    });
    await client.createOrReplaceUser(userId, {
      kind: "Human",
      nickname: "Alice",
      roleName: userRoleName,
    });
    const room = await client.createOrReplaceRoom(roomId, { title: "General" });
    await client.createOrReplaceRoomMember(roomId, userId, { roleName: roomRoleName });

    console.log(`Created room ${room.id} with conversation ${room.defaultConversation}`);
  });

  it("ReadmeSampleUseBuiltInRolesAndKnownPermissions", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );

    await client.createOrReplaceUser("alice", {
      kind: "Human",
      nickname: "Alice",
      roleName: BuiltInChatRoles.UserNormal,
    });

    await client.createOrReplaceRole("room.moderator", {
      permissions: [
        KnownChatPermission.RoomHistory,
        KnownChatPermission.RoomRemoveUser,
        KnownChatPermission.RoomPublishMessage,
      ],
    });
  });

  it("ReadmeSampleManageRoles", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );
    const roleName = "user.contoso_member";

    try {
      const role = await client.createOrReplaceRole(roleName, {
        permissions: [KnownChatPermission.UserCreateRoom, KnownChatPermission.UserFetchAllRooms],
      });
      console.log(`Created role: ${role.name}`);

      const fetchedRole = await client.getRole(roleName);
      console.log(`Fetched role: ${fetchedRole.name}`);

      for await (const listedRole of client.listRoles()) {
        console.log(`Role: ${listedRole.name}`);
      }
    } finally {
      await client.deleteRole(roleName);
    }
  });

  it("ReadmeSampleManageRoom", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );
    const roomId = "general";

    const room = await client.createOrReplaceRoom(roomId, { title: "General" });
    console.log(`Created room ${room.id} with conversation ${room.defaultConversation}`);

    const fetchedRoom = await client.getRoom(roomId);
    console.log(`Fetched room: ${fetchedRoom.id}, title: ${fetchedRoom.title}`);

    await client.deleteRoom(roomId);
  });

  it("ReadmeSampleManageUser", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );
    const userId = "alice";

    const user = await client.createOrReplaceUser(userId, {
      kind: "Human",
      nickname: "Alice",
      roleName: BuiltInChatRoles.UserNormal,
    });
    console.log(`Created user: ${user.id}, nickname: ${user.nickname}`);

    const fetchedUser = await client.getUser(userId);
    console.log(`Fetched user: ${fetchedUser.id}, nickname: ${fetchedUser.nickname}`);

    await client.deleteUser(userId);
  });

  it("ReadmeSampleListMessages", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );

    for await (const message of client.listMessages("<conversationId>")) {
      console.log(`${message.createdBy}: ${message.content.text}`);
    }
  });

  it("ReadmeSampleGetClientAccessToken", async () => {
    const client = new WebPubSubChatServiceClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<hubName>",
    );
    const accessToken = await client.getClientAccessToken({ userId: "alice" });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
