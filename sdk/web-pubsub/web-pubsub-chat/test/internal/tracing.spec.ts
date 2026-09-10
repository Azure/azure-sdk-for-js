// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert, describe, it, vi } from "vitest";
import { WebPubSubChatServiceClient } from "../../src/index.js";
import { tracingClient } from "../../src/tracing.js";

const expectedPromiseSpanNames = [
  "WebPubSubChatServiceClient.deleteUser",
  "WebPubSubChatServiceClient.createOrReplaceUser",
  "WebPubSubChatServiceClient.getUser",
  "WebPubSubChatServiceClient.deleteRoomMember",
  "WebPubSubChatServiceClient.createOrReplaceRoomMember",
  "WebPubSubChatServiceClient.deleteRoom",
  "WebPubSubChatServiceClient.getRoom",
  "WebPubSubChatServiceClient.createOrReplaceRoom",
  "WebPubSubChatServiceClient.deleteRole",
  "WebPubSubChatServiceClient.createOrReplaceRole",
  "WebPubSubChatServiceClient.getRole",
  "WebPubSubChatServiceClient.updateMessage",
  "WebPubSubChatServiceClient.deleteMessage",
  "WebPubSubChatServiceClient.getConversation",
  "WebPubSubChatServiceClient.getClientAccessToken",
];

const expectedPagedSpanNames = [
  "WebPubSubChatServiceClient.listRoomMembers",
  "WebPubSubChatServiceClient.listRoles",
  "WebPubSubChatServiceClient.listMessages",
];

function createClient(): WebPubSubChatServiceClient {
  return new WebPubSubChatServiceClient(
    "https://example.webpubsub.azure.com",
    new AzureKeyCredential("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg="),
    "chat-hub",
  );
}

describe("WebPubSubChatServiceClient tracing", () => {
  it("creates spans for all promise-returning operations", async () => {
    const withSpan = vi
      .spyOn(tracingClient, "withSpan")
      .mockImplementation(async () => undefined as never);

    try {
      const client = createClient();

      await client.deleteUser("user");
      await client.createOrReplaceUser("user", {
        kind: "Human",
        nickname: "User",
        roleName: "user.member",
      });
      await client.getUser("user");
      await client.deleteRoomMember("room", "user");
      await client.createOrReplaceRoomMember("room", "user", { roleName: "room.member" });
      await client.deleteRoom("room");
      await client.getRoom("room");
      await client.createOrReplaceRoom("room", { title: "Room" });
      await client.deleteRole("user.member");
      await client.createOrReplaceRole("user.member", { permissions: [] });
      await client.getRole("user.member");
      await client.updateMessage("conversation", "message", {
        createdBy: "user",
        content: { text: "updated" },
      });
      await client.deleteMessage("conversation", "message");
      await client.getConversation("conversation");
      await client.getClientAccessToken();

      assert.deepEqual(
        withSpan.mock.calls.map(([name]) => name),
        expectedPromiseSpanNames,
      );
    } finally {
      withSpan.mockRestore();
    }
  });

  it("creates spans for all paged operations", () => {
    const startSpan = vi.spyOn(tracingClient, "startSpan");

    try {
      const client = createClient();
      const iterators = [
        client.listRoomMembers("room"),
        client.listRoles(),
        client.listMessages("conversation"),
      ];

      for (const iterator of iterators) {
        assert.isFunction(iterator.next);
        assert.isFunction(iterator.byPage);
      }
      assert.deepEqual(
        startSpan.mock.calls.map(([name]) => name),
        expectedPagedSpanNames,
      );
    } finally {
      startSpan.mockRestore();
    }
  });
});
