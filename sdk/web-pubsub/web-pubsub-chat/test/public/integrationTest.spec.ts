// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  assertEnvironmentVariable,
  isPlaybackMode,
  type Recorder,
} from "@azure-tools/test-recorder";
import { KnownChatPermission, WebPubSubChatServiceClient } from "../../src/index.js";
import { createRecorder } from "./utils/recordedClient.js";
import { createChatMessage } from "./utils/chatClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";

describe("", () => {
  let client: WebPubSubChatServiceClient;
  let recorder: Recorder;
  const isLocalAuthEnabled = process.env.WPS_CHAT_DISABLE_LOCAL_AUTH !== "true";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = new WebPubSubChatServiceClient(
      assertEnvironmentVariable("WPS_CHAT_ENDPOINT"),
      createTestCredential(),
      "test_hub",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  describe("roles", () => {
    const roleName = "user.test_role";

    it.runIf(isPlaybackMode() || isLocalAuthEnabled)(
      "lists roles using a connection string",
      async () => {
        const connectionStringClient = new WebPubSubChatServiceClient(
          assertEnvironmentVariable("WPS_CHAT_CONNECTION_STRING"),
          "test_hub",
          recorder.configureClientOptions({}),
        );
        const roles: string[] = [];
        for await (const role of connectionStringClient.listRoles()) {
          roles.push(role.name!);
        }
        assert.isArray(roles);
      },
    );

    it("creates, gets, and deletes a role", async () => {
      // Create
      const created = await client.createOrReplaceRole(roleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      assert.equal(created.name, roleName);

      // Get
      const fetched = await client.getRole(roleName);
      assert.equal(fetched.name, roleName);

      // Delete
      await client.deleteRole(roleName);
    });

    it("creates a role only when it does not exist", async () => {
      const createOnlyRoleName = "user.create_only_test_role";

      try {
        const created = await client.createOrReplaceRole(
          createOnlyRoleName,
          { permissions: [KnownChatPermission.UserCreateRoom] },
          { ifNoneMatch: "*" },
        );
        assert.equal(created.name, createOnlyRoleName);

        await expect(
          client.createOrReplaceRole(
            createOnlyRoleName,
            { permissions: [KnownChatPermission.UserFetchAllRooms] },
            { ifNoneMatch: "*" },
          ),
        ).rejects.toMatchObject({ statusCode: 412 });
      } finally {
        await client.deleteRole(createOnlyRoleName).catch(() => undefined);
      }
    });

    it("rejects replacing a role with a stale ETag", async () => {
      const etagRoleName = "user.etag_test_role";

      try {
        const created = await client.createOrReplaceRole(etagRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        const replaced = await client.createOrReplaceRole(
          etagRoleName,
          {
            permissions: [
              KnownChatPermission.UserCreateRoom,
              KnownChatPermission.UserFetchAllRooms,
            ],
          },
          { ifMatch: created.etag },
        );
        assert.notEqual(replaced.etag, created.etag);

        await expect(
          client.createOrReplaceRole(
            etagRoleName,
            { permissions: [KnownChatPermission.UserCreateRoom] },
            { ifMatch: created.etag },
          ),
        ).rejects.toMatchObject({ statusCode: 412 });
      } finally {
        await client.deleteRole(etagRoleName).catch(() => undefined);
      }
    });

    it("lists roles", async () => {
      const userRoleName = "user.list_test_role";
      const roomRoleName = "room.list_test_role";

      await client.createOrReplaceRole(userRoleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      await client.createOrReplaceRole(roomRoleName, {
        permissions: [KnownChatPermission.RoomPublishMessage],
      });

      try {
        const roles: string[] = [];
        for await (const role of client.listRoles()) {
          roles.push(role.name!);
        }

        assert.include(roles, userRoleName);
        assert.include(roles, roomRoleName);
      } finally {
        await client.deleteRole(userRoleName);
        await client.deleteRole(roomRoleName);
      }
    });

    it("lists roles by page and resumes from a continuation token", async () => {
      const firstRoleName = "user.pagination_test_role";
      const secondRoleName = "room.pagination_test_role";

      await client.createOrReplaceRole(firstRoleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      await client.createOrReplaceRole(secondRoleName, {
        permissions: [KnownChatPermission.RoomPublishMessage],
      });

      try {
        const firstPage = await client.listRoles({ maxPageSize: 1 }).byPage().next();
        assert.lengthOf(firstPage.value!, 1);
        assert.isDefined(firstPage.value!.continuationToken);

        const secondPage = await client
          .listRoles({ maxPageSize: 1 })
          .byPage({ continuationToken: firstPage.value!.continuationToken })
          .next();
        assert.lengthOf(secondPage.value!, 1);
        assert.notEqual(secondPage.value![0].name, firstPage.value![0].name);
      } finally {
        await client.deleteRole(firstRoleName);
        await client.deleteRole(secondRoleName);
      }
    });
  });

  describe("rooms", () => {
    const roomId = "test-room";

    it("creates, gets, and deletes a room", async () => {
      try {
        const created = await client.createOrReplaceRoom(roomId, {
          title: "Test Room",
        });
        assert.equal(created.id, roomId);
        assert.equal(created.title, "Test Room");

        const fetched = await client.getRoom(roomId);
        assert.equal(fetched.id, roomId);
      } finally {
        await client.deleteRoom(roomId);
      }
    });

    it("gets the room conversation and lists its messages", async () => {
      try {
        const room = await client.createOrReplaceRoom(roomId, {
          title: "Conversation Test Room",
        });

        const conversation = await client.getConversation(room.defaultConversation);
        assert.equal(conversation.id, room.defaultConversation);
        assert.equal(conversation.parentRoom, roomId);

        const messages = [];
        for await (const message of client.listMessages(room.defaultConversation)) {
          messages.push(message);
        }
        assert.isArray(messages);
      } finally {
        await client.deleteRoom(roomId);
      }
    });

    it("returns empty message and member pages for a new room", async () => {
      const emptyRoomId = recorder.variable("emptyPageRoomId", `empty-page-room-${Date.now()}`);
      try {
        const room = await client.createOrReplaceRoom(emptyRoomId, {
          title: "Empty Page Test Room",
        });

        const messages = await client.listMessages(room.defaultConversation).byPage().next();
        const members = await client.listRoomMembers(emptyRoomId).byPage().next();

        assert.deepEqual(messages.value, []);
        assert.deepEqual(members.value, []);
      } finally {
        await client.deleteRoom(emptyRoomId).catch(() => undefined);
      }
    });

    it("creates, updates, and deletes a message", async () => {
      const userId = "test-message-user";
      const userRoleName = "user.test_message_role";
      const roomRoleName = "room.test_message_role";
      const messageText = recorder.variable("messageText", `test message ${Date.now()}`);
      const updatedMessageText = `${messageText} updated`;
      const binaryContent = new Uint8Array([0, 1, 2, 254, 255]);
      let roomId2: string | undefined;
      let conversationId: string | undefined;
      let messageId: string | undefined;

      try {
        await client.createOrReplaceRole(userRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        await client.createOrReplaceRole(roomRoleName, {
          permissions: [KnownChatPermission.RoomPublishMessage],
        });
        await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestMessageUser",
          roleName: userRoleName,
        });
        roomId2 = recorder.variable("messageRoomId", `test-message-room-${Date.now()}`);
        const room = await client.createOrReplaceRoom(roomId2, { title: "Message Test Room" });
        conversationId = room.defaultConversation;

        await client.createOrReplaceRoomMember(roomId2, userId, {
          roleName: roomRoleName,
        });

        // Use the chat client to send a message via WebSocket.
        // Skipped in playback — the recorded REST responses already contain the message.
        if (!isPlaybackMode()) {
          const accessToken = await client.getClientAccessToken({ userId });
          await createChatMessage(accessToken.url, roomId2, messageText);
        }

        const messages = [];
        for await (const message of client.listMessages(conversationId)) {
          messages.push(message);
        }
        const createdMessage = messages.find(
          (message) => message.createdBy === userId && message.content.text === messageText,
        );
        assert.isDefined(createdMessage);
        messageId = createdMessage!.id;

        const updated = await client.updateMessage(conversationId, messageId, {
          createdBy: userId,
          content: { text: updatedMessageText },
        });
        assert.equal(updated.content.text, updatedMessageText);

        const binaryUpdated = await client.updateMessage(conversationId, messageId, {
          createdBy: userId,
          content: { binary: binaryContent },
        });
        assert.deepEqual(binaryUpdated.content.binary, binaryContent);

        await client.deleteMessage(conversationId, messageId);
      } finally {
        if (roomId2) {
          await client.deleteRoom(roomId2).catch(() => undefined);
        }
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(userRoleName).catch(() => undefined);
        await client.deleteRole(roomRoleName).catch(() => undefined);
      }
    });
  });

  describe("room members", () => {
    const roomId = "test-member-room";
    const userId = "test-member-user";
    const userRoleName = "user.test_member_role";
    const roomRoleName = "room.test_member_role";

    it("creates, lists, and deletes a room member", async () => {
      try {
        await client.createOrReplaceRole(userRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        await client.createOrReplaceRole(roomRoleName, {
          permissions: [KnownChatPermission.RoomPublishMessage],
        });
        await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestMemberUser",
          roleName: userRoleName,
        });
        await client.createOrReplaceRoom(roomId, { title: "Member Test Room" });

        const created = await client.createOrReplaceRoomMember(roomId, userId, {
          roleName: roomRoleName,
        });
        assert.equal(created.userId, userId);
        assert.equal(created.roleName, roomRoleName);

        const members = [];
        for await (const member of client.listRoomMembers(roomId)) {
          members.push(member);
        }
        assert.isTrue(
          members.some((member) => member.userId === userId && member.roleName === roomRoleName),
        );

        await client.deleteRoomMember(roomId, userId);
      } finally {
        await client.deleteRoom(roomId).catch(() => undefined);
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(userRoleName).catch(() => undefined);
        await client.deleteRole(roomRoleName).catch(() => undefined);
      }
    });
  });

  describe("users", () => {
    const userId = "test-user";
    const roleName = "user.test_user_role";

    it("creates, gets, and deletes a user", async () => {
      await client.createOrReplaceRole(roleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });

      try {
        const created = await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestUser",
          roleName,
        });
        assert.equal(created.id, userId);
        assert.equal(created.kind, "Human");

        const fetched = await client.getUser(userId);
        assert.equal(fetched.id, userId);
      } finally {
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(roleName).catch(() => undefined);
      }
    });
  });
});
