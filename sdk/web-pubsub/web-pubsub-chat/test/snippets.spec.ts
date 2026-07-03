// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, ChatPermissions, WebPubSubChatServiceClient } from "../src/index.js";
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
      permissions: [ChatPermissions.UserCreateRoom],
    });
    await client.createOrReplaceRole(roomRoleName, {
      permissions: [ChatPermissions.RoomPublishMessage, ChatPermissions.RoomHistory],
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

    console.log(accessToken.url);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
